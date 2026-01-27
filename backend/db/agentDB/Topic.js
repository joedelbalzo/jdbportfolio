const conn = require("../conn");
const { STRING, UUID, UUIDV4, BOOLEAN } = conn.Sequelize;

const Topic = conn.define("topic", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  keyword: {
    type: STRING,
    allowNull: false,
  },
  isActive: {
    type: BOOLEAN,
    defaultValue: true,
  },
});

module.exports = Topic;
