const conn = require("../conn");
const { INTEGER, DATE, DATEONLY, DECIMAL, ENUM, TEXT, UUID, STRING, JSON } = conn.Sequelize;

const FinancialUpload = conn.define("financialUpload", {
  userId: {
    type: UUID,
    allowNull: false,
    references: {
      model: "agentusers",
      key: "id",
    },
  },
  filename: {
    type: STRING,
    allowNull: true,
  },
  uploadDate: {
    type: DATE,
    defaultValue: conn.Sequelize.NOW,
  },
  monthCount: {
    type: INTEGER,
    allowNull: false,
  },
  startDate: {
    type: DATEONLY,
    allowNull: false,
  },
  endDate: {
    type: DATEONLY,
    allowNull: false,
  },
  totalTransactions: {
    type: INTEGER,
    defaultValue: 0,
  },
  categorizedCount: {
    type: INTEGER,
    defaultValue: 0,
  },
  uncategorizedCount: {
    type: INTEGER,
    defaultValue: 0,
  },
  excludedCount: {
    type: INTEGER,
    defaultValue: 0,
  },
  totalMonthlyAverage: {
    type: DECIMAL(10, 2),
    defaultValue: 0,
  },
  status: {
    type: ENUM("processing", "completed", "error"),
    defaultValue: "processing",
  },
  errorMessage: {
    type: TEXT,
    allowNull: true,
  },
  calculationLog: {
    type: JSON,
    allowNull: true,
  },
  excludedTransactions: {
    type: JSON,
    allowNull: true,
  },
});

module.exports = FinancialUpload;
