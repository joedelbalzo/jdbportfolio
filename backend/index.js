const app = require("./app");
const conn = require("./db/conn");
const { syncAndSeedAlgo } = require("./db/algorhythmDB");
const { syncAndSeedAgent } = require("./db/agentDB");

const init = async () => {
  try {
    await conn.sync();

    try {
      await syncAndSeedAlgo();
    } catch (err) {
      console.error("err syncing algo", err);
    }

    try {
      await syncAndSeedAgent();
    } catch (err) {
      console.error("err syncing agent", err);
    }

    const port = process.env.PORT || 5001;
    app.listen(port, () => console.log(`listening on port ${port}`));
  } catch (ex) {
    console.error(ex);
  }
};

init();
