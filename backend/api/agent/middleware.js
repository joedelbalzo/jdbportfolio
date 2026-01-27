const { AgentUser } = require("../../db/agentDB");

const isAgentLoggedIn = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      const error = new Error("No authorization token provided");
      error.status = 401;
      throw error;
    }
    const user = await AgentUser.findByToken(token);
    req.user = user;
    next();
  } catch (ex) {
    next(ex);
  }
};

const isAgentAdmin = async (req, res, next) => {
  try {
    if (req.user && req.user.isAdmin === true) {
      next();
    } else {
      const error = new Error("Admin access required");
      error.status = 403;
      throw error;
    }
  } catch (ex) {
    next(ex);
  }
};

module.exports = { isAgentLoggedIn, isAgentAdmin };
