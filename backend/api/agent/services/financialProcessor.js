const { parseCSV, csvToTransactions, getDateRange } = require("./csvParser");
const { processTransactions, calculateMonthlyAverages, getBucket } = require("./financialAnalyzer");
const { recategorizeWithAI } = require("./aiRecategorizer");
const {
  FinancialUpload,
  CategoryAverage,
  UncategorizedTransaction,
  CategorizedTransaction,
  CustomCategorizationPattern,
} = require("../../../db/agentDB");

/**
 * Format a date to YYYY-MM-DD string
 * @param {Date|string} date - Date to format
 * @returns {string} Formatted date string
 */
function formatDate(date) {
  if (!date) return '';
  const d = new Date(date);
  return d.toISOString().split('T')[0];
}

/**
 * Process uploaded CSV file and save results to database
 * @param {string} csvContent - Raw CSV file content
 * @param {number} userId - Agent user ID
 * @param {string} filename - Original filename
 * @returns {Promise<Object>} Processing results with upload ID and summary
 */
async function processFinancialUpload(csvContent, userId, filename = null) {
  try {
    console.log("\n=== FINANCIAL UPLOAD PROCESSING ===");
    console.log(`Filename: ${filename || "Unknown"}`);

    // Step 1: Parse CSV
    const { headers, rows } = parseCSV(csvContent);
    const rawTransactions = csvToTransactions(headers, rows);

    console.log(`\n[STEP 1] CSV Parsed:`);
    console.log(`  - Total rows in CSV: ${rawTransactions.length}`);

    if (rawTransactions.length === 0) {
      throw new Error("No valid transactions found in CSV file");
    }

    // Step 2: Get date range
    const { startDate, endDate, monthCount, calculationLog } = getDateRange(rawTransactions);

    console.log(`\n[STEP 2] Date Range Calculation:`);
    console.log(`  - First transaction: ${calculationLog.firstTransactionDate}`);
    console.log(`  - Last transaction: ${calculationLog.lastTransactionDate}`);
    console.log(`  - Days between: ${calculationLog.daysBetween}`);
    console.log(`  - Month calculation: ${calculationLog.monthCountFormula}`);
    console.log(`  - Months used for division: ${monthCount}`);

    // Step 2.5: Load custom categorization patterns for this user
    const customPatterns = await CustomCategorizationPattern.findAll({
      where: { userId },
      order: [["priority", "DESC"], ["createdAt", "ASC"]],
    });

    // Step 3: Process transactions with categorization algorithm
    const { transactions: categorizedTransactions, uncategorized, excluded } = processTransactions(
      rawTransactions,
      customPatterns
    );

    console.log(`\n[STEP 3] Categorization Results:`);
    console.log(`  - Successfully categorized: ${categorizedTransactions.length - uncategorized.length}`);
    console.log(`  - Uncategorized (no matching pattern): ${uncategorized.length}`);
    console.log(`  - Total kept for analysis: ${categorizedTransactions.length}`);
    console.log(`  - Excluded (transfers/payments): ${excluded.length}`);
    console.log(`  - Math check: ${categorizedTransactions.length} + ${excluded.length} = ${categorizedTransactions.length + excluded.length} (should equal ${rawTransactions.length})`);

    // Show sample uncategorized descriptions for debugging
    if (uncategorized.length > 0) {
      console.log(`\n  Sample uncategorized descriptions (first 10):`);
      uncategorized.slice(0, 10).forEach((txn, idx) => {
        console.log(`    ${idx + 1}. $${txn.absAmount.toFixed(2)} - "${txn.description}"`);
      });
    }

    // Step 4: Calculate monthly averages
    const averages = calculateMonthlyAverages(categorizedTransactions, monthCount);

    console.log(`\n[STEP 4] Monthly Average Calculation:`);
    console.log(`  - Sum of all expenses: $${averages.calculationDetails.grandTotal.toFixed(2)}`);
    console.log(`  - Formula: ${averages.calculationDetails.formula}`);
    console.log(`  - Monthly Average: $${averages.totalMonthly.toFixed(2)}`);
    console.log("\n=== END PROCESSING ===\n");

    // Step 5: Create upload record with calculation log
    const calculationLogData = {
      dateRange: calculationLog,
      totals: averages.calculationDetails,
      breakdown: {
        rawTransactionCount: rawTransactions.length,
        categorizedCount: categorizedTransactions.length,
        uncategorizedCount: uncategorized.length,
        excludedCount: excluded.length,
        mathCheck: `${categorizedTransactions.length} (kept) + ${excluded.length} (excluded) = ${
          categorizedTransactions.length + excluded.length
        } (should equal ${rawTransactions.length})`,
        note: `Of the ${categorizedTransactions.length} kept transactions, ${uncategorized.length} had no matching category pattern`,
      },
    };

    const upload = await FinancialUpload.create({
      userId,
      filename,
      monthCount,
      startDate,
      endDate,
      totalTransactions: rawTransactions.length,
      categorizedCount: categorizedTransactions.length,
      uncategorizedCount: uncategorized.length,
      excludedCount: excluded.length,
      totalMonthlyAverage: Number(averages.totalMonthly.toFixed(2)),
      status: "completed",
      calculationLog: calculationLogData,
      excludedTransactions: excluded.slice(0, 100).map((txn) => ({
        date: txn.date,
        description: txn.description,
        absAmount: Number(txn.absAmount.toFixed(2)),
        reason: txn.reason,
      })),
    });

    // Step 6: Save category averages
    const categoryAveragesData = Object.entries(averages.byCategory).map(([category, monthlyAvg]) => {
      // Find total for this category
      const categoryTransactions = categorizedTransactions.filter((t) => t.category === category);
      const totalAmount = categoryTransactions.reduce((sum, t) => sum + t.absAmount, 0);

      return {
        uploadId: upload.id,
        category,
        bucket: getBucket(category),
        totalAmount,
        monthlyAverage: monthlyAvg,
        transactionCount: categoryTransactions.length,
      };
    });

    await CategoryAverage.bulkCreate(categoryAveragesData);

    // Step 6b: Save all categorized transactions for audit trail
    const categorizedData = categorizedTransactions.map((txn) => ({
      uploadId: upload.id,
      date: txn.date,
      description: txn.description,
      rawAmount: txn.amount,
      normalizedAmount: Number(txn.normalizedAmount.toFixed(2)),
      absAmount: Number(txn.absAmount.toFixed(2)),
      source: txn.source,
      category: txn.category,
      bucket: txn.bucket,
    }));

    await CategorizedTransaction.bulkCreate(categorizedData);

    // Step 7: Save uncategorized transactions for AI review
    const uncategorizedData = uncategorized.map((txn) => ({
      uploadId: upload.id,
      date: txn.date,
      description: txn.description,
      amount: txn.absAmount,
      source: txn.source,
    }));

    if (uncategorizedData.length > 0) {
      await UncategorizedTransaction.bulkCreate(uncategorizedData);
    }

    // Step 7.5: Automatically run AI categorization on uncategorized transactions
    let aiResults = null;
    if (uncategorizedData.length > 0 && process.env.ANTHROPIC_API_KEY) {
      console.log(`\n[STEP 7.5] Running AI categorization on ${uncategorizedData.length} uncategorized transactions...`);
      try {
        aiResults = await recategorizeWithAI(upload.id);
        console.log(`  - AI recategorized: ${aiResults.recategorized}`);
        console.log(`  - Still uncategorized: ${aiResults.stillUncategorized}`);
      } catch (error) {
        console.error(`  - AI categorization failed: ${error.message}`);
        // Continue even if AI fails
      }
    }

    // Step 8: Return summary with detailed calculation info
    return {
      uploadId: upload.id,
      summary: {
        dateRange: `${formatDate(startDate)} to ${formatDate(endDate)}`,
        monthCount,
        totalTransactions: rawTransactions.length,
        categorized: categorizedTransactions.length,
        uncategorized: uncategorized.length,
        excluded: excluded.length,
        totalMonthlyAverage: parseFloat(averages.totalMonthly.toFixed(2)),
      },
      averages: {
        byCategory: Object.fromEntries(
          Object.entries(averages.byCategory).map(([cat, avg]) => [cat, parseFloat(avg.toFixed(2))])
        ),
        byBucket: Object.fromEntries(
          Object.entries(averages.byBucket).map(([bucket, avg]) => [bucket, parseFloat(avg.toFixed(2))])
        ),
      },
      calculationLog: {
        dateRange: calculationLog,
        totals: averages.calculationDetails,
        breakdown: {
          rawTransactionCount: rawTransactions.length,
          categorizedCount: categorizedTransactions.length,
          uncategorizedCount: uncategorized.length,
          excludedCount: excluded.length,
          mathCheck: `${categorizedTransactions.length} (kept) + ${excluded.length} (excluded) = ${
            categorizedTransactions.length + excluded.length
          } (should equal ${rawTransactions.length})`,
          note: `Of the ${categorizedTransactions.length} kept transactions, ${uncategorized.length} had no matching category pattern`,
        },
      },
      excludedTransactions: excluded.slice(0, 50), // Return first 50 excluded for review
      uncategorizedTransactions: uncategorized.slice(0, 20), // Return first 20 for preview
      aiCategorization: aiResults ? {
        recategorized: aiResults.recategorized,
        stillUncategorized: aiResults.stillUncategorized,
        topSuggestions: aiResults.updates.slice(0, 10), // Show first 10 AI suggestions
      } : null,
    };
  } catch (error) {
    // Create error record if we can
    if (userId) {
      try {
        await FinancialUpload.create({
          userId,
          monthCount: 0,
          startDate: new Date(),
          endDate: new Date(),
          totalTransactions: 0,
          status: "error",
          errorMessage: error.message,
        });
      } catch (dbError) {
        console.error("Failed to save error record:", dbError);
      }
    }

    throw error;
  }
}

