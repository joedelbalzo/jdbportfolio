const axios = require("axios");

/**
 * Retry wrapper with exponential backoff
 * @param {Function} fn - Async function to retry
 * @param {number} maxRetries - Maximum number of retry attempts
 * @param {number} baseDelay - Base delay in milliseconds
 * @returns {Promise} - Result of the function
 */
const withRetry = async (fn, maxRetries = 3, baseDelay = 1000) => {
  let lastError;
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (attempt < maxRetries - 1) {
        const delay = baseDelay * Math.pow(2, attempt);
        console.log(`Retry attempt ${attempt + 1}/${maxRetries} after ${delay}ms delay`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }
  throw lastError;
};

/**
 * Fetch posts from a Reddit subreddit
 * @param {Object} feed - Feed object with subreddit property
 * @returns {Promise<Array>} - Array of article objects
 */
const fetchReddit = async (feed) => {
  if (!feed.subreddit) {
    throw new Error("Subreddit name is required for Reddit feeds");
  }

  const url = `https://www.reddit.com/r/${feed.subreddit}/hot.json?limit=25`;

  const response = await withRetry(() =>
    axios.get(url, {
      headers: {
        "User-Agent": process.env.REDDIT_USER_AGENT || "AgentPlatform/1.0 (by /u/yourredditusername)",
      },
      timeout: 10000,
    })
  );

  if (!response.data || !response.data.data || !response.data.data.children) {
    throw new Error("Invalid Reddit API response");
  }

  return response.data.data.children
    .map((post) => {
      const data = post.data;
      return {
        externalId: data.id,
        title: data.title,
        url: data.url,
        contentSnippet: data.selftext ? data.selftext.substring(0, 500) : null,
        author: data.author,
        score: data.score || 0,
        commentCount: data.num_comments || 0,
        publishedAt: new Date(data.created_utc * 1000),
        sourceType: "reddit",
      };
    })
    .filter((article) => article.title); // Filter out any invalid entries
};

/**
 * Fetch top stories from Hacker News
 * @param {Object} feed - Feed object (not used, but kept for consistency)
 * @returns {Promise<Array>} - Array of article objects
 */
const fetchHackerNews = async (feed) => {
  const topStoriesUrl = "https://hacker-news.firebaseio.com/v0/topstories.json";

  const topStoriesResponse = await withRetry(() =>
    axios.get(topStoriesUrl, {
      timeout: 10000,
    })
  );

  if (!Array.isArray(topStoriesResponse.data)) {
    throw new Error("Invalid Hacker News API response");
  }

  const storyIds = topStoriesResponse.data.slice(0, 100);

  const articles = await Promise.all(
    storyIds.map(async (id) => {
      try {
        const storyUrl = `https://hacker-news.firebaseio.com/v0/item/${id}.json`;
        const storyResponse = await withRetry(() =>
          axios.get(storyUrl, {
            timeout: 5000,
          })
        );

        const story = storyResponse.data;
        if (!story || !story.title) {
          return null;
        }

        return {
          externalId: String(story.id),
          title: story.title,
          url: story.url || `https://news.ycombinator.com/item?id=${story.id}`,
          contentSnippet: story.text ? story.text.substring(0, 500) : null,
          author: story.by,
          score: story.score || 0,
          commentCount: story.descendants || 0,
          publishedAt: new Date(story.time * 1000),
          sourceType: "hackernews",
        };
      } catch (error) {
        console.error(`Failed to fetch HN story ${id}:`, error.message);
        return null;
      }
    })
  );

  return articles.filter((article) => article !== null);
};

/**
 * Fetch questions from Stack Overflow by tags
 * @param {Object} feed - Feed object
 * @param {Array} topics - Array of topic objects with keyword property
 * @returns {Promise<Array>} - Array of article objects
 */
const fetchStackOverflow = async (feed, topics) => {
  if (!topics || topics.length === 0) {
    console.warn("No topics provided for Stack Overflow fetch, using default tags");
    topics = [{ keyword: "api" }, { keyword: "nodejs" }];
  }

  const tags = topics.map((t) => t.keyword).join(";");
  const url = `https://api.stackexchange.com/2.3/questions?order=desc&sort=activity&tagged=${tags}&site=stackoverflow&pagesize=25`;

  const response = await withRetry(() =>
    axios.get(url, {
      timeout: 10000,
    })
  );

  if (!response.data || !response.data.items) {
    throw new Error("Invalid Stack Overflow API response");
  }

  return response.data.items
    .map((question) => {
      return {
        externalId: String(question.question_id),
        title: question.title,
        url: question.link,
        contentSnippet: null,
        author: question.owner?.display_name || "Anonymous",
        score: question.score || 0,
        commentCount: question.answer_count || 0,
        publishedAt: new Date(question.creation_date * 1000),
        sourceType: "stackoverflow",
      };
    })
    .filter((article) => article.title);
};

/**
 * Fetch blog posts from RSS/Atom feeds
 * @param {Object} feed - Feed object with rssUrl property
 * @returns {Promise<Array>} - Array of article objects
 */
const fetchBlogRSS = async (feed) => {
  if (!feed.rssUrl) {
    throw new Error("RSS URL is required for blog feeds");
  }

  const response = await withRetry(() =>
    axios.get(feed.rssUrl, {
      headers: {
        "User-Agent": "AgentPlatform/1.0",
      },
      timeout: 10000,
    })
  );

  const xml = response.data;
  const articles = [];

  // Simple RSS/Atom parser using regex
  const items = xml.match(/<item>[\s\S]*?<\/item>|<entry>[\s\S]*?<\/entry>/g) || [];

  const daysAgo = 60; // Only get articles from last 60 days
  const cutoffDate = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000);

  for (const item of items) {
    try {
      const titleMatch = item.match(/<title(?:[^>]*)>(.*?)<\/title>/s);
      const linkMatch = item.match(/<link(?:[^>]*)>(.*?)<\/link>|<link[^>]*href="([^"]+)"/);
      const dateMatch =
        item.match(/<pubDate>(.*?)<\/pubDate>/) ||
        item.match(/<published>(.*?)<\/published>/) ||
        item.match(/<updated>(.*?)<\/updated>/);
      const descMatch =
        item.match(/<description(?:[^>]*)>(.*?)<\/description>/s) ||
        item.match(/<summary(?:[^>]*)>(.*?)<\/summary>/s) ||
        item.match(/<content(?:[^>]*)>(.*?)<\/content>/s);

      if (!titleMatch) continue;

      const title = titleMatch[1].replace(/<!\[CDATA\[(.*?)\]\]>/, "$1").trim();
      const url = (linkMatch[1] || linkMatch[2] || "").replace(/<!\[CDATA\[(.*?)\]\]>/, "$1").trim();
      const publishedAt = dateMatch ? new Date(dateMatch[1]) : new Date();
      const snippet = descMatch
        ? descMatch[1]
            .replace(/<!\[CDATA\[(.*?)\]\]>/, "$1")
            .replace(/<[^>]+>/g, "")
            .trim()
            .substring(0, 500)
        : null;

      // Only include articles from last 60 days
      if (publishedAt < cutoffDate) continue;

      articles.push({
        externalId: url, // Use URL as ID for blogs
        title,
        url,
        contentSnippet: snippet,
        author: feed.name,
        score: 0,
        commentCount: 0,
        publishedAt,
        sourceType: "blog",
      });
    } catch (err) {
      console.error("Error parsing RSS item:", err.message);
    }
  }

  return articles;
};

