const express = require("express");
const router = express.Router();
const multer = require("multer");
const { isAgentLoggedIn } = require("./middleware");
const { processFinancialUpload, getUploadHistory, getUploadDetails } = require("./services/financialProcessor");
const { recategorizeWithAI, manualRecategorize } = require("./services/aiRecategorizer");
const { combineUploads, getCombinedDetails, getCombinedTransactions } = require("./services/combineUploads");

// Configure multer for file uploads (memory storage)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "text/csv" || file.originalname.endsWith(".csv")) {
      cb(null, true);
    } else {
      cb(new Error("Only CSV files are allowed"));
    }
  },
});

/**
 * POST /api/agent/financial/upload
 * Upload and process CSV file(s) IN-MEMORY ONLY with AI categorization
 * Auto-combines multiple files into one analysis
 */
router.post("/upload", isAgentLoggedIn, upload.array("csvFiles", 10), async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No files uploaded" });
    }

    const { parseCSV, csvToTransactions, getDateRange } = require("./services/csvParser");
    const { processTransactions, calculateMonthlyAverages, getBucket } = require("./services/financialAnalyzer");
    const { categorizeWithAI } = require("./services/inMemoryAICategorizer");
    const { CustomCategorizationPattern } = require("../../db/agentDB");

    // Load custom patterns
    const customPatterns = await CustomCategorizationPattern.findAll({
      where: { userId: req.user.id },
      order: [["priority", "DESC"], ["createdAt", "ASC"]],
    });

    let allTransactions = [];
    let allUncategorized = [];
    let allExcluded = [];
    const fileAnalyses = [];

    // Process each file
    for (let i = 0; i < req.files.length; i++) {
      const file = req.files[i];
      const csvContent = file.buffer.toString("utf-8");
      const { headers, rows } = parseCSV(csvContent);
      const rawTransactions = csvToTransactions(headers, rows);
      const { transactions, uncategorized, excluded } = processTransactions(rawTransactions, customPatterns);

      // Tag with source file
      transactions.forEach(t => t.sourceFile = file.originalname);
      uncategorized.forEach(t => t.sourceFile = file.originalname);
      excluded.forEach(t => t.sourceFile = file.originalname);

      // Calculate individual file analysis
      const fileDate = getDateRange([...transactions, ...uncategorized]);
      const fileAverages = calculateMonthlyAverages(transactions, fileDate.monthCount);

      const fileBuckets = {};
      Object.entries(fileAverages.byCategory).forEach(([category, monthlyAvg]) => {
        const bucket = getBucket(category);
        if (!fileBuckets[bucket]) {
          fileBuckets[bucket] = { total: 0, categories: [] };
        }
        const categoryTxns = transactions.filter(t => t.category === category);
        fileBuckets[bucket].total += monthlyAvg;
        fileBuckets[bucket].categories.push({
          category,
          monthlyAverage: monthlyAvg,
          transactionCount: categoryTxns.length,
        });
      });

      fileAnalyses.push({
        filename: file.originalname,
        analysis: {
          dateRange: `${fileDate.calculationLog.firstTransactionDate} to ${fileDate.calculationLog.lastTransactionDate}`,
          monthCount: fileDate.monthCount,
          totalTransactions: transactions.length + uncategorized.length + excluded.length,
          categorizedCount: transactions.length,
          uncategorizedCount: uncategorized.length,
          excludedCount: excluded.length,
          totalMonthlyAverage: Number(fileAverages.totalMonthly.toFixed(2)),
          buckets: fileBuckets,
        }
      });

      allTransactions.push(...transactions);
      allUncategorized.push(...uncategorized);
      allExcluded.push(...excluded);
    }

    // Use AI to categorize remaining uncategorized transactions
    let aiSuggestions = [];
    if (allUncategorized.length > 0) {
      const { categorized, suggestions } = await categorizeWithAI(allUncategorized, req.user.id);

      // Move AI-categorized transactions from uncategorized to categorized
      allTransactions.push(...categorized);
      allUncategorized = allUncategorized.filter(t => !categorized.find(c => c.description === t.description));

      aiSuggestions = suggestions;
    }

    // Calculate combined analysis
    const { startDate, endDate, monthCount, calculationLog } = getDateRange([...allTransactions, ...allUncategorized]);
    const averages = calculateMonthlyAverages(allTransactions, monthCount);

    // Build bucket breakdown
    const buckets = {};
    Object.entries(averages.byCategory).forEach(([category, monthlyAvg]) => {
      const bucket = getBucket(category);
      if (!buckets[bucket]) {
        buckets[bucket] = { total: 0, categories: [] };
      }
      const categoryTxns = allTransactions.filter(t => t.category === category);
      buckets[bucket].total += monthlyAvg;
      buckets[bucket].categories.push({
        category,
        monthlyAverage: monthlyAvg,
        transactionCount: categoryTxns.length,
      });
    });

    res.json({
      success: true,
      combinedAnalysis: {
        dateRange: `${calculationLog.firstTransactionDate} to ${calculationLog.lastTransactionDate}`,
        monthCount,
        totalTransactions: allTransactions.length + allUncategorized.length + allExcluded.length,
        categorizedCount: allTransactions.length,
        uncategorizedCount: allUncategorized.length,
        excludedCount: allExcluded.length,
        totalMonthlyAverage: Number(averages.totalMonthly.toFixed(2)),
        buckets,
        aiSuggestions, // For user confirmation in frontend
        calculationLog: {
          dateRange: calculationLog,
          totals: averages.calculationDetails,
          breakdown: {
            categorizedCount: allTransactions.length,
            uncategorizedCount: allUncategorized.length,
            excludedCount: allExcluded.length,
          },
        },
        uncategorized: allUncategorized.slice(0, 50).map(t => ({
          description: t.description,
          amount: t.absAmount,
          date: t.date,
          sourceFile: t.sourceFile,
        })),
        excludedSample: allExcluded.slice(0, 50).map(t => ({
          description: t.description,
          amount: t.absAmount,
          date: t.date,
          reason: t.reason,
          sourceFile: t.sourceFile,
        })),
      },
      files: fileAnalyses,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(400).json({
      error: error.message || "Failed to process CSV files",
    });
  }
});

