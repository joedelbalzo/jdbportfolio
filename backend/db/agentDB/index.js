const conn = require("../conn");
const AgentUser = require("./AgentUser");
const FinancialUpload = require("./FinancialUpload");
const CategoryAverage = require("./CategoryAverage");
const UncategorizedTransaction = require("./UncategorizedTransaction");
const CategorizedTransaction = require("./CategorizedTransaction");
const CombinedUpload = require("./CombinedUpload");
const CustomCategorizationPattern = require("./CustomCategorizationPattern");
const TaskTemplate = require("./TaskTemplate");
const TaskCompletion = require("./TaskCompletion");

// Relationships - Financial Analyzer
AgentUser.hasMany(FinancialUpload);
FinancialUpload.belongsTo(AgentUser, { as: "user" });

FinancialUpload.hasMany(CategoryAverage, { as: "categoryAverages" });
CategoryAverage.belongsTo(FinancialUpload, { as: "upload" });

FinancialUpload.hasMany(UncategorizedTransaction, { as: "uncategorizedTransactions" });
UncategorizedTransaction.belongsTo(FinancialUpload, { as: "upload" });

FinancialUpload.hasMany(CategorizedTransaction, {
  as: "categorizedTransactions",
  foreignKey: "uploadId"
});
CategorizedTransaction.belongsTo(FinancialUpload, {
  as: "upload",
  foreignKey: "uploadId"
});

AgentUser.hasMany(CombinedUpload);
CombinedUpload.belongsTo(AgentUser, { as: "user" });

AgentUser.hasMany(CustomCategorizationPattern);
CustomCategorizationPattern.belongsTo(AgentUser, { as: "user" });

// Relationships - Household Task Tracker
AgentUser.hasMany(TaskTemplate);
TaskTemplate.belongsTo(AgentUser);

TaskTemplate.hasMany(TaskCompletion);
TaskCompletion.belongsTo(TaskTemplate);

const syncAndSeedAgent = async () => {
  await conn.sync();
};

module.exports = {
  AgentUser,
  FinancialUpload,
  CategoryAverage,
  UncategorizedTransaction,
  CategorizedTransaction,
  CombinedUpload,
  CustomCategorizationPattern,
  TaskTemplate,
  TaskCompletion,
  syncAndSeedAgent,
};
