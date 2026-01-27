const conn = require("../conn");
const { STRING, UUID, UUIDV4, BOOLEAN, DATE, INTEGER, ENUM } = conn.Sequelize;

const Feed = conn.define("feed", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  name: {
    type: STRING,
    allowNull: false,
  },
  sourceType: {
    type: ENUM("reddit", "hackernews", "stackoverflow"),
    allowNull: false,
  },
  subreddit: {
    type: STRING,
    allowNull: true,
  },
  isActive: {
    type: BOOLEAN,
    defaultValue: true,
  },
  lastFetchedAt: {
    type: DATE,
    allowNull: true,
  },
  fetchIntervalMinutes: {
    type: INTEGER,
    defaultValue: 60,
  },
});

module.exports = Feed;
