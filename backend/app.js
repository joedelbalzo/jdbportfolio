const express = require("express");
const app = express();
const path = require("path");
const appAlgo = require("./api/algorhythm");
const appVali = require("./api/vali/index.js");
const appAgent = require("./api/agent/index.js");
const cors = require("cors");
const {warmSite} = require("./siteWarmer");

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

warmSite("https://www.dawngryan.com");
warmSite("https://www.joinvali.com");

//middleware
const restrictAccess = (req, res, next) => {
  const origin = req.headers.origin || req.headers.referer || "";
  if (origin.startsWith("https://algorhythm-joedelbalzo")) {
    return next();
  }
  res.status(403).send("Access Denied");
};
const restrictValiAccess = (req, res, next) => {
  const origin = req.headers.origin || req.headers.referer;
  const allowedOrigins = [
    "https://www.joinvali.com",
    "https://joinvali.com",
    "http://localhost:3000",
    "http://localhost:5001",
    "localhost:3000",
    "localhost:5001",
  ];
  if (process.env.DEV_SITE) {
    allowedOrigins.push(process.env.DEV_SITE);
  }

  if (origin && allowedOrigins.some((allowedOrigin) => origin.startsWith(allowedOrigin))) {
    next();
  } else {
    res.status(403).send("Access Denied: This origin is not allowed access.");
  }
};

app.get("/sitemap.xml", (req, res) => {
  res.sendFile(path.join(__dirname, "../sitemap.xml"));
});

app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.use("/api/algorhythm", restrictAccess, appAlgo);
app.use("/api/vali/", restrictValiAccess, appVali);
app.use("/api/agent/", appAgent);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

module.exports = app;
