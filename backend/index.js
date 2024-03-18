const app = require("./app");
const conn = require("./db/conn");
const { syncAndSeed, User, Place } = require("./db/openplacesDB");
const { syncAndSeedScript, UserScript, Product, LineItem, Order, Review } = require("./db/scriptDB");
const { syncAndSeedCss, CssUser, Component, Template, Palette } = require("./db/cssDB");
const { syncAndSeedAlgo, Question, CodingQuestion } = require("./db/algorhythmDB");
const { syncAndSeedVali } = require("./db/valiDB");

const cors = require("cors");

app.use(cors());

const init = async () => {
  try {
    await conn.sync({ force: true });
    try {
      await syncAndSeedScript();
      console.log("script has synced");
    } catch (err) {
      console.log("err syncing script");
    }

    try {
      await syncAndSeed();
      console.log("open places has synced");
    } catch (err) {
      console.log("err syncing open places");
    }

    try {
      await syncAndSeedCss();
      console.log("css has synced");
    } catch (err) {
      console.log("err syncing css");
    }

    try {
      await syncAndSeedAlgo();
      console.log("algo has synced");
    } catch (err) {
      console.log("err syncing algo");
    }

    try {
      await syncAndSeedVali();
      console.log("vali has synced");
    } catch (err) {
      console.log("err syncing vali");
    }

    const port = process.env.PORT || 5000;
    const server = app.listen(port, () => console.log(`listening on port ${port}`));
  } catch (ex) {
    console.log(ex);
  }
};

init();
