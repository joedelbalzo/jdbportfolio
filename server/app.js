const express = require("express");
const app = express();
const path = require("path");
const appAlgo = require("./api/algorhythm");
const cors = require("cors");
const { warmSite } = require("./siteWarmer");

app.use(express.json());
app.use(cors());

warmSite("https://www.usevali.com");
warmSite("https://www.dawngryan.com");
console.log("warming");

//middleware
const restrictAccess = (req, res, next) => {
  const origin = req.headers.origin || req.headers.referer || "localhost:3000";
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

app.use("/dist", express.static(path.join(__dirname, "../dist")));
app.use("/public", express.static(path.join(__dirname, "../public")));

app.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"), { client_id: process.env.client_id });
});

app.get("/sitemap.xml", (req, res) => {
  res.sendFile(path.join(__dirname, "../sitemap.xml"));
});

app.use("/api/algorhythm", restrictAccess, appAlgo);

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
