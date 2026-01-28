const express = require("express");
const appAgent = express();

const authRoutes = require("./auth");
const feedRoutes = require("./feeds");
const articleRoutes = require("./articles");
const topicRoutes = require("./topics");
const jobRoutes = require("./jobs");
const settingsRoutes = require("./settings");

appAgent.use(express.json());

appAgent.use("/auth", authRoutes);
appAgent.use("/feeds", feedRoutes);
appAgent.use("/articles", articleRoutes);
appAgent.use("/topics", topicRoutes);
appAgent.use("/jobs", jobRoutes);
appAgent.use("/settings", settingsRoutes);

// Error handling middleware
appAgent.use((err, req, res, next) => {
  console.error("Agent API Error:", err);
  res.status(err.status || 500).send({ error: err.message || "Internal Server Error" });
});

module.exports = appAgent;
