const express = require("express");
const router = express.Router();
const { isAgentLoggedIn } = require("./middleware");

// GET user settings
router.get("/", isAgentLoggedIn, async (req, res, next) => {
  try {
    res.send({
      taskPreferences: req.user.taskPreferences,
    });
  } catch (ex) {
    next(ex);
  }
});

// UPDATE user settings
router.put("/", isAgentLoggedIn, async (req, res, next) => {
  try {
    const { taskPreferences } = req.body;
    const updates = {};
    if (taskPreferences !== undefined) updates.taskPreferences = taskPreferences;

    await req.user.update(updates);

    res.send({
      taskPreferences: req.user.taskPreferences,
    });
  } catch (ex) {
    next(ex);
  }
});

module.exports = router;
