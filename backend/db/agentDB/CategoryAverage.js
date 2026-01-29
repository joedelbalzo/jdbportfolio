const conn = require("../conn");
const { INTEGER, STRING, DECIMAL } = conn.Sequelize;

const CategoryAverage = conn.define("categoryAverage", {
  uploadId: {
    type: INTEGER,
    allowNull: false,
    references: {
      model: "financialUploads",
      key: "id",
    },
    onDelete: "CASCADE",
  },
  category: {
    type: STRING,
    allowNull: false,
  },
  bucket: {
    type: STRING,
    allowNull: false,
  },
  totalAmount: {
    type: DECIMAL(10, 2),
    allowNull: false,
  },
  monthlyAverage: {
    type: DECIMAL(10, 2),
    allowNull: false,
  },
  transactionCount: {
    type: INTEGER,
    defaultValue: 0,
  },
});

module.exports = CategoryAverage;
