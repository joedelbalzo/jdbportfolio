const express = require("express");
const router = express.Router();
const { Article, Feed, Topic } = require("../../db/agentDB");
const { isAgentLoggedIn } = require("./middleware");
const { Op } = require("sequelize");

// GET all articles with filters
router.get("/", isAgentLoggedIn, async (req, res, next) => {
  try {
    const { sourceType, isRead, isSaved, limit = 50, offset = 0 } = req.query;

    const whereClause = {};
    if (sourceType) {
      whereClause.sourceType = sourceType;
    }
    if (isRead !== undefined) {
      whereClause.isRead = isRead === "true";
    }
    if (isSaved !== undefined) {
      whereClause.isSaved = isSaved === "true";
    }

    const articles = await Article.findAll({
      where: whereClause,
      include: [
        {
          model: Feed,
          attributes: ["id", "name", "sourceType"],
        },
        {
          model: Topic,
          attributes: ["id", "keyword"],
          through: { attributes: [] },
        },
      ],
      order: [["publishedAt", "DESC"]],
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    const count = await Article.count({ where: whereClause });

    res.send({
      articles,
      count,
      limit: parseInt(limit),
      offset: parseInt(offset),
    });
  } catch (ex) {
    next(ex);
  }
});

// GET single article
router.get("/:id", isAgentLoggedIn, async (req, res, next) => {
  try {
    const article = await Article.findByPk(req.params.id, {
      include: [
        {
          model: Feed,
          attributes: ["id", "name", "sourceType"],
        },
        {
          model: Topic,
          attributes: ["id", "keyword"],
          through: { attributes: [] },
        },
      ],
    });

    if (!article) {
      const error = new Error("Article not found");
      error.status = 404;
      throw error;
    }

    res.send(article);
  } catch (ex) {
    next(ex);
  }
});

// Mark article as read
router.put("/:id/read", isAgentLoggedIn, async (req, res, next) => {
  try {
    const article = await Article.findByPk(req.params.id);
    if (!article) {
      const error = new Error("Article not found");
      error.status = 404;
      throw error;
    }

    await article.update({ isRead: true });
    res.send(article);
  } catch (ex) {
    next(ex);
  }
});

// Toggle article saved status
router.put("/:id/save", isAgentLoggedIn, async (req, res, next) => {
  try {
    const article = await Article.findByPk(req.params.id);
    if (!article) {
      const error = new Error("Article not found");
      error.status = 404;
      throw error;
    }

    await article.update({ isSaved: !article.isSaved });
    res.send(article);
  } catch (ex) {
    next(ex);
  }
});

// Mark multiple articles as read
router.post("/mark-read", isAgentLoggedIn, async (req, res, next) => {
  try {
    const { articleIds } = req.body;

    if (!Array.isArray(articleIds) || articleIds.length === 0) {
      const error = new Error("articleIds array is required");
      error.status = 400;
      throw error;
    }

    await Article.update({ isRead: true }, { where: { id: { [Op.in]: articleIds } } });

    res.send({ success: true, count: articleIds.length });
  } catch (ex) {
    next(ex);
  }
});

module.exports = router;
