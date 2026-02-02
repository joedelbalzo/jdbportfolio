const { CustomCategorizationPattern, UncategorizedTransaction } = require("../../../db/agentDB");

/**
 * Extract merchant keyword from transaction description
 * Strips numbers, locations, and common suffixes
 * @param {string} description - Transaction description
 * @returns {string} Extracted keyword
 */
function extractMerchantKeyword(description) {
  let keyword = description.toUpperCase().trim();

  // Remove common prefixes
  keyword = keyword.replace(/^(SQ \*|AMZ\*|AMZN|TST\*|SP\*|PP\*|PAYPAL \*|WM |WM SUPERCENTER )/i, "");

  // Remove trailing numbers, hashes, and location codes
  keyword = keyword.replace(/\s*#?\d+$/g, ""); // "STARBUCKS #1234" → "STARBUCKS"
  keyword = keyword.replace(/\s+\d{3,}$/g, ""); // "TARGET 2345" → "TARGET"
  keyword = keyword.replace(/\s+-\s+.*/g, ""); // "SHOPRITE - FISHKILL" → "SHOPRITE"

  // Remove trailing location indicators
  keyword = keyword.replace(/\s+(NYC|NY|NJ|CT|MA|BROOKLYN|MANHATTAN|QUEENS)$/i, "");

  // Remove common suffixes
  keyword = keyword.replace(/\s+(INC|LLC|LTD|CORP|CO|LP)\.?$/i, "");

  // Get first 2-3 words (usually the merchant name)
  const words = keyword.split(/\s+/).filter((w) => w.length > 2);
  keyword = words.slice(0, 3).join(" ");

  return keyword.trim();
}

/**
 * Check if we've seen this merchant before (from previous AI categorizations)
 * @param {string} description - Transaction description
 * @param {number} userId - User ID
 * @returns {Promise<Object|null>} Cached pattern or null
 */
async function checkSmartCache(description, userId) {
  const keyword = extractMerchantKeyword(description);

  if (!keyword || keyword.length < 3) {
    return null;
  }

  // Check CustomCategorizationPattern table for fuzzy match
  const patterns = await CustomCategorizationPattern.findAll({
    where: { userId, isActive: true },
    order: [["priority", "DESC"]],
  });

  // Find best matching pattern
  for (const pattern of patterns) {
    try {
      const regex = new RegExp(pattern.pattern, "i");
      if (regex.test(description)) {
        return {
          category: pattern.category,
          source: "smart_cache",
          patternId: pattern.id,
          matchedPattern: pattern.pattern,
        };
      }
    } catch (err) {
      // Skip invalid regex
      continue;
    }
  }

  // Also check previous AI categorizations by keyword similarity
  const previousAI = await UncategorizedTransaction.findAll({
    where: {
      isRecategorized: true,
      finalCategory: { [require("sequelize").Op.ne]: "Uncategorized" },
    },
    limit: 1000, // Check last 1000 AI categorizations
    order: [["recategorizedAt", "DESC"]],
  });

  for (const prev of previousAI) {
    const prevKeyword = extractMerchantKeyword(prev.description);
    if (prevKeyword === keyword) {
      return {
        category: prev.finalCategory,
        source: "previous_ai",
        reasoning: prev.aiReasoning,
      };
    }
  }

  return null;
}

/**
 * Save AI categorization as reusable pattern for future uploads
 * @param {string} description - Transaction description
 * @param {string} category - Assigned category
 * @param {number} userId - User ID
 * @param {number} priority - Pattern priority (default 150 for AI-learned)
 * @returns {Promise<Object>} Created pattern
 */
async function saveToSmartCache(description, category, userId, priority = 150) {
  const keyword = extractMerchantKeyword(description);

  if (!keyword || keyword.length < 3 || category === "Uncategorized") {
    return null;
  }

  // Check if pattern already exists
  const existing = await CustomCategorizationPattern.findOne({
    where: {
      userId,
      pattern: keyword,
    },
  });

  if (existing) {
    // Update priority if AI used this pattern again (confidence boost)
    if (existing.category === category) {
      await existing.update({ priority: existing.priority + 10 });
      return existing;
    } else {
      // Category changed - update it
      await existing.update({ category, priority: priority + 10 });
      return existing;
    }
  }

  // Create new pattern
  const newPattern = await CustomCategorizationPattern.create({
    userId,
    category,
    pattern: keyword,
    priority,
    isActive: true,
  });

  return newPattern;
}

/**
 * Batch check smart cache for multiple transactions
 * @param {Array<Object>} transactions - Array of {id, description, amount, userId}
 * @returns {Promise<Object>} { cached: [...], needsAI: [...] }
 */
async function batchCheckSmartCache(transactions) {
  const cached = [];
  const needsAI = [];

  for (const txn of transactions) {
    const hit = await checkSmartCache(txn.description, txn.userId);

    if (hit) {
      cached.push({
        ...txn,
        cachedCategory: hit.category,
        cacheSource: hit.source,
        reasoning: hit.reasoning || `Matched pattern: ${hit.matchedPattern || "previous AI result"}`,
      });
    } else {
      needsAI.push(txn);
    }
  }

  return { cached, needsAI };
}

module.exports = {
  extractMerchantKeyword,
  checkSmartCache,
  saveToSmartCache,
  batchCheckSmartCache,
};