/**
 * GET /api/agent/financial/history
 * Get upload history for current user
 */
router.get("/history", isAgentLoggedIn, async (req, res, next) => {
  try {
    const history = await getUploadHistory(req.user.id);
    res.json(history);
  } catch (error) {
    console.error("History error:", error);
    res.status(500).json({ error: "Failed to retrieve upload history" });
  }
});

/**
 * GET /api/agent/financial/:uploadId
 * Get detailed results for a specific upload
 */
router.get("/:uploadId", isAgentLoggedIn, async (req, res, next) => {
  try {
    const uploadId = parseInt(req.params.uploadId, 10);
    if (isNaN(uploadId)) {
      return res.status(400).json({ error: "Invalid upload ID" });
    }

    const details = await getUploadDetails(uploadId, req.user.id);
    res.json(details);
  } catch (error) {
    console.error("Details error:", error);
    res.status(404).json({ error: error.message || "Upload not found" });
  }
});

/**
 * POST /api/agent/financial/:uploadId/recategorize
 * Use AI to recategorize uncategorized transactions
 */
router.post("/:uploadId/recategorize", isAgentLoggedIn, async (req, res, next) => {
  try {
    const uploadId = parseInt(req.params.uploadId, 10);
    if (isNaN(uploadId)) {
      return res.status(400).json({ error: "Invalid upload ID" });
    }

    const result = await recategorizeWithAI(uploadId);
    res.json(result);
  } catch (error) {
    console.error("Recategorization error:", error);
    res.status(500).json({ error: error.message || "Failed to recategorize transactions" });
  }
});

/**
 * PUT /api/agent/financial/transactions/:transactionId
 * Manually override category for a transaction
 */
router.put("/transactions/:transactionId", isAgentLoggedIn, async (req, res, next) => {
  try {
    const transactionId = parseInt(req.params.transactionId, 10);
    if (isNaN(transactionId)) {
      return res.status(400).json({ error: "Invalid transaction ID" });
    }

    const { category } = req.body;
    if (!category) {
      return res.status(400).json({ error: "Category is required" });
    }

    const result = await manualRecategorize(transactionId, category);
    res.json({
      success: true,
      message: "Transaction recategorized successfully",
      transaction: result,
    });
  } catch (error) {
    console.error("Manual recategorization error:", error);
    res.status(400).json({ error: error.message || "Failed to recategorize transaction" });
  }
});

/**
 * GET /api/agent/financial/categories/list
 * Get list of all available categories
 */
