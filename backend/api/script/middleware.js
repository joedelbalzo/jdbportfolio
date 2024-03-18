const { UserScript } = require("../../db/scriptDB");

//prof code
const isLoggedIn = async (req, res, next) => {
  try {
    const user = await UserScript.findByToken(req.headers.authorization);
    req.user = user;
    next();
  } catch (ex) {
    next(ex);
  }
};

module.exports = {
  isLoggedIn,
};
