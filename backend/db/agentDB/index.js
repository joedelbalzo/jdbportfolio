const conn = require("../conn");
const AgentUser = require("./AgentUser");
const Feed = require("./Feed");
const Topic = require("./Topic");
const Article = require("./Article");
const JobRun = require("./JobRun");

// Relationships
Feed.hasMany(Article);
Article.belongsTo(Feed);

Feed.hasMany(JobRun);
JobRun.belongsTo(Feed);

AgentUser.hasMany(Topic);
Topic.belongsTo(AgentUser);

// Article-Topic many-to-many (for filtering/matching)
Article.belongsToMany(Topic, { through: "ArticleTopic" });
Topic.belongsToMany(Article, { through: "ArticleTopic" });

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

    console.log("Agent feeds seeded");

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
  syncAndSeedAgent,
};