router.get("/categories/list", isAgentLoggedIn, async (req, res, next) => {
  try {
    const { CATEGORIZATION_RULES, CATEGORY_BUCKETS } = require("./services/financialAnalyzer");

    const categories = CATEGORIZATION_RULES.map(([category]) => category);
    const buckets = Object.keys(CATEGORY_BUCKETS);

    res.json({
      categories: categories.sort(),
      buckets,
    });
  } catch (error) {
    console.error("Categories error:", error);
    res.status(500).json({ error: "Failed to retrieve categories" });
  }
});

/**
 * GET /api/agent/financial/:uploadId/transactions
 * Get detailed transaction breakdown for verification
 */
router.get("/:uploadId/transactions", isAgentLoggedIn, async (req, res, next) => {
  try {
    const uploadId = parseInt(req.params.uploadId, 10);
    if (isNaN(uploadId)) {
      return res.status(400).json({ error: "Invalid upload ID" });
    }

    const { CategorizedTransaction, FinancialUpload } = require("../../db/agentDB");

    // Verify ownership
    const upload = await FinancialUpload.findOne({
      where: { id: uploadId, userId: req.user.id },
    });

    if (!upload) {
      return res.status(404).json({ error: "Upload not found" });
    }

    // Get all categorized transactions
    const transactions = await CategorizedTransaction.findAll({
      where: { uploadId },
      order: [["date", "ASC"], ["description", "ASC"]],
    });

    res.json({
      upload: {
        id: upload.id,
        filename: upload.filename,
        dateRange: `${upload.startDate} to ${upload.endDate}`,
        monthCount: upload.monthCount,
      },
      transactions: transactions.map((txn) => ({
        date: txn.date,
        description: txn.description,
        rawAmount: parseFloat(txn.rawAmount),
        normalizedAmount: parseFloat(txn.normalizedAmount),
        absAmount: parseFloat(txn.absAmount),
        source: txn.source,
        category: txn.category,
        bucket: txn.bucket,
      })),
    });
  } catch (error) {
    console.error("Transaction breakdown error:", error);
    res.status(500).json({ error: "Failed to retrieve transaction breakdown" });
  }
});

/**
 * DELETE /api/agent/financial/:uploadId
 * Delete an upload and all associated data
 */
router.delete("/:uploadId", isAgentLoggedIn, async (req, res, next) => {
  try {
    const uploadId = parseInt(req.params.uploadId, 10);
    if (isNaN(uploadId)) {
      return res.status(400).json({ error: "Invalid upload ID" });
    }

    const { FinancialUpload } = require("../../db/agentDB");

    // Verify ownership
    const upload = await FinancialUpload.findOne({
      where: { id: uploadId, userId: req.user.id },
    });

    if (!upload) {
      return res.status(404).json({ error: "Upload not found" });
    }

    // Delete (CASCADE will handle related records)
    await upload.destroy();

    res.json({
      success: true,
      message: "Upload deleted successfully",
    });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ error: "Failed to delete upload" });
  }
});

// ============================================================================
// COMBINED UPLOADS ENDPOINTS
// ============================================================================

/**
 * POST /api/agent/financial/combine
 * Manually combine multiple existing uploads
 */
router.post("/combine", isAgentLoggedIn, async (req, res, next) => {
  try {
    const { uploadIds, name } = req.body;

    if (!uploadIds || !Array.isArray(uploadIds) || uploadIds.length < 2) {
      return res.status(400).json({ error: "Must provide at least 2 upload IDs to combine" });
    }

    const combined = await combineUploads(req.user.id, uploadIds, name, false);

    res.json({
      success: true,
      message: "Uploads combined successfully",
      ...combined,
    });
  } catch (error) {
    console.error("Combine error:", error);
    res.status(400).json({ error: error.message || "Failed to combine uploads" });
  }
});

/**
 * GET /api/agent/financial/combined/history
 * Get all combined uploads for current user
 */