/**
 * Get upload history for a user
 * @param {number} userId - Agent user ID
 * @returns {Promise<Array>} Array of upload records with summary stats
 */
async function getUploadHistory(userId) {
  const uploads = await FinancialUpload.findAll({
    where: { userId },
    order: [["uploadDate", "DESC"]],
    include: [
      {
        model: CategoryAverage,
        as: "categoryAverages",
        attributes: ["category", "bucket", "monthlyAverage", "transactionCount"],
      },
      {
        model: UncategorizedTransaction,
        as: "uncategorizedTransactions",
        attributes: ["id", "description", "amount", "isRecategorized"],
      },
    ],
  });

  return uploads.map((upload) => ({
    id: upload.id,
    filename: upload.filename,
    uploadDate: upload.uploadDate,
    dateRange: `${formatDate(upload.startDate)} to ${formatDate(upload.endDate)}`,
    monthCount: upload.monthCount,
    totalTransactions: upload.totalTransactions,
    categorizedCount: upload.categorizedCount,
    uncategorizedCount: upload.uncategorizedCount,
    excludedCount: upload.excludedCount,
    totalMonthlyAverage: parseFloat(upload.totalMonthlyAverage),
    status: upload.status,
    errorMessage: upload.errorMessage,
  }));
}

/**
 * Get detailed results for a specific upload
 * @param {number} uploadId - Upload ID
 * @param {number} userId - Agent user ID (for authorization)
 * @returns {Promise<Object>} Detailed upload results
 */
