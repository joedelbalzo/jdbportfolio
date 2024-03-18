const express = require("express");
const appVali = express();

const authRoutes = require("./auth");
const blogPostRoutes = require("./blogposts");
const contactRoutes = require("./contact");
const imageRoutes = require("./images");
const middleware = require("./middleware").middleware;
const tagRoutes = require("./tags");

appVali.use(express.json());

appVali.use("/auth", authRoutes);
appVali.use("/blogposts", blogPostRoutes);
appVali.use("/contact", contactRoutes);
appVali.use("/images", imageRoutes);
appVali.use("/tags", tagRoutes);

appVali.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ error: err });
});

module.exports = appVali;
