const Anthropic = require("@anthropic-ai/sdk");
const {
  UncategorizedTransaction,
  CategoryAverage,
  FinancialUpload,
  CategorizedTransaction,
} = require("../../../db/agentDB");
const { CATEGORIZATION_RULES, CATEGORY_BUCKETS, getBucket } = require("./financialAnalyzer");

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

/**
 * Generate prompt for AI categorization
 * @param {Array<Object>} transactions - Uncategorized transactions
 * @returns {string} Prompt for Claude
 */
function generateCategorizationPrompt(transactions) {
  // Extract existing categories from rules
  const existingCategories = CATEGORIZATION_RULES.map(([category]) => category).sort();

  const prompt = `You are a financial categorization assistant. I need you to categorize credit card transactions into existing budget categories.

EXISTING CATEGORIES (you MUST use one of these):
${existingCategories.map((cat) => `- ${cat}`).join("\n")}

INSTRUCTIONS:
1. Match each transaction to the MOST APPROPRIATE existing category
2. If a transaction doesn't clearly fit any category, use "Uncategorized"
3. Consider the merchant name, transaction patterns, and typical spending categories
4. Return a JSON array with this exact format:

[
  {
    "description": "transaction description",
    "suggestedCategory": "Category Name",
    "reasoning": "Brief explanation (1 sentence)"
  }
]

TRANSACTIONS TO CATEGORIZE:
${transactions.map((txn, i) => `${i + 1}. ${txn.description} - $${txn.amount.toFixed(2)}`).join("\n")}

Return ONLY the JSON array, no other text.`;

  return prompt;
}

/**
 * Use Claude to recategorize uncategorized transactions
 * @param {number} uploadId - Upload ID
 * @returns {Promise<Object>} Recategorization results
 */
async function recategorizeWithAI(uploadId) {
  try {
    // Get ALL uncategorized transactions for this upload
    const allUncategorized = await UncategorizedTransaction.findAll({
      where: {
        uploadId,
        isRecategorized: false,
      },
    });

    if (allUncategorized.length === 0) {
      return {
        success: true,
        message: "No uncategorized transactions to process",
        recategorized: 0,
      };
    }

    console.log(`Processing ${allUncategorized.length} uncategorized transactions in batches of 50...`);

    // Process in batches of 50 to avoid token limits
    const BATCH_SIZE = 50;
    const allUpdates = [];
    let totalRecategorized = 0;

    for (let i = 0; i < allUncategorized.length; i += BATCH_SIZE) {
      const batch = allUncategorized.slice(i, i + BATCH_SIZE);
      console.log(`Processing batch ${Math.floor(i / BATCH_SIZE) + 1} (${batch.length} transactions)...`);

      // Generate prompt for this batch
      const prompt = generateCategorizationPrompt(
        batch.map((txn) => ({
          description: txn.description,
          amount: parseFloat(txn.amount),
        }))
      );

      // Call Claude API
      const message = await anthropic.messages.create({
        model: "claude-sonnet-4-5-20250929",
        max_tokens: 4096,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      });

      // Parse response
      const responseText = message.content[0].text;
      const suggestions = JSON.parse(responseText);

      // Update transactions with AI suggestions
      for (let j = 0; j < batch.length && j < suggestions.length; j++) {
        const txn = batch[j];
        const suggestion = suggestions[j];

        await txn.update({
          aiSuggestedCategory: suggestion.suggestedCategory,
          aiReasoning: suggestion.reasoning,
          isRecategorized: suggestion.suggestedCategory !== "Uncategorized",
          finalCategory: suggestion.suggestedCategory,
          recategorizedAt: new Date(),
        });

        if (suggestion.suggestedCategory !== "Uncategorized") {
          totalRecategorized++;
        }

        allUpdates.push({
          id: txn.id,
          description: txn.description,
          originalCategory: "Uncategorized",
          newCategory: suggestion.suggestedCategory,
          reasoning: suggestion.reasoning,
        });
      }
    }

    // Recalculate averages if any were recategorized
    if (totalRecategorized > 0) {
      await recalculateAverages(uploadId);
    }

    console.log(`Completed AI categorization: ${totalRecategorized} recategorized, ${allUncategorized.length - totalRecategorized} still uncategorized`);

    return {
      success: true,
      recategorized: totalRecategorized,
      stillUncategorized: allUncategorized.length - totalRecategorized,
      updates: allUpdates,
    };
  } catch (error) {
    console.error("AI recategorization error:", error);
    throw new Error(`Failed to recategorize with AI: ${error.message}`);
  }
}

/**
 * Recalculate monthly averages after recategorization
 * @param {number} uploadId - Upload ID
 */
