const conn = require("../conn");
const {User, Blogpost, Tag, Image, Business, MailingListUser, FinancialInfo} = require("./Models");
const {encrypt, decrypt} = require("./Models/FinancialInfo");
const path = require("path");
require("dotenv").config({path: path.resolve(__dirname, "../..", ".env")});
const SeededPosts = require("./SeedData/Blogs");
const SeededImages = require("./SeedData/Images");

const adminPW = process.env.ADMIN_PW;

const syncAndSeedVali = async () => {
  try {
    const admin = await User.create({
      username: "admin",
      password: adminPW,
      email: "jdelbalzo99@gmail.com",
      adminStatus: true,
    });
    const notAdmin = await User.create({
      username: "Moe",
      password: "123",
      email: "test@gmail.com",
      adminStatus: false,
      businessId: null,
      isNewUser: false,
      firstName: "James",
      lastName: "Jimothy",
      city: "Astoria",
      state: "New York",
      mailingList: true,
    });

    const posts = await Promise.all(SeededPosts.map((post) => Blogpost.create(post)));
    const images = await Promise.all(SeededImages.map((image) => Image.create(image)));

    await Promise.all(posts.map((post, index) => post.addImage(images[index])));

    const [growthStrategies, valuationsAndBenchmarks, equityAndDebt, financingInsights, marketAnalysis, competitiveEdge] =
      await Promise.all([
        Tag.create({name: "Growth Strategies"}),
        Tag.create({name: "Valuations and Benchmarks"}),
        Tag.create({name: "Equity and Debt"}),
        Tag.create({name: "Financing Insights"}),
        Tag.create({name: "Market Analysis"}),
        Tag.create({name: "Competitive Edge"}),
      ]);

    await Promise.all([
      posts[0].addTags(growthStrategies),
      posts[0].addTags(competitiveEdge),
      posts[1].addTags(valuationsAndBenchmarks),
      posts[1].addTags(growthStrategies),
      posts[2].addTags(equityAndDebt),
      posts[2].addTags(valuationsAndBenchmarks),
      posts[3].addTags(financingInsights),
      posts[3].addTags(equityAndDebt),
      posts[4].addTags(marketAnalysis),
      posts[4].addTags(financingInsights),
      posts[5].addTags(competitiveEdge),
      posts[5].addTags(marketAnalysis),
      posts[6].addTags(marketAnalysis),
      posts[6].addTags(financingInsights),
      posts[7].addTags(competitiveEdge),
      posts[7].addTags(marketAnalysis),
    ]);

    const business = await Business.create({
      name: "Jimbo's Tech Solutions",
      userId: notAdmin.id,
      categoryOfBusiness: "Technology",
      yearsOpen: 5,
      numberOfPartners: 2,
      numberOfLocations: 3,
      description: "Innovative tech solutions for modern businesses.",
      legalStructure: "LLC",
      mainProducts: "Software Development, IT Consulting",
      servicesOffered: "Custom Software, Tech Support, IT Strategy",
      keyMarkets: "Small to Medium-sized Businesses",
      majorCompetitors: "TechCorp, Innovatech, NextGen Solutions",
    });

    const financialRecords = [
      {
        businessId: business.id,
        year: 2020,
        revenue: 500000,
        assets: 200000,
        liabilities: 100000,
        netIncome: "75000",
        operatingExpenses: 150000,
        cashFlow: 80000,
        debt: "50000",
        equity: "150000",
      },
      {
        businessId: business.id,
        year: 2021,
        revenue: 550000,
        assets: 250000,
        liabilities: 120000,
        netIncome: "85000",
        operatingExpenses: 170000,
        cashFlow: 90000,
        debt: "60000",
        equity: "160000",
      },
    ];

    await FinancialInfo.bulkCreate(financialRecords);
    await Promise.all(financialRecords.map((record) => business.createFinancialInfo(record)));

    return {
      users: {
        admin,
        notAdmin,
      },
      blogposts: {
        posts,
      },
      tags: {
        growthStrategies,
        valuationsAndBenchmarks,
        equityAndDebt,
        financingInsights,
        marketAnalysis,
        competitiveEdge,
      },
      images: {
        images,
      },
    };
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  syncAndSeedVali,
  decrypt,
  User,
  Blogpost,
  Tag,
  Image,
  conn,
  MailingListUser,
  Business,
  FinancialInfo,
};
