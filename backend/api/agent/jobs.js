const express = require("express");
const router = express.Router();
const { Feed, Article, JobRun, Topic } = require("../../db/agentDB");
const { isAgentLoggedIn, isAgentAdmin } = require("./middleware");
const { fetchReddit, fetchHackerNews, fetchStackOverflow } = require("./services/jobService");
const { batchCurateArticles } = require("./services/curationService");
const { Op } = require("sequelize");

// Trigger all feed fetches (for Render cron to call)
// GET /api/agent/jobs/fetch-all?secret=YOUR_JOB_SECRET
router.get("/fetch-all", async (req, res, next) => {
  try {
    // Simple secret check for cron job authentication
    const jobSecret = process.env.JOB_SECRET;
    if (jobSecret && req.query.secret !== jobSecret) {
      const error = new Error("Invalid job secret");
      error.status = 401;
      throw error;
    }

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
        }

        console.log(`Fetched ${articles.length} articles from ${feed.name}, running AI curation...`);

        // AI CURATION - Only save articles that pass AI filter
        const topics = await Topic.findAll({ where: { isActive: true } }).catch(() => []);
        const topicKeywords = Array.isArray(topics) && topics.length > 0
          ? topics.map((t) => t.keyword).join(", ")
          : "api,nestjs,http,microservices,nodejs"; // Default topics if none exist
        const curatedArticles = await batchCurateArticles(articles, topicKeywords);

        console.log(
          `AI approved ${curatedArticles.length}/${articles.length} articles from ${feed.name}`
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
      }

      console.log(`Fetched ${articles.length} articles from ${feed.name}, running AI curation...`);

      // AI CURATION - Only save articles that pass AI filter
      const topics = await Topic.findAll({ where: { isActive: true } }).catch(() => []);
      const topicKeywords = Array.isArray(topics) && topics.length > 0
        ? topics.map((t) => t.keyword).join(", ")
        : "api,nestjs,http,microservices,nodejs"; // Default topics if none exist
      const curatedArticles = await batchCurateArticles(articles, topicKeywords);

      console.log(
        `AI approved ${curatedArticles.length}/${articles.length} articles from ${feed.name}`
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
