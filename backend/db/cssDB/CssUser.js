const conn = require("../conn");
const { STRING, UUID, UUIDV4, TEXT, BOOLEAN } = conn.Sequelize;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT = process.env.JWT || "shhhhhh1234";
const axios = require("axios");

const CssUser = conn.define("cssUser", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  username: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    unique: true,
  },
  password: {
    type: STRING,
    //allowNull: false,
    //validate: {
    // notEmpty: true,
    // },
  },
  isAdmin: {
    type: BOOLEAN,
    defaultValue: false,
  },
  email: {
    type: STRING,
    /*allowNull: false,
    unique: true,
    validate: {
      notEmpty: {
        msg: 'Email address required.'
      }
      isEmail: {
        msg: 'Must be a valid email address.'
      }
    }*/
  },
  isOAuthUser: {
    type: BOOLEAN,
    defaultValue: false,
  },
});

CssUser.addHook("beforeSave", async (user) => {
  if (user.changed("password")) {
    user.password = await bcrypt.hash(user.password, 5);
  }
});

CssUser.findByToken = async function (token) {
  try {
    const { id } = jwt.verify(token, JWT);
    const user = await this.findByPk(id);
    if (user) {
      return user;
    }
    throw "user not found";
  } catch (ex) {
    const error = new Error("bad credentials");
    error.status = 401;
    throw error;
  }
};

CssUser.prototype.generateToken = function () {
  return jwt.sign({ id: this.id }, JWT);
};

CssUser.authenticateGithub = async function (code) {
  let response = await axios.post(
    "https://github.com/login/oauth/access_token",
    {
      client_id: process.env.client_id,
      client_secret: process.env.client_secret,
      code,
    },
    {
      headers: {
        accept: "application/json",
      },
    }
  );
  if (response.data.error) {
    const error = Error(response.data.error);
    error.status = 401;
    throw error;
  }
  response = await axios.get("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${response.data.access_token}`,
    },
  });
  const login = response.data.login;
  let user = await CssUser.findOne({
    where: {
      username: login,
    },
  });
  if (!user) {
    user = await CssUser.create({
      username: login,
      isOAuthUser: true,
    });
  }
  return user.generateToken();
};

CssUser.authenticate = async function ({ username, password }) {
  const user = await this.findOne({
    where: {
      username,
    },
  });
  if (user && (await bcrypt.compare(password, user.password))) {
    return jwt.sign({ id: user.id }, JWT);
  }
  const error = new Error("bad credentials");
  error.status = 401;
  throw error;
};

module.exports = CssUser;
