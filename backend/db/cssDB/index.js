const conn = require("../conn");
const CssUser = require("./CssUser");
const Component = require("./Component");
const Template = require("./Template");
const Palette = require("./Palette");
const components = require("./components");

Palette.belongsTo(Template);
CssUser.hasMany(Template);
Template.hasMany(Component);

const syncAndSeedCss = async () => {
  // await conn.sync({ force: true });
  const [moe, lucy, ethyl] = await Promise.all([
    CssUser.create({ username: "moe", password: "123" }),
    CssUser.create({ username: "lucy", password: "123" }),
    CssUser.create({ username: "ethyl", password: "123" }),
  ]);

  const [navbar, form] = await Promise.all([
    components.map((component) => {
      Component.create(component);
    }),
  ]);

  return {
    cssUsers: {
      moe,
      lucy,
      ethyl,
    },
    components: {
      navbar,
      form,
    },
  };
};

module.exports = {
  syncAndSeedCss,
  CssUser,
  Component,
  Template,
  Palette,
};
