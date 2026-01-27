const conn = require("../conn");
const { UUID, UUIDV4, DATE, INTEGER, TEXT, ENUM } = conn.Sequelize;

const JobRun = conn.define("jobrun", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  jobType: {
    type: ENUM("feed_fetch", "cleanup"),
    allowNull: false,
  },
  status: {
    type: ENUM("pending", "running", "completed", "failed"),
    defaultValue: "pending",
  },
  startedAt: {
    type: DATE,
  },
  completedAt: {
    type: DATE,
  },
  errorMessage: {
    type: TEXT,
  },
  retryCount: {
    type: INTEGER,
    defaultValue: 0,
  },
  maxRetries: {
    type: INTEGER,
    defaultValue: 3,
  },
  articlesProcessed: {
    type: INTEGER,
    defaultValue: 0,
  },
});

module.exports = JobRun;
