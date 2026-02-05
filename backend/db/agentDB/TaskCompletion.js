const conn = require("../conn");
const { UUID, UUIDV4, DATE, BOOLEAN, INTEGER } = conn.Sequelize;

const TaskCompletion = conn.define("taskcompletion", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  completedAt: {
    type: DATE,
    allowNull: false,
    defaultValue: conn.Sequelize.NOW,
  },
  wishEarlier: {
    type: BOOLEAN,
    allowNull: true,
    defaultValue: null,
  },
  daysLate: {
    type: INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  actualInterval: {
    type: INTEGER,
    allowNull: true, // Days since last completion
  },
});

module.exports = TaskCompletion;
