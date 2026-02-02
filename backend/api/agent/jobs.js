const express = require("express");
const router = express.Router();
const { Feed, Article, JobRun, Topic, AgentUser } = require("../../db/agentDB");
const { isAgentLoggedIn, isAgentAdmin } = require("./middleware");
const { fetchReddit, fetchHackerNews, fetchStackOverflow, fetchBlogRSS, preFilterArticles } = require("./services/jobService");
const { batchCurateArticles } = require("./services/curationService");
const { Op } = require("sequelize");

// Trigger all feed fetches (for Render cron to call OR authenticated users)
// GET /api/agent/jobs/fetch-all?secret=YOUR_JOB_SECRET (cron)
// GET /api/agent/jobs/fetch-all (authenticated users)
router.get("/fetch-all", async (req, res, next) => {
  try {
    // Allow either: secret query param (for cron) OR valid auth token (for users)
    const jobSecret = process.env.JOB_SECRET;
    const hasValidSecret = jobSecret && req.query.secret === jobSecret;
    const token = req.headers.authorization;
    let authenticatedUser = null;

    if (!hasValidSecret && token) {
      // Try to authenticate via token
      try {
        const { AgentUser } = require("../../db/agentDB");
        authenticatedUser = await AgentUser.findByToken(token);
      } catch (err) {
        const error = new Error("Invalid authentication");
        error.status = 401;
        throw error;
      }
    } else if (!hasValidSecret) {
      const error = new Error("Invalid job secret or authentication required");
      error.status = 401;
      throw error;
    }

    // Get user AI curation settings (use authenticated user or first admin for cron)
    const user = authenticatedUser || (await AgentUser.findOne({ where: { isAdmin: true, isActive: true } }));
    const userSettings = user
      ? {
          aiPrompt: user.aiPrompt,
          relevanceThreshold: user.relevanceThreshold,
          maxArticlesPerRun: user.maxArticlesPerRun,
        }
      : {};

    const feeds = await Feed.findAll({ where: { isActive: true } });
    const results = [];

    for (const feed of feeds) {
      const jobRun = await JobRun.create({
        jobType: "feed_fetch",
        status: "running",
        startedAt: new Date(),
        feedId: feed.id,
      });

      try {
        let articles = [];

        if (feed.sourceType === "reddit") {
          articles = await fetchReddit(feed);
        } else if (feed.sourceType === "hackernews") {
          articles = await fetchHackerNews(feed);
        } else if (feed.sourceType === "stackoverflow") {
          const topics = await Topic.findAll({ where: { isActive: true } });
          articles = await fetchStackOverflow(feed, topics);
        } else if (feed.sourceType === "blog") {
          articles = await fetchBlogRSS(feed);
        }

        console.log(`Fetched ${articles.length} articles from ${feed.name}`);

        // STAGE 1: Keyword pre-filter (local, no tokens)
        const topics = await Topic.findAll({ where: { isActive: true } }).catch(() => []);
        const minScore = feed.sourceType === "hackernews" ? 50 : 20; // Aggressive filtering
        const preFiltered = preFilterArticles(articles, topics, minScore);

        console.log(
          `Pre-filter: ${preFiltered.length}/${articles.length} articles matched keywords (score ≥${minScore})`
        );

        // STAGE 1.5: Deduplicate by title (check last 7 days)
        const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        const recentTitles = await Article.findAll({
          where: {
            publishedAt: { [Op.gte]: sevenDaysAgo },
          },
          attributes: ["title"],
          raw: true,
        });

        const recentTitleSet = new Set(
          recentTitles.map((a) => a.title.toLowerCase().substring(0, 50))
        );

        const dedupedArticles = preFiltered.filter((article) => {
          const titlePrefix = article.title.toLowerCase().substring(0, 50);
          return !recentTitleSet.has(titlePrefix);
        });

        console.log(
          `Deduplication: ${dedupedArticles.length}/${preFiltered.length} are new (checked last 7 days)`
        );

        // STAGE 2: AI curation (only on deduplicated articles)
        const topicKeywords = Array.isArray(topics) && topics.length > 0
          ? topics.map((t) => t.keyword).join(", ")
          : "api,nestjs,http,microservices,nodejs"; // Fallback for safety
        const curatedArticles = await batchCurateArticles(dedupedArticles, topicKeywords, userSettings);

        console.log(
          `AI approved ${curatedArticles.length}/${dedupedArticles.length} after dedup (${preFiltered.length} pre-filtered, ${articles.length} total fetched)`
        );

        // Upsert only curated articles (avoid duplicates)
        let processed = 0;
        let rejected = 0;
        for (const article of curatedArticles) {
          const [instance, created] = await Article.findOrCreate({
            where: {
              externalId: article.externalId,
              sourceType: article.sourceType,
            },
            defaults: {
              ...article,
              feedId: feed.id,
              relevanceScore: article.relevanceScore,
              aiSummary: article.aiSummary,
            },
          });

          if (created) {
            processed++;
          } else {
            // Update existing article with new curation data
            await instance.update({
              score: article.score,
              commentCount: article.commentCount,
              relevanceScore: article.relevanceScore,
              aiSummary: article.aiSummary,
            });
          }
        }

        rejected = articles.length - curatedArticles.length;

        await feed.update({ lastFetchedAt: new Date() });
        await jobRun.update({
          status: "completed",
          completedAt: new Date(),
          articlesProcessed: processed,
        });

        results.push({
          feed: feed.name,
          status: "completed",
          articlesProcessed: processed,
          totalFetched: articles.length,
          keywordMatched: preFiltered.length,
          aiApproved: curatedArticles.length,
          aiRejected: rejected,
        });
      } catch (error) {
        console.error(`Error fetching ${feed.name}:`, error);

        await jobRun.update({
          status: "failed",
          completedAt: new Date(),
          errorMessage: error.message,
          retryCount: jobRun.retryCount + 1,
        });

        results.push({
          feed: feed.name,
          status: "failed",
          error: error.message,
        });
      }
    }

    res.send({ success: true, results });
  } catch (ex) {
    next(ex);
  }
});

