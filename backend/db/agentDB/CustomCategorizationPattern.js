const conn = require("../conn");
const { INTEGER, STRING, UUID, UUIDV4 } = conn.Sequelize;

const CustomCategorizationPattern = conn.define("customCategorizationPattern", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  userId: {
    type: UUID,
    allowNull: false,
    references: {
      model: "agentusers",
      key: "id",
    },
    onDelete: "CASCADE",
  },
  category: {
    type: STRING,
    allowNull: false,
    comment: "The category this pattern belongs to",
  },
  pattern: {
    type: STRING,
    allowNull: false,
    comment: "The regex pattern to match (case-insensitive)",
  },
  isActive: {
    type: conn.Sequelize.BOOLEAN,
    defaultValue: true,
    comment: "Whether this pattern is currently active",
  },
  priority: {
    type: INTEGER,
    defaultValue: 100,
    comment: "Higher priority patterns are checked first (custom patterns default to 100, built-in are 0)",
  },
});

module.exports = CustomCategorizationPattern;
