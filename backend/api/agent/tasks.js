const express = require("express");
const taskRoutes = express.Router();
const { TaskTemplate, TaskCompletion } = require("../../db/agentDB");
const { isAgentLoggedIn } = require("./middleware");
const { Op } = require("sequelize");
const { sendDueTaskReminders } = require("./services/emailService");

// Get all tasks for the current user
taskRoutes.get("/", isAgentLoggedIn, async (req, res, next) => {
  try {
    const tasks = await TaskTemplate.findAll({
      where: { agentuserId: req.user.id },
      include: [
        {
          model: TaskCompletion,
          limit: 5,
          order: [["completedAt", "DESC"]],
        },
      ],
      order: [["nextDueAt", "ASC"]],
    });

    res.json(tasks);
  } catch (ex) {
    next(ex);
  }
});

// Get upcoming/overdue tasks
taskRoutes.get("/upcoming", isAgentLoggedIn, async (req, res, next) => {
  try {
    const now = new Date();
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);

    const tasks = await TaskTemplate.findAll({
      where: {
        agentuserId: req.user.id,
        nextDueAt: {
          [Op.lte]: thirtyDaysFromNow,
        },
      },
      order: [["nextDueAt", "ASC"]],
    });

    res.json(tasks);
  } catch (ex) {
    next(ex);
  }
});

// Create a new task template
taskRoutes.post("/", isAgentLoggedIn, async (req, res, next) => {
  try {
    const { name, defaultInterval } = req.body;

    if (!name || !defaultInterval) {
      const error = new Error("Name and defaultInterval are required");
      error.status = 400;
      throw error;
    }

    const task = await TaskTemplate.create({
      name: name.trim(),
      defaultInterval: parseInt(defaultInterval),
      currentInterval: parseInt(defaultInterval),
      agentuserId: req.user.id,
    });

    res.status(201).json(task);
  } catch (ex) {
    next(ex);
  }
});

// Update a task template
taskRoutes.put("/:id", isAgentLoggedIn, async (req, res, next) => {
  try {
    const task = await TaskTemplate.findOne({
      where: { id: req.params.id, agentuserId: req.user.id },
    });

    if (!task) {
      const error = new Error("Task not found");
      error.status = 404;
      throw error;
    }

    const { name, defaultInterval } = req.body;
    if (name) task.name = name.trim();
    if (defaultInterval) {
      task.defaultInterval = parseInt(defaultInterval);
      task.currentInterval = parseInt(defaultInterval);
    }

    await task.save();
    res.json(task);
  } catch (ex) {
    next(ex);
  }
});

// Delete a task template
taskRoutes.delete("/:id", isAgentLoggedIn, async (req, res, next) => {
  try {
    const task = await TaskTemplate.findOne({
      where: { id: req.params.id, agentuserId: req.user.id },
    });

    if (!task) {
      const error = new Error("Task not found");
      error.status = 404;
      throw error;
    }

    await task.destroy();
    res.status(204).send();
  } catch (ex) {
    next(ex);
  }
});

// Record a task completion with feedback
taskRoutes.post("/:id/complete", isAgentLoggedIn, async (req, res, next) => {
  try {
    const task = await TaskTemplate.findOne({
      where: { id: req.params.id, agentuserId: req.user.id },
    });

    if (!task) {
      const error = new Error("Task not found");
      error.status = 404;
      throw error;
    }

    const { completedAt, wishEarlier } = req.body;
    const completionDate = completedAt ? new Date(completedAt) : new Date();

    // Calculate days late (if overdue)
    let daysLate = 0;
    let actualInterval = null;

    if (task.nextDueAt) {
      const diffTime = completionDate - task.nextDueAt;
      daysLate = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (daysLate < 0) daysLate = 0;
    }

    if (task.lastCompletedAt) {
      const diffTime = completionDate - task.lastCompletedAt;
      actualInterval = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }

    // Record completion
    const completion = await TaskCompletion.create({
      tasktemplateId: task.id,
      completedAt: completionDate,
      wishEarlier: wishEarlier !== undefined ? wishEarlier : null,
      daysLate,
      actualInterval,
    });

    // Adjust interval based on feedback (simple rule-based approach)
    if (wishEarlier === true) {
      // User wishes they did it sooner - decrease interval by 1 day (min 1 day)
      task.currentInterval = Math.max(1, task.currentInterval - 1);
    } else if (wishEarlier === false) {
      // User is fine with timing or wishes they did it later - increase interval by 1 day
      task.currentInterval = task.currentInterval + 1;
    }

    // Update task's last completed and next due dates
    task.lastCompletedAt = completionDate;
    const nextDue = new Date(completionDate);
    nextDue.setDate(nextDue.getDate() + task.currentInterval);
    task.nextDueAt = nextDue;

    await task.save();

    res.json({ task, completion });
  } catch (ex) {
    next(ex);
  }
});

// Get completion history for a task
taskRoutes.get("/:id/history", isAgentLoggedIn, async (req, res, next) => {
  try {
    const task = await TaskTemplate.findOne({
      where: { id: req.params.id, agentuserId: req.user.id },
    });

    if (!task) {
      const error = new Error("Task not found");
      error.status = 404;
      throw error;
    }

    const completions = await TaskCompletion.findAll({
      where: { tasktemplateId: task.id },
      order: [["completedAt", "DESC"]],
      limit: 50,
    });

    res.json(completions);
  } catch (ex) {
    next(ex);
  }
});

// Send task reminder emails (for cron or manual trigger)
// GET /api/agent/tasks/send-reminders?secret=YOUR_JOB_SECRET (cron)
// GET /api/agent/tasks/send-reminders (authenticated users)
taskRoutes.get("/send-reminders", async (req, res, next) => {
  try {
    // Allow either: secret query param (for cron) OR valid auth token (for users)
    const jobSecret = process.env.JOB_SECRET;
    const hasValidSecret = jobSecret && req.query.secret === jobSecret;
    const token = req.headers.authorization;

    if (!hasValidSecret && token) {
      // Try to authenticate via token
      try {
        const { AgentUser } = require("../../db/agentDB");
        await AgentUser.findByToken(token);
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

    const results = await sendDueTaskReminders();

    res.json({
      success: true,
      message: "Task reminders processed",
      results,
    });
  } catch (ex) {
    next(ex);
  }
});

module.exports = taskRoutes;
