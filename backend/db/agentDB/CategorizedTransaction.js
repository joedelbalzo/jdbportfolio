const conn = require("../conn");
const { INTEGER, DATEONLY, STRING, DECIMAL } = conn.Sequelize;

const CategorizedTransaction = conn.define("categorizedTransaction", {
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
  rawAmount: {
    type: DECIMAL(10, 2),
    allowNull: false,
    comment: "Original amount from CSV",
  },
  normalizedAmount: {
    type: DECIMAL(10, 2),
    allowNull: false,
    comment: "Amount after sign convention normalization",
  },
  absAmount: {
    type: DECIMAL(10, 2),
    allowNull: false,
    comment: "Absolute value used for categorization",
  },
  source: {
    type: STRING,
    allowNull: false,
    comment: "chase_checking, chase_credit, afcu, or amex",
  },
  category: {
    type: STRING,
    allowNull: false,
  },
  bucket: {
    type: STRING,
    allowNull: false,
  },
});

module.exports = CategorizedTransaction;