// Manual trigger for single feed
router.post("/fetch/:feedId", isAgentLoggedIn, async (req, res, next) => {
  try {
    const feed = await Feed.findByPk(req.params.feedId);
    if (!feed) {
      const error = new Error("Feed not found");
      error.status = 404;
      throw error;
    }

    const jobRun = await JobRun.create({
      jobType: "feed_fetch",
      status: "running",
      startedAt: new Date(),
      feedId: feed.id,
    });

    try {
      let articles = [];

      if (feed.sourceType === "reddit") {
        articles = await fetchReddit(feed);
      } else if (feed.sourceType === "hackernews") {
        articles = await fetchHackerNews(feed);
      } else if (feed.sourceType === "stackoverflow") {
        const topics = await Topic.findAll({ where: { isActive: true } });
        articles = await fetchStackOverflow(feed, topics);
      } else if (feed.sourceType === "blog") {
        articles = await fetchBlogRSS(feed);
      }

      console.log(`Fetched ${articles.length} articles from ${feed.name}`);

      // STAGE 1: Keyword pre-filter (local, no tokens)
      const topics = await Topic.findAll({ where: { isActive: true } }).catch(() => []);
      const minScore = feed.sourceType === "hackernews" ? 50 : 20; // Aggressive filtering
      const preFiltered = preFilterArticles(articles, topics, minScore);

      console.log(
        `Pre-filter: ${preFiltered.length}/${articles.length} articles matched keywords (score ≥${minScore})`
      );

      // STAGE 1.5: Deduplicate by title (check last 7 days)
      const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      const recentTitles = await Article.findAll({
        where: {
          publishedAt: { [Op.gte]: sevenDaysAgo },
        },
        attributes: ["title"],
        raw: true,
      });

      const recentTitleSet = new Set(
        recentTitles.map((a) => a.title.toLowerCase().substring(0, 50))
      );

      const dedupedArticles = preFiltered.filter((article) => {
        const titlePrefix = article.title.toLowerCase().substring(0, 50);
        return !recentTitleSet.has(titlePrefix);
      });

      console.log(
        `Deduplication: ${dedupedArticles.length}/${preFiltered.length} are new (checked last 7 days)`
      );

      // STAGE 2: AI curation (only on deduplicated articles)
      const userSettings = {
        aiPrompt: req.user.aiPrompt,
        relevanceThreshold: req.user.relevanceThreshold,
        maxArticlesPerRun: req.user.maxArticlesPerRun,
      };

      const topicKeywords = Array.isArray(topics) && topics.length > 0
        ? topics.map((t) => t.keyword).join(", ")
        : "api,nestjs,http,microservices,nodejs"; // Default topics if none exist
      const curatedArticles = await batchCurateArticles(dedupedArticles, topicKeywords, userSettings);

      console.log(
        `AI approved ${curatedArticles.length}/${dedupedArticles.length} after dedup (${preFiltered.length} pre-filtered, ${articles.length} total fetched)`
      );

      let processed = 0;
      for (const article of curatedArticles) {
        const [instance, created] = await Article.findOrCreate({
          where: {
            externalId: article.externalId,
            sourceType: article.sourceType,
          },
          defaults: {
            ...article,
            feedId: feed.id,
            relevanceScore: article.relevanceScore,
            aiSummary: article.aiSummary,
          },
        });

        if (created) {
          processed++;
        } else {
          await instance.update({
            score: article.score,
            commentCount: article.commentCount,
            relevanceScore: article.relevanceScore,
            aiSummary: article.aiSummary,
          });
        }
      }

      await feed.update({ lastFetchedAt: new Date() });
      await jobRun.update({
        status: "completed",
        completedAt: new Date(),
        articlesProcessed: processed,
      });

      res.send({
        success: true,
        feed: feed.name,
        articlesProcessed: processed,
        totalFetched: articles.length,
        keywordMatched: preFiltered.length,
        aiApproved: curatedArticles.length,
        aiRejected: articles.length - curatedArticles.length,
      });
    } catch (error) {
      await jobRun.update({
        status: "failed",
        completedAt: new Date(),
        errorMessage: error.message,
        retryCount: jobRun.retryCount + 1,
      });

      throw error;
    }
  } catch (ex) {
    next(ex);
  }
});

