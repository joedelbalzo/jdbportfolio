const app = require("./app");
const conn = require("./db/conn");

const { syncAndSeed, User, Place } = require("./db/openplacesDB");
const {
  syncAndSeedScript,
  UserScript,
  Product,
  LineItem,
  Order,
  Review,
} = require("./db/scriptDB");

const init = async () => {
  try {
    await conn.sync({ force: true });
    // console.log("Database synced");

    await syncAndSeed();
    // console.log("open places has synced");

    await syncAndSeedScript();
    // console.log("script has synced");
    const port = process.env.PORT || 3000;
    const server = app.listen(port, () => console.log(`listening on port ${port}`));
  } catch (ex) {
    console.log(ex);
  }
};

init();
