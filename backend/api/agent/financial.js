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
 * Upload and process CSV file(s) - supports single or multiple files
 */
router.post("/upload", isAgentLoggedIn, upload.array("csvFiles", 10), async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No files uploaded" });
    }

    const uploadResults = [];

    // Process each file
    for (const file of req.files) {
      try {
        const csvContent = file.buffer.toString("utf-8");
        const result = await processFinancialUpload(csvContent, req.user.id, file.originalname);
        uploadResults.push(result);
      } catch (error) {
        console.error(`Failed to process ${file.originalname}:`, error);
        uploadResults.push({
          filename: file.originalname,
          error: error.message,
          success: false,
        });
      }
    }

    // If multiple files were uploaded successfully, auto-combine them
    const successfulUploads = uploadResults.filter(r => r.uploadId && !r.error);

    if (successfulUploads.length > 1) {
      try {
        const uploadIds = successfulUploads.map(r => r.uploadId);
        const combinedName = `Combined Upload: ${new Date().toLocaleDateString()}`;
        const combined = await combineUploads(req.user.id, uploadIds, combinedName, true);

        return res.json({
          success: true,
          message: `Successfully processed and combined ${successfulUploads.length} files`,
          uploads: uploadResults,
          combined,
        });
      } catch (combineError) {
        console.error("Failed to auto-combine uploads:", combineError);
        // Still return success for individual uploads
      }
    }

    // Single file or combination failed - return individual results
    res.json({
      success: uploadResults.some(r => !r.error),
      message: uploadResults.length === 1
        ? "Financial data processed successfully"
        : `Processed ${uploadResults.length} files`,
      uploads: uploadResults,
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

module.exports = router;