async function getUploadDetails(uploadId, userId) {
  const upload = await FinancialUpload.findOne({
    where: { id: uploadId, userId },
    include: [
      {
        model: CategoryAverage,
        as: "categoryAverages",
      },
      {
        model: UncategorizedTransaction,
        as: "uncategorizedTransactions",
      },
    ],
  });

  if (!upload) {
    throw new Error("Upload not found");
  }

  // Group category averages by bucket
  const bucketSummary = {};
  upload.categoryAverages.forEach((cat) => {
    if (!bucketSummary[cat.bucket]) {
      bucketSummary[cat.bucket] = {
        total: 0,
        categories: [],
      };
    }
    bucketSummary[cat.bucket].total += parseFloat(cat.monthlyAverage);
    bucketSummary[cat.bucket].categories.push({
      category: cat.category,
      monthlyAverage: parseFloat(cat.monthlyAverage),
      transactionCount: cat.transactionCount,
    });
  });

  return {
    upload: {
      id: upload.id,
      uploadDate: upload.uploadDate,
      dateRange: `${formatDate(upload.startDate)} to ${formatDate(upload.endDate)}`,
      monthCount: upload.monthCount,
      totalTransactions: upload.totalTransactions,
      categorizedCount: upload.categorizedCount,
      uncategorizedCount: upload.uncategorizedCount,
      excludedCount: upload.excludedCount,
      totalMonthlyAverage: parseFloat(upload.totalMonthlyAverage),
      status: upload.status,
    },
    buckets: bucketSummary,
    calculationLog: upload.calculationLog || null,
    excludedTransactions: upload.excludedTransactions || [],
    uncategorized: upload.uncategorizedTransactions.map((txn) => ({
      id: txn.id,
      date: txn.date,
      description: txn.description,
      amount: parseFloat(txn.amount),
      source: txn.source,
      aiSuggestedCategory: txn.aiSuggestedCategory,
      aiReasoning: txn.aiReasoning,
      isRecategorized: txn.isRecategorized,
      finalCategory: txn.finalCategory,
    })),
  };
}

module.exports = {
  processFinancialUpload,
  getUploadHistory,
  getUploadDetails,
};
