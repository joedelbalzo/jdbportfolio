const conn = require("../conn");
const AgentUser = require("./AgentUser");
const Feed = require("./Feed");
const Topic = require("./Topic");
const Article = require("./Article");
const JobRun = require("./JobRun");
const FinancialUpload = require("./FinancialUpload");
const CategoryAverage = require("./CategoryAverage");
const UncategorizedTransaction = require("./UncategorizedTransaction");
const CategorizedTransaction = require("./CategorizedTransaction");
const CombinedUpload = require("./CombinedUpload");
const CustomCategorizationPattern = require("./CustomCategorizationPattern");

// Relationships - Content Curation
Feed.hasMany(Article);
Article.belongsTo(Feed);

Feed.hasMany(JobRun);
JobRun.belongsTo(Feed);

AgentUser.hasMany(Topic);
Topic.belongsTo(AgentUser);

// Article-Topic many-to-many (for filtering/matching)
Article.belongsToMany(Topic, { through: "ArticleTopic" });
Topic.belongsToMany(Article, { through: "ArticleTopic" });

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

const syncAndSeedAgent = async () => {
  try {
    await conn.sync();
    console.log("Agent DB synced");

    // Seed default feeds
    const [redditNode] = await Feed.findOrCreate({
      where: { name: "Reddit - node" },
      defaults: {
        sourceType: "reddit",
        subreddit: "node",
        isActive: true,
      },
    });

    const [redditNestjs] = await Feed.findOrCreate({
      where: { name: "Reddit - nestjs" },
      defaults: {
        sourceType: "reddit",
        subreddit: "nestjs",
        isActive: true,
      },
    });

    const [redditMicroservices] = await Feed.findOrCreate({
      where: { name: "Reddit - microservices" },
      defaults: {
        sourceType: "reddit",
        subreddit: "microservices",
        isActive: true,
      },
    });

    const [hackerNews] = await Feed.findOrCreate({
      where: { name: "Hacker News" },
      defaults: {
        sourceType: "hackernews",
        isActive: true,
      },
    });

    const [stackoverflow] = await Feed.findOrCreate({
      where: { name: "Stack Overflow" },
      defaults: {
        sourceType: "stackoverflow",
        isActive: true,
      },
    });

    // Blog feeds
    const [openapiBlog] = await Feed.findOrCreate({
      where: { name: "OpenAPI Blog" },
      defaults: {
        sourceType: "blog",
        rssUrl: "https://www.openapis.org/feed",
        isActive: true,
      },
    });

    const [postmanBlog] = await Feed.findOrCreate({
      where: { name: "Postman Blog" },
      defaults: {
        sourceType: "blog",
        rssUrl: "https://blog.postman.com/feed/",
        isActive: true,
      },
    });

    const [trilonBlog] = await Feed.findOrCreate({
      where: { name: "Trilon Blog" },
      defaults: {
        sourceType: "blog",
        rssUrl: "https://trilon.io/blog/rss.xml",
        isActive: true,
      },
    });

    console.log("Agent feeds seeded (including blogs)");

    // Note: Topics and AgentUsers will be created dynamically
    // Topics are user-specific, so they'll be created on first login or via API
    // AgentUsers are created via Google OAuth

  } catch (err) {
    console.error("Error syncing/seeding agent DB:", err);
    throw err;
  }
};

module.exports = {
  AgentUser,
  Feed,
  Topic,
  Article,
  JobRun,
  FinancialUpload,
  CategoryAverage,
  UncategorizedTransaction,
  CategorizedTransaction,
  CombinedUpload,
  CustomCategorizationPattern,
  syncAndSeedAgent,
};
