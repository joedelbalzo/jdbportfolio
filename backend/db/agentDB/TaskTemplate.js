const conn = require("../conn");
const { STRING, UUID, UUIDV4, INTEGER, DATE } = conn.Sequelize;

const TaskTemplate = conn.define("tasktemplate", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  name: {
    type: STRING,
    allowNull: false,
  },
  defaultInterval: {
    type: INTEGER,
    allowNull: false,
    defaultValue: 7, // Default: weekly tasks
    validate: {
      min: 1,
    },
  },
  currentInterval: {
    type: INTEGER,
    allowNull: false,
    defaultValue: 7,
    validate: {
      min: 1,
    },
  },
  lastCompletedAt: {
    type: DATE,
    allowNull: true,
  },
  nextDueAt: {
    type: DATE,
    allowNull: true,
  },
});

module.exports = TaskTemplate;
