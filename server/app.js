const express = require("express");
const app = express();
const path = require("path");

app.use(express.json());

app.use("/dist", express.static(path.join(__dirname, "../dist")));
app.use("/public", express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"), { client_id: process.env.client_id });
});

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
