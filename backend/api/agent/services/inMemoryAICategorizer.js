const Anthropic = require("@anthropic-ai/sdk");
const { CATEGORIZATION_RULES, getBucket } = require("./financialAnalyzer");
const { CustomCategorizationPattern } = require("../../../db/agentDB");

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

/**
 * Categorize uncategorized transactions with AI (in-memory, no DB writes except patterns)
 * @param {Array} uncategorized - Uncategorized transactions
 * @param {string} userId - User ID for saving patterns
 * @returns {Promise<Object>} { categorized, suggestions }
 */
async function categorizeWithAI(uncategorized, userId) {
  if (uncategorized.length === 0) {
    return { categorized: [], suggestions: [] };
  }

  const existingCategories = CATEGORIZATION_RULES.map(([category]) => category).sort();

  const prompt = `You are a financial categorization assistant. Categorize these credit card transactions.

EXISTING CATEGORIES (use one of these):
${existingCategories.map((cat) => `- ${cat}`).join("\n")}

INSTRUCTIONS:
1. Match each transaction to the MOST APPROPRIATE category
2. If uncertain, use "Uncategorized"
3. Return JSON array:

[
  {
    "description": "transaction description",
    "suggestedCategory": "Category Name",
    "reasoning": "Brief explanation (1 sentence)",
    "confidence": "high|medium|low"
  }
]

TRANSACTIONS:
${uncategorized.map((txn, i) => `${i + 1}. ${txn.description} - $${txn.absAmount.toFixed(2)}`).join("\n")}

Return ONLY the JSON array.`;

  const BATCH_SIZE = 50;
  const allSuggestions = [];
  const categorized = [];

  for (let i = 0; i < uncategorized.length; i += BATCH_SIZE) {
    const batch = uncategorized.slice(i, i + BATCH_SIZE);

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-5-20250929",
      max_tokens: 4096,
      messages: [{ role: "user", content: prompt }],
    });

    // Strip markdown code blocks if present
    let responseText = message.content[0].text.trim();
    if (responseText.startsWith("```")) {
      responseText = responseText.replace(/^```(?:json)?\s*\n/, "").replace(/\n```\s*$/, "");
    }

    const suggestions = JSON.parse(responseText);

    for (let j = 0; j < batch.length && j < suggestions.length; j++) {
      const txn = batch[j];
      const suggestion = suggestions[j];

      if (suggestion.suggestedCategory !== "Uncategorized" && suggestion.confidence === "high") {
        // Auto-apply high-confidence suggestions
        const categorizedTxn = {
          ...txn,
          category: suggestion.suggestedCategory,
          bucket: getBucket(suggestion.suggestedCategory),
          aiCategorized: true,
          aiReasoning: suggestion.reasoning,
        };
        categorized.push(categorizedTxn);

        // Save pattern for reuse
        await CustomCategorizationPattern.create({
          userId,
          category: suggestion.suggestedCategory,
          pattern: txn.description,
          priority: 50,
          isActive: true,
        });
      }

      allSuggestions.push({
        description: txn.description,
        amount: txn.absAmount,
        date: txn.date,
        suggestedCategory: suggestion.suggestedCategory,
        reasoning: suggestion.reasoning,
        confidence: suggestion.confidence,
        autoApplied: suggestion.confidence === "high" && suggestion.suggestedCategory !== "Uncategorized",
      });
    }
  }

  return {
    categorized,
    suggestions: allSuggestions,
  };
}

module.exports = {
  categorizeWithAI,
};
