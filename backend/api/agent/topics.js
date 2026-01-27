const express = require("express");
const router = express.Router();
const { Topic } = require("../../db/agentDB");
const { isAgentLoggedIn } = require("./middleware");

// GET all topics for current user
router.get("/", isAgentLoggedIn, async (req, res, next) => {
  try {
    const topics = await Topic.findAll({
      where: { agentuserId: req.user.id },
      order: [["keyword", "ASC"]],
    });
    res.send(topics);
  } catch (ex) {
    next(ex);
  }
});

// CREATE new topic
router.post("/", isAgentLoggedIn, async (req, res, next) => {
  try {
    const { keyword, isActive } = req.body;

    if (!keyword) {
      const error = new Error("Keyword is required");
      error.status = 400;
      throw error;
    }

    const topic = await Topic.create({
      keyword: keyword.toLowerCase().trim(),
      isActive: isActive !== undefined ? isActive : true,
      agentuserId: req.user.id,
    });

    res.status(201).send(topic);
  } catch (ex) {
    next(ex);
  }
});

// UPDATE topic
router.put("/:id", isAgentLoggedIn, async (req, res, next) => {
  try {
    const topic = await Topic.findOne({
      where: { id: req.params.id, agentuserId: req.user.id },
    });

    if (!topic) {
      const error = new Error("Topic not found");
      error.status = 404;
      throw error;
    }

    const { keyword, isActive } = req.body;
    await topic.update({
      ...(keyword && { keyword: keyword.toLowerCase().trim() }),
      ...(isActive !== undefined && { isActive }),
    });

    res.send(topic);
  } catch (ex) {
    next(ex);
  }
});

// DELETE topic
router.delete("/:id", isAgentLoggedIn, async (req, res, next) => {
  try {
    const topic = await Topic.findOne({
      where: { id: req.params.id, agentuserId: req.user.id },
    });

    if (!topic) {
      const error = new Error("Topic not found");
      error.status = 404;
      throw error;
    }

    await topic.destroy();
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});

module.exports = router;