/**
 * Pre-filter articles by keywords and score before AI curation
 * Reduces token usage by only sending relevant candidates to Claude
 * @param {Array} articles - Array of article objects
 * @param {Array} topics - Array of topic objects with keyword property
 * @param {number} minScore - Minimum score threshold (default: 10)
 * @returns {Array} - Filtered articles
 */
const preFilterArticles = (articles, topics = [], minScore = 10) => {
  if (!articles || articles.length === 0) {
    return [];
  }

  // Build keyword list: always include defaults, merge with user topics
  const defaultKeywords = [
    "api", "apis", "rest", "graphql",
    "nestjs", "nest.js",
    "microservices", "microservice",
    "node", "nodejs", "node.js",
    "http", "https",
    "express",
    "backend",
    "architecture",
    "docker", "kubernetes", "k8s",
    "postgresql", "postgres", "database",
    "typescript",
    "system design", "distributed systems",
    "azure", "aws", "cloud",
    "ci/cd", "devops",
    "testing", "jest", "integration test",
    "security", "oauth", "jwt",
    "performance", "scaling", "caching", "redis",
    "sql", "orm", "sequelize",
    "webhook", "event-driven", "message queue", "rabbitmq", "kafka"
  ];
  const userKeywords = topics && topics.length > 0
    ? topics.map(t => t.keyword.toLowerCase())
    : [];
  const keywords = [...new Set([...defaultKeywords, ...userKeywords])];

  const filtered = articles.filter(article => {
    // Filter by score threshold
    if (article.score < minScore) {
      return false;
    }

    // Check title and content for keyword matches (whole word only)
    const searchText = `${article.title} ${article.contentSnippet || ""}`.toLowerCase();
    const hasKeyword = keywords.some(keyword => {
      // Use word boundaries to match whole words only
      const regex = new RegExp(`\\b${keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
      return regex.test(searchText);
    });

    if (hasKeyword) {
      console.log(`✓ Keyword match: "${article.title}" (score: ${article.score})`);
    } else {
      console.log(`✗ NO keyword match: "${article.title}" (score: ${article.score}) - keywords: [${keywords.join(', ')}]`);
    }

    return hasKeyword;
  });

  // Cap candidates sent to AI — take top 12 by score to control token usage
  const maxCandidates = 12;
  if (filtered.length > maxCandidates) {
    console.log(`Capping ${filtered.length} keyword matches to top ${maxCandidates} by score`);
    filtered.sort((a, b) => b.score - a.score);
    return filtered.slice(0, maxCandidates);
  }

  return filtered;
};

module.exports = {
  withRetry,
  fetchReddit,
  fetchHackerNews,
  fetchStackOverflow,
  fetchBlogRSS,
  preFilterArticles,
};