// Get job history
router.get("/history", isAgentLoggedIn, async (req, res, next) => {
  try {
    const { limit = 50, offset = 0 } = req.query;

    const jobs = await JobRun.findAll({
      order: [["startedAt", "DESC"]],
      limit: parseInt(limit),
      offset: parseInt(offset),
      include: [
        {
          model: Feed,
          attributes: ["id", "name", "sourceType"],
        },
      ],
    });

    const count = await JobRun.count();

    res.send({
      jobs,
      count,
      limit: parseInt(limit),
      offset: parseInt(offset),
    });
  } catch (ex) {
    next(ex);
  }
});

// Get recent job stats
router.get("/stats", isAgentLoggedIn, async (req, res, next) => {
  try {
    const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000);

    const stats = {
      totalJobs: await JobRun.count(),
      recentJobs: await JobRun.count({
        where: { startedAt: { [Op.gte]: last24Hours } },
      }),
      failedJobs: await JobRun.count({
        where: { status: "failed" },
      }),
      totalArticles: await Article.count(),
      unreadArticles: await Article.count({
        where: { isRead: false },
      }),
      savedArticles: await Article.count({
        where: { isSaved: true },
      }),
    };

    res.send(stats);
  } catch (ex) {
    next(ex);
  }
});

module.exports = router;