router.get("/combined/history", isAgentLoggedIn, async (req, res, next) => {
  try {
    const { CombinedUpload } = require("../../db/agentDB");

    const combined = await CombinedUpload.findAll({
      where: { userId: req.user.id },
      order: [["createdAt", "DESC"]],
    });

    res.json(
      combined.map((c) => ({
        id: c.id,
        name: c.name,
        createdAt: c.createdAt,
        dateRange: `${new Date(c.startDate).toISOString().split('T')[0]} to ${new Date(c.endDate).toISOString().split('T')[0]}`,
        monthCount: c.monthCount,
        totalTransactions: c.totalTransactions,
        totalMonthlyAverage: parseFloat(c.totalMonthlyAverage),
        sourceCount: c.uploadIds.length,
        isAutoGenerated: c.isAutoGenerated,
      }))
    );
  } catch (error) {
    console.error("Combined history error:", error);
    res.status(500).json({ error: "Failed to retrieve combined upload history" });
  }
});

/**
 * GET /api/agent/financial/combined/:combinedId
 * Get details for a specific combined upload
 */
router.get("/combined/:combinedId", isAgentLoggedIn, async (req, res, next) => {
  try {
    const combinedId = parseInt(req.params.combinedId, 10);
    if (isNaN(combinedId)) {
      return res.status(400).json({ error: "Invalid combined upload ID" });
    }

    const details = await getCombinedDetails(combinedId, req.user.id);
    res.json(details);
  } catch (error) {
    console.error("Combined details error:", error);
    res.status(404).json({ error: error.message || "Combined upload not found" });
  }
});

/**
 * GET /api/agent/financial/combined/:combinedId/transactions
 * Get all transactions from a combined upload
 */
router.get("/combined/:combinedId/transactions", isAgentLoggedIn, async (req, res, next) => {
  try {
    const combinedId = parseInt(req.params.combinedId, 10);
    if (isNaN(combinedId)) {
      return res.status(400).json({ error: "Invalid combined upload ID" });
    }

    const transactions = await getCombinedTransactions(combinedId, req.user.id);
    res.json(transactions);
  } catch (error) {
    console.error("Combined transactions error:", error);
    res.status(404).json({ error: error.message || "Combined upload not found" });
  }
});

/**
 * DELETE /api/agent/financial/combined/:combinedId
 * Delete a combined upload (does NOT delete individual uploads)
 */
router.delete("/combined/:combinedId", isAgentLoggedIn, async (req, res, next) => {
  try {
    const combinedId = parseInt(req.params.combinedId, 10);
    if (isNaN(combinedId)) {
      return res.status(400).json({ error: "Invalid combined upload ID" });
    }

    const { CombinedUpload } = require("../../db/agentDB");

    const combined = await CombinedUpload.findOne({
      where: { id: combinedId, userId: req.user.id },
    });

    if (!combined) {
      return res.status(404).json({ error: "Combined upload not found" });
    }

    await combined.destroy();

    res.json({
      success: true,
      message: "Combined upload deleted successfully",
    });
  } catch (error) {
    console.error("Delete combined error:", error);
    res.status(500).json({ error: "Failed to delete combined upload" });
  }
});

/**
 * GET /api/agent/financial/algorithm
 * Get all categorization rules (built-in + custom)
 */
router.get("/algorithm", isAgentLoggedIn, async (req, res, next) => {
  try {
    const { CATEGORIZATION_RULES } = require("./services/financialAnalyzer");
    const { CustomCategorizationPattern } = require("../../db/agentDB");

    // Get built-in rules
    const builtInRules = CATEGORIZATION_RULES.map(([category, patterns]) => ({
      category,
      patterns: patterns.map((pattern) => ({
        pattern,
        isBuiltIn: true,
        isActive: true,
      })),
    }));

    // Get custom patterns for this user
    const customPatterns = await CustomCategorizationPattern.findAll({
      where: { userId: req.user.id },
      order: [["priority", "DESC"], ["createdAt", "ASC"]],
    });

    // Merge custom patterns into rules
    const rulesByCategory = {};
    builtInRules.forEach((rule) => {
      rulesByCategory[rule.category] = rule.patterns;
    });

    customPatterns.forEach((cp) => {
      if (!rulesByCategory[cp.category]) {
        rulesByCategory[cp.category] = [];
      }
      rulesByCategory[cp.category].push({
        id: cp.id,
        pattern: cp.pattern,
        isBuiltIn: false,
        isActive: cp.isActive,
        priority: cp.priority,
      });
    });

    // Convert back to array format
    const allRules = Object.entries(rulesByCategory).map(([category, patterns]) => ({
      category,
      patterns,
    }));

    res.json({ rules: allRules.sort((a, b) => a.category.localeCompare(b.category)) });
  } catch (error) {
    console.error("Get algorithm error:", error);
    res.status(500).json({ error: "Failed to retrieve categorization algorithm" });
  }
});