async function recalculateAverages(uploadId) {
  const upload = await FinancialUpload.findByPk(uploadId);
  if (!upload) {
    throw new Error("Upload not found");
  }

  // Get all recategorized transactions
  const recategorized = await UncategorizedTransaction.findAll({
    where: {
      uploadId,
      isRecategorized: true,
    },
  });

  // Group by category
  const categoryTotals = {};
  const categoryCounts = {};

  recategorized.forEach((txn) => {
    const category = txn.finalCategory;
    if (category === "Uncategorized") return;

    if (!categoryTotals[category]) {
      categoryTotals[category] = 0;
      categoryCounts[category] = 0;
    }

    categoryTotals[category] += parseFloat(txn.amount);
    categoryCounts[category] += 1;
  });

  // Update or create category averages
  for (const [category, total] of Object.entries(categoryTotals)) {
    const monthlyAverage = total / upload.monthCount;
    const bucket = getBucket(category);

    const [categoryAvg, created] = await CategoryAverage.findOrCreate({
      where: { uploadId, category },
      defaults: {
        bucket,
        totalAmount: total,
        monthlyAverage,
        transactionCount: categoryCounts[category],
      },
    });

    if (!created) {
      // Update existing
      await categoryAvg.update({
        totalAmount: parseFloat(categoryAvg.totalAmount) + total,
        monthlyAverage: (parseFloat(categoryAvg.totalAmount) + total) / upload.monthCount,
        transactionCount: categoryAvg.transactionCount + categoryCounts[category],
      });
    }
  }

  // Recalculate upload totals
  const allAverages = await CategoryAverage.findAll({ where: { uploadId } });
  const totalMonthlyAverage = allAverages.reduce(
    (sum, avg) => sum + parseFloat(avg.monthlyAverage),
    0
  );

  const stillUncategorized = await UncategorizedTransaction.count({
    where: { uploadId, isRecategorized: false },
  });

  await upload.update({
    totalMonthlyAverage,
    uncategorizedCount: stillUncategorized,
    categorizedCount: upload.categorizedCount + recategorized.length - stillUncategorized,
  });
}

/**
 * Manually recategorize a transaction (works with both categorized and uncategorized)
 * @param {number} transactionId - Transaction ID
 * @param {string} category - New category
 * @param {string} table - 'categorized' or 'uncategorized' (optional, will try both)
 * @returns {Promise<Object>} Updated transaction
 */
async function manualRecategorize(transactionId, category, table = null) {
  // Validate category exists
  const validCategories = CATEGORIZATION_RULES.map(([cat]) => cat);
  if (!validCategories.includes(category) && category !== "Uncategorized") {
    throw new Error(`Invalid category: ${category}`);
  }

  let txn = null;
  let uploadId = null;
  let isCategorized = false;

  // Try to find in CategorizedTransaction first (most common case)
  if (!table || table === "categorized") {
    txn = await CategorizedTransaction.findByPk(transactionId);
    if (txn) {
      isCategorized = true;
      uploadId = txn.uploadId;

      // Get new bucket for the category
      const bucket = getBucket(category);

      // Update the transaction
      await txn.update({
        category,
        bucket,
      });
    }
  }

  // If not found, try UncategorizedTransaction
  if (!txn && (!table || table === "uncategorized")) {
    txn = await UncategorizedTransaction.findByPk(transactionId);
    if (txn) {
      uploadId = txn.uploadId;
      await txn.update({
        finalCategory: category,
        isRecategorized: category !== "Uncategorized",
        recategorizedAt: new Date(),
      });
    }
  }

  if (!txn) {
    throw new Error("Transaction not found");
  }

  // Recalculate upload averages
  if (isCategorized) {
    await recalculateCategorizedAverages(uploadId);
  } else {
    await recalculateAverages(uploadId);
  }

  return {
    id: txn.id,
    description: txn.description,
    amount: parseFloat(txn.rawAmount || txn.amount),
    category: isCategorized ? txn.category : txn.finalCategory,
    bucket: isCategorized ? txn.bucket : null,
  };
}

/**
 * Recalculate category averages for categorized transactions
 * @param {number} uploadId - Upload ID
 */
async function recalculateCategorizedAverages(uploadId) {
  const upload = await FinancialUpload.findByPk(uploadId);
  if (!upload) {
    throw new Error("Upload not found");
  }

  // Get all categorized transactions for this upload
  const transactions = await CategorizedTransaction.findAll({
    where: { uploadId },
  });

  // Group by category and calculate totals
  const categoryTotals = {};
  const categoryCounts = {};

  for (const txn of transactions) {
    const cat = txn.category;
    const amount = parseFloat(txn.absAmount);

    categoryTotals[cat] = (categoryTotals[cat] || 0) + amount;
    categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
  }

  // Clear existing category averages and recreate
  await CategoryAverage.destroy({ where: { uploadId } });

  for (const [category, total] of Object.entries(categoryTotals)) {
    const monthlyAverage = total / upload.monthCount;

    await CategoryAverage.create({
      uploadId,
      category,
      totalAmount: total,
      monthlyAverage,
      transactionCount: categoryCounts[category],
    });
  }

  // Recalculate upload total
  const allAverages = await CategoryAverage.findAll({ where: { uploadId } });
  const totalMonthlyAverage = allAverages.reduce(
    (sum, avg) => sum + parseFloat(avg.monthlyAverage),
    0
  );

  await upload.update({ totalMonthlyAverage });
}

module.exports = {
  recategorizeWithAI,
  manualRecategorize,
};
