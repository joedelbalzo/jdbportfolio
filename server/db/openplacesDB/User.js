const conn = require("../conn");
const { STRING, UUID, UUIDV4, BOOLEAN, ARRAY, INTEGER, DECIMAL } = conn.Sequelize;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT = process.env.JWT || "shhhhhh1234";

const User = conn.define("user", {
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
    // unique: true,
  },
  password: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  isAdmin: {
    type: BOOLEAN,
    defaultValue: false,
  },
  settingRadius: {
    type: INTEGER,
    allowNull: false,
    defaultValue: 500,
    validate: {
      min: 100,
    },
  },
  settingFavCategories: {
    type: ARRAY(STRING),
    allowNull: false,
    defaultValue: ["cafe"],
  },
  settingHomeLat: {
    type: DECIMAL,
    allowNull: true,
    defaultValue: 38.8982,
  },
  settingHomeLng: {
    type: DECIMAL,
    allowNull: true,
    defaultValue: -77.0209,
  },
});

User.addHook("beforeSave", async (user) => {
  if (user.changed("password")) {
    user.password = await bcrypt.hash(user.password, 5);
  }
});

User.findByToken = async function (token) {
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

User.prototype.generateToken = function () {
  return jwt.sign({ id: this.id }, JWT);
};

User.authenticate = async function (credentials) {
  // console.log("places attempt login");
  // console.log(credentials);
  const { username, password } = credentials;
  const user = await this.findOne({
    where: {
      username,
    },
  });
  // console.log(user);
  // console.log(password);
  // console.log(user.password);
  if (user && (await bcrypt.compare(password, user.password))) {
    // console.log("places attempt login");

    return jwt.sign({ id: user.id }, JWT);
  }
  const error = new Error("bad credentials");
  error.status = 401;
  throw error;
};

module.exports = User;