/**
 * POST /api/agent/financial/algorithm/pattern
 * Add a custom categorization pattern
 */
router.post("/algorithm/pattern", isAgentLoggedIn, async (req, res, next) => {
  try {
    const { category, pattern, priority } = req.body;

    if (!category || !pattern) {
      return res.status(400).json({ error: "Category and pattern are required" });
    }

    // Validate pattern is valid regex
    try {
      new RegExp(pattern, "i");
    } catch (err) {
      return res.status(400).json({ error: "Invalid regex pattern" });
    }

    const { CustomCategorizationPattern } = require("../../db/agentDB");

    const newPattern = await CustomCategorizationPattern.create({
      userId: req.user.id,
      category,
      pattern,
      priority: priority || 100,
      isActive: true,
    });

    res.json({
      success: true,
      pattern: {
        id: newPattern.id,
        category: newPattern.category,
        pattern: newPattern.pattern,
        priority: newPattern.priority,
        isActive: newPattern.isActive,
      },
    });
  } catch (error) {
    console.error("Add pattern error:", error);
    res.status(500).json({ error: "Failed to add pattern" });
  }
});

/**
 * PUT /api/agent/financial/algorithm/pattern/:patternId
 * Edit a custom categorization pattern
 */
router.put("/algorithm/pattern/:patternId", isAgentLoggedIn, async (req, res, next) => {
  try {
    const { patternId } = req.params;
    const { pattern, isActive, priority } = req.body;

    const { CustomCategorizationPattern } = require("../../db/agentDB");

    const customPattern = await CustomCategorizationPattern.findOne({
      where: { id: patternId, userId: req.user.id },
    });

    if (!customPattern) {
      return res.status(404).json({ error: "Pattern not found" });
    }

    // Validate pattern if provided
    if (pattern) {
      try {
        new RegExp(pattern, "i");
      } catch (err) {
        return res.status(400).json({ error: "Invalid regex pattern" });
      }
    }

    await customPattern.update({
      ...(pattern && { pattern }),
      ...(typeof isActive === "boolean" && { isActive }),
      ...(priority !== undefined && { priority }),
    });

    res.json({
      success: true,
      pattern: {
        id: customPattern.id,
        category: customPattern.category,
        pattern: customPattern.pattern,
        priority: customPattern.priority,
        isActive: customPattern.isActive,
      },
    });
  } catch (error) {
    console.error("Edit pattern error:", error);
    res.status(500).json({ error: "Failed to edit pattern" });
  }
});

/**
 * DELETE /api/agent/financial/algorithm/pattern/:patternId
 * Delete a custom categorization pattern
 */
router.delete("/algorithm/pattern/:patternId", isAgentLoggedIn, async (req, res, next) => {
  try {
    const { patternId } = req.params;

    const { CustomCategorizationPattern } = require("../../db/agentDB");

    const customPattern = await CustomCategorizationPattern.findOne({
      where: { id: patternId, userId: req.user.id },
    });

    if (!customPattern) {
      return res.status(404).json({ error: "Pattern not found" });
    }

    await customPattern.destroy();

    res.json({
      success: true,
      message: "Pattern deleted successfully",
    });
  } catch (error) {
    console.error("Delete pattern error:", error);
    res.status(500).json({ error: "Failed to delete pattern" });
  }
});

/**
 * POST /api/agent/financial/confirm-ai-suggestion
 * Confirm an AI suggestion and save it as a pattern
 */
router.post("/confirm-ai-suggestion", isAgentLoggedIn, async (req, res, next) => {
  try {
    const { description, category } = req.body;

    if (!description || !category) {
      return res.status(400).json({ error: "Description and category are required" });
    }

    const { CustomCategorizationPattern } = require("../../db/agentDB");

    await CustomCategorizationPattern.create({
      userId: req.user.id,
      category,
      pattern: description,
      priority: 75, // Higher than default AI patterns
      isActive: true,
    });

    res.json({
      success: true,
      message: "AI suggestion confirmed and saved as pattern",
    });
  } catch (error) {
    console.error("Confirm AI suggestion error:", error);
    res.status(500).json({ error: "Failed to confirm AI suggestion" });
  }
});

module.exports = router;
