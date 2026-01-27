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

  const storyIds = topStoriesResponse.data.slice(0, 30);

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

module.exports = {
  withRetry,
  fetchReddit,
  fetchHackerNews,
  fetchStackOverflow,
};
