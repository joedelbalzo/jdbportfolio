const express = require("express");
const app = express();
const path = require("path");
const appAlgo = require("./api/algorhythm");
const appAgent = require("./api/agent/index.js");
const cors = require("cors");
const { warmSite } = require("./siteWarmer");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

warmSite("https://www.dawngryan.com");

//middleware
const restrictAccess = (req, res, next) => {
  const origin = req.headers.origin || req.headers.referer || "";
  if (origin.startsWith("https://algorhythm-joedelbalzo")) {
    return next();
  }
  res.status(403).send("Access Denied");
};

app.get("/sitemap.xml", (req, res) => {
  res.sendFile(path.join(__dirname, "../sitemap.xml"));
});

app.get("/robots.txt", (req, res) => {
  res.type("text/plain");
  res.sendFile(path.join(__dirname, "../robots.txt"));
});

// Hidden launcher page (env-configured, cookie-gated): see backend/launcher.js
require("./launcher")(app);

app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.use("/api/algorhythm", restrictAccess, appAlgo);
app.use("/api/agent/", appAgent);

app.get("/*splat", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

module.exports = app;
