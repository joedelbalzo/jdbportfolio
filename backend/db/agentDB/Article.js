const conn = require("../conn");
const { STRING, UUID, UUIDV4, BOOLEAN, DATE, INTEGER, TEXT, ENUM, FLOAT } = conn.Sequelize;

const Article = conn.define("article", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  externalId: {
    type: STRING,
    allowNull: false,
  },
  title: {
    type: STRING,
    allowNull: false,
  },
  url: {
    type: STRING,
  },
  contentSnippet: {
    type: TEXT,
  },
  author: {
    type: STRING,
  },
  score: {
    type: INTEGER,
    defaultValue: 0,
  },
  commentCount: {
    type: INTEGER,
    defaultValue: 0,
  },
  publishedAt: {
    type: DATE,
  },
  fetchedAt: {
    type: DATE,
    defaultValue: conn.Sequelize.NOW,
  },
  sourceType: {
    type: ENUM("reddit", "hackernews", "stackoverflow", "blog"),
    allowNull: false,
  },
  isRead: {
    type: BOOLEAN,
    defaultValue: false,
  },
  isSaved: {
    type: BOOLEAN,
    defaultValue: false,
  },
  relevanceScore: {
    type: FLOAT,
    allowNull: true,
    comment: "AI-assigned relevance score (0-10)",
  },
  aiSummary: {
    type: TEXT,
    allowNull: true,
    comment: "AI-generated summary of why this is relevant",
  },
  rejectionReason: {
    type: TEXT,
    allowNull: true,
    comment: "Why AI rejected this article (if rejected)",
  },
});

module.exports = Article;
