const { User, Business } = require("../../db/valiDB");
const path = require("path");

require("dotenv").config({ path: path.resolve(__dirname, "..", ".env") });

const isValiLoggedIn = async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization, {
      include: [
        {
          model: Business,
        },
      ],
    });
    req.user = user;
    next();
  } catch (ex) {
    next(ex);
  }
};

const isValiAdmin = async (req, res, next) => {
  try {
    const admin = await User.findByToken(req.headers.authorization);
    if (admin && admin.adminStatus == true) {
      next();
    } else {
      res.status(401).send("For [Admin] Eyes Only");
    }
  } catch (ex) {
    console.error(ex);
    res.status(500).send("Internal Server Error");
  }
};

const restrictValiAccess = (req, res, next) => {
  console.log("restricted 2");
  const origin = req.headers.origin || req.headers.referer;
  console.log("origin is...", origin);
  const allowedOrigins = [
    "https://www.joinvali.com",
    "https://joinvali.com",
    "http://localhost:3000",
    "http://localhost:5000",
    "https://joedelbalzo.github.io",
    "https://joedelbalzo.github.io/",
    "joedelbalzo.github.io",
    "https://joedelbalzo.github.io/kan-th/",
    "localhost:3000",
    "localhost:5000",
  ];
  if (process.env.DEV_SITE) {
    allowedOrigins.push(process.env.DEV_SITE);
  }

  if (origin && allowedOrigins.some((allowedOrigin) => origin.startsWith(allowedOrigin))) {
    next();
  } else {
    res.status(403).send("Stairway Denied: This origin is not allowed access.");
  }
};
module.exports = {
  isValiAdmin,
  isValiLoggedIn,
  restrictValiAccess,
};
