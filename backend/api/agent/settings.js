const express = require("express");
const router = express.Router();
const { AgentUser } = require("../../db/agentDB");
const { isAgentLoggedIn } = require("./middleware");

// GET user settings
router.get("/", isAgentLoggedIn, async (req, res, next) => {
  try {
    res.send({
      aiPrompt: req.user.aiPrompt,
      relevanceThreshold: req.user.relevanceThreshold,
      maxArticlesPerRun: req.user.maxArticlesPerRun,
      taskPreferences: req.user.taskPreferences,
    });
  } catch (ex) {
    next(ex);
  }
});

// UPDATE user settings
router.put("/", isAgentLoggedIn, async (req, res, next) => {
  try {
    const { aiPrompt, relevanceThreshold, maxArticlesPerRun, taskPreferences } = req.body;

    const updates = {};
    if (aiPrompt !== undefined) updates.aiPrompt = aiPrompt;
    if (relevanceThreshold !== undefined) {
      if (relevanceThreshold < 0 || relevanceThreshold > 10) {
        const error = new Error("Relevance threshold must be between 0 and 10");
        error.status = 400;
        throw error;
      }
      updates.relevanceThreshold = relevanceThreshold;
    }
    if (maxArticlesPerRun !== undefined) {
      if (maxArticlesPerRun < 1 || maxArticlesPerRun > 100) {
        const error = new Error("Max articles per run must be between 1 and 100");
        error.status = 400;
        throw error;
      }
      updates.maxArticlesPerRun = maxArticlesPerRun;
    }
    if (taskPreferences !== undefined) updates.taskPreferences = taskPreferences;

    await req.user.update(updates);

    res.send({
      aiPrompt: req.user.aiPrompt,
      relevanceThreshold: req.user.relevanceThreshold,
      maxArticlesPerRun: req.user.maxArticlesPerRun,
      taskPreferences: req.user.taskPreferences,
    });
  } catch (ex) {
    next(ex);
  }
});

module.exports = router;
