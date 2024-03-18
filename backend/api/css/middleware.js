const { CssUser } = require("../../db/cssDB");

const isLoggedIn = async (req, res, next) => {
  try {
    const user = await CssUser.findByToken(req.headers.authorization);
    req.user = user;
    next();
  } catch (ex) {
    next(ex);
  }
};

module.exports = {
  isLoggedIn,
};
