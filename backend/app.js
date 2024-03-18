const express = require("express");
const app = express();
const path = require("path");
const appAlgo = require("./api/algorhythm");
const appVali = require("./api/vali/index.js");
const cors = require("cors");
const { warmSite } = require("./siteWarmer");
const bodyParser = require("body-parser");

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

warmSite("https://www.dawngryan.com");
console.log("warming");

//middleware
const restrictAccess = (req, res, next) => {
  const origin = req.headers.origin || req.headers.referer || "localhost:5000";
  console.log("origin", origin);
  if (origin) {
    if (
      origin === "https://algorhythm-joedelbalzo.vercel.app/" ||
      "https://algorhythm-joedelbalzo.vercel.app" ||
      origin.startsWith("https://algorhythm-joedelbalzo") ||
      origin.startsWith("algorhythm-joedelbalzo")
    ) {
      next();
    } else {
      res.status(403).send("Access Denied: Only https://algorhythm-joedelbalzo.vercel.app/ and its subpaths can access the database.");
    }
  } else {
    res.status(403).send("Access Denied: Origin or Referer header is not set.");
  }
};
const restrictValiAccess = (req, res, next) => {
  console.log("restricted 1");
  const origin = req.headers.origin || req.headers.referer;
  console.log("origin is...", origin);
  const allowedOrigins = [
    "https://www.joinvali.com",
    "https://joinvali.com",
    "http://localhost:3000",
    "http://localhost:5000",
    "localhost:3000",
    "localhost:5000",
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

app.use("/api/script/reviews", require("./api/script/reviews"));
app.use("/api/script/auth", require("./api/script/auth"));
app.use("/api/script/orders", require("./api/script/orders"));
app.use("/api/script/menu", require("./api/script/drinks"));
app.use("/api/script/merches", require("./api/script/merches"));

app.use("/api/openplaces/auth", require("./api/openplaces/auth"));
app.use("/api/openplaces/places", require("./api/openplaces/places"));

app.use("/api/css/auth", require("./api/css/auth"));
app.use("/api/css/components", require("./api/css/components"));
app.use("/api/css/cpg", require("./api/css/cpg"));
app.use("/api/css/templates", require("./api/css/templates"));

module.exports = app;
