const conn = require("../conn");
const { INTEGER, DATEONLY, STRING, DECIMAL, BOOLEAN, TEXT, DATE } = conn.Sequelize;

const UncategorizedTransaction = conn.define("uncategorizedTransaction", {
  uploadId: {
    type: INTEGER,
    allowNull: false,
    references: {
      model: "financialUploads",
      key: "id",
    },
    onDelete: "CASCADE",
  },
  date: {
    type: DATEONLY,
    allowNull: false,
  },
  description: {
    type: STRING,
    allowNull: false,
  },
  amount: {
    type: DECIMAL(10, 2),
    allowNull: false,
  },
  source: {
    type: STRING,
    allowNull: false,
  },
  aiSuggestedCategory: {
    type: STRING,
    allowNull: true,
  },
  aiReasoning: {
    type: TEXT,
    allowNull: true,
  },
  isRecategorized: {
    type: BOOLEAN,
    defaultValue: false,
  },
  finalCategory: {
    type: STRING,
    allowNull: true,
  },
  recategorizedAt: {
    type: DATE,
    allowNull: true,
  },
});

module.exports = UncategorizedTransaction;
