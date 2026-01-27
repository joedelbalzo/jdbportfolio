const express = require("express");
const router = express.Router();
const { Feed, Article } = require("../../db/agentDB");
const { isAgentLoggedIn, isAgentAdmin } = require("./middleware");

// GET all feeds
router.get("/", isAgentLoggedIn, async (req, res, next) => {
  try {
    const feeds = await Feed.findAll({
      order: [["name", "ASC"]],
      include: [
        {
          model: Article,
          limit: 1,
          order: [["fetchedAt", "DESC"]],
          attributes: ["id", "fetchedAt"],
        },
      ],
    });
    res.send(feeds);
  } catch (ex) {
    next(ex);
  }
});

// GET single feed
router.get("/:id", isAgentLoggedIn, async (req, res, next) => {
  try {
    const feed = await Feed.findByPk(req.params.id, {
      include: [
        {
          model: Article,
          limit: 10,
          order: [["fetchedAt", "DESC"]],
        },
      ],
    });
    if (!feed) {
      const error = new Error("Feed not found");
      error.status = 404;
      throw error;
    }
    res.send(feed);
  } catch (ex) {
    next(ex);
  }
});

// CREATE new feed (admin only)
router.post("/", isAgentLoggedIn, isAgentAdmin, async (req, res, next) => {
  try {
    const { name, sourceType, subreddit, isActive, fetchIntervalMinutes } = req.body;

    if (!name || !sourceType) {
      const error = new Error("Name and sourceType are required");
      error.status = 400;
      throw error;
    }

    if (sourceType === "reddit" && !subreddit) {
      const error = new Error("Subreddit is required for Reddit feeds");
      error.status = 400;
      throw error;
    }

    const feed = await Feed.create({
      name,
      sourceType,
      subreddit,
      isActive: isActive !== undefined ? isActive : true,
      fetchIntervalMinutes: fetchIntervalMinutes || 60,
    });

    res.status(201).send(feed);
  } catch (ex) {
    next(ex);
  }
});

// UPDATE feed (admin only)
router.put("/:id", isAgentLoggedIn, isAgentAdmin, async (req, res, next) => {
  try {
    const feed = await Feed.findByPk(req.params.id);
    if (!feed) {
      const error = new Error("Feed not found");
      error.status = 404;
      throw error;
    }

    const { name, subreddit, isActive, fetchIntervalMinutes } = req.body;
    await feed.update({
      ...(name && { name }),
      ...(subreddit && { subreddit }),
      ...(isActive !== undefined && { isActive }),
      ...(fetchIntervalMinutes && { fetchIntervalMinutes }),
    });

    res.send(feed);
  } catch (ex) {
    next(ex);
  }
});

// DELETE feed (admin only)
router.delete("/:id", isAgentLoggedIn, isAgentAdmin, async (req, res, next) => {
  try {
    const feed = await Feed.findByPk(req.params.id);
    if (!feed) {
      const error = new Error("Feed not found");
      error.status = 404;
      throw error;
    }

    await feed.destroy();
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});

module.exports = router;
