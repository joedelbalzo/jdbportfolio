const Anthropic = require("@anthropic-ai/sdk");
const path = require("path");

require("dotenv").config({ path: path.resolve(__dirname, "../../..", ".env") });

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || process.env.CLAUDE_API_KEY,
});

/**
 * Curate articles using Claude AI
 * Filters out low-quality, irrelevant, or off-topic content
 * @param {Array} articles - Array of article objects to curate
 * @param {string} topicKeywords - Comma-separated topic keywords
 * @returns {Promise<Array>} - Curated articles with AI scores and summaries
 */
const curateArticles = async (articles, topicKeywords = "") => {
  if (!articles || articles.length === 0) {
    return [];
  }

  const curatedArticles = [];

  // Process articles in batches to avoid rate limits
  const batchSize = 5;
  for (let i = 0; i < articles.length; i += batchSize) {
    const batch = articles.slice(i, i + batchSize);

    const batchResults = await Promise.all(
      batch.map(async (article) => {
        try {
          return await curateArticle(article, topicKeywords);
        } catch (error) {
          // If AI curation fails, default to including the article with low score
          return {
            ...article,
            relevanceScore: 5,
            aiSummary: "AI curation unavailable",
            isRelevant: true,
          };
        }
      })
    );

    curatedArticles.push(...batchResults.filter((article) => article.isRelevant));

    // Small delay between batches to respect rate limits
    if (i + batchSize < articles.length) {
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }

  return curatedArticles;
};

/**
 * Curate a single article using Claude
 * @param {Object} article - Article object
 * @param {string} topicKeywords - Comma-separated topic keywords
 * @returns {Promise<Object>} - Article with curation metadata
 */
const curateArticle = async (article, topicKeywords) => {
  const prompt = `You are a technical content curator for a senior software engineer on a microservices team at JetBlue.

Your job is to evaluate if this article/post is worth their time. They care about:
- APIs (REST, GraphQL, API design, API best practices)
- NestJS framework
- Microservices architecture and patterns
- HTTP protocols and networking
- Node.js backend development
- Production-ready engineering practices

They want to AVOID:
- Beginner/tutorial content ("How to install NestJS")
- Memes, jokes, or low-effort posts
- Off-topic discussions
- Rants without substance
- Self-promotion or spam
- Broad career advice ("Should I learn X?")

Evaluate this article:
Title: ${article.title}
Source: ${article.sourceType}
Author: ${article.author || "Unknown"}
Score/Upvotes: ${article.score || 0}
${article.contentSnippet ? `Preview: ${article.contentSnippet.substring(0, 300)}` : ""}

Respond in JSON format ONLY (no markdown, no other text):
{
  "isRelevant": true/false,
  "relevanceScore": 0-10 (0=completely irrelevant, 10=must-read),
  "summary": "One sentence explaining why this is/isn't valuable",
  "reason": "Brief explanation of decision"
}

Be strict - only approve high-signal content.`;

  try {
    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-5-20250929",
      max_tokens: 200,
      temperature: 0.3,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const responseText = message.content[0].text.trim();

    // Try to parse JSON response
    let curation;
    try {
      curation = JSON.parse(responseText);
    } catch (parseError) {
      // Try to extract JSON from markdown code blocks if present
      const jsonMatch = responseText.match(/```(?:json)?\s*(\{[\s\S]*?\})\s*```/);
      if (jsonMatch) {
        curation = JSON.parse(jsonMatch[1]);
      } else {
        // Try parsing the text directly in case it's not wrapped
        curation = JSON.parse(responseText.replace(/^[^{]*/, "").replace(/[^}]*$/, ""));
      }
    }

    return {
      ...article,
      isRelevant: curation.isRelevant,
      relevanceScore: curation.relevanceScore,
      aiSummary: curation.summary,
      rejectionReason: !curation.isRelevant ? curation.reason : null,
    };
  } catch (error) {
    throw error;
  }
};

/**
 * Batch curate articles with a single API call (more efficient)
 * @param {Array} articles - Array of article objects
 * @param {string} topicKeywords - Comma-separated keywords
 * @param {Object} userSettings - User AI curation settings (aiPrompt, relevanceThreshold, maxArticlesPerRun)
 * @returns {Promise<Array>} - Curated articles
 */
const batchCurateArticles = async (articles, topicKeywords, userSettings = {}) => {
  if (!articles || articles.length === 0) {
    return [];
  }

  // Limit batch size to avoid token limits
  const maxBatchSize = 10;
  if (articles.length > maxBatchSize) {
    // Process in chunks
    const chunks = [];
    for (let i = 0; i < articles.length; i += maxBatchSize) {
      chunks.push(articles.slice(i, i + maxBatchSize));
    }

    const results = [];
    for (const chunk of chunks) {
      const chunkResults = await batchCurateArticles(chunk, topicKeywords, userSettings);
      results.push(...chunkResults);
      // Small delay between chunks
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
    return results;
  }

  // Use custom AI prompt or default
  const basePrompt =
    userSettings.aiPrompt ||
    `You are curating content for a senior software engineer working on microservices.
ONLY APPROVE articles that are production-ready engineering insights or advanced technical deep-dives.
Topics of interest: {topics}
REJECT: beginner tutorials, memes, generic career advice, self-promotion.
Be VERY selective.`;

  const customPrompt = basePrompt.replace("{topics}", topicKeywords);

  const articlesText = articles
    .map(
      (article, idx) => `
Article ${idx + 1}:
Title: ${article.title}
Source: ${article.sourceType}
Score: ${article.score || 0}
${article.contentSnippet ? `Preview: ${article.contentSnippet.substring(0, 200)}` : ""}
`
    )
    .join("\n---\n");

  const prompt = `${customPrompt}

Evaluate these ${articles.length} articles and return a JSON array with one object per article:

${articlesText}

Respond with a JSON array ONLY (no markdown):
[
  {
    "articleIndex": 0,
    "isRelevant": true/false,
    "relevanceScore": 0-10,
    "summary": "One sentence explaining value",
    "reason": "Brief decision explanation"
  },
  ...
]

Be strict - only approve high-signal content.`;

  try {
    const message = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1500,
      temperature: 0.3,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const responseText = message.content[0].text.trim();

    let curations;
    try {
      curations = JSON.parse(responseText);
    } catch (parseError) {
      const jsonMatch = responseText.match(/```(?:json)?\s*(\[[\s\S]*?\])\s*```/);
      if (jsonMatch) {
        curations = JSON.parse(jsonMatch[1]);
      } else {
        curations = JSON.parse(responseText.replace(/^[^\[]*/, "").replace(/[^\]]*$/, ""));
      }
    }

    const threshold = userSettings.relevanceThreshold || 7;
    const maxArticles = userSettings.maxArticlesPerRun || 15;

    const curatedArticles = articles
      .map((article, idx) => {
        const curation = curations.find((c) => c.articleIndex === idx) || curations[idx];
        if (!curation) {
          return null;
        }

        return {
          ...article,
          isRelevant: curation.isRelevant,
          relevanceScore: curation.relevanceScore,
          aiSummary: curation.summary,
          rejectionReason: !curation.isRelevant ? curation.reason : null,
        };
      })
      .filter((article) => article && article.isRelevant && article.relevanceScore >= threshold)
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, maxArticles);

    return curatedArticles;
  } catch (error) {
    console.error(`AI curation failed:`, error.message);
    console.log(`Including all ${articles.length} articles with default relevance`);
    // Fallback: include all articles with default score
    return articles.map(article => ({
      ...article,
      relevanceScore: 5,
      aiSummary: "AI curation unavailable",
      isRelevant: true,
    }));
  }
};

module.exports = {
  curateArticles,
  curateArticle,
  batchCurateArticles,
};
