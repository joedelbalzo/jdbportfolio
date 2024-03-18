const axios = require("axios");

const warmSite = async (url, attempts = 3) => {
  for (let i = 0; i < attempts; i++) {
    try {
      await axios.get(url);
      console.log(`Warmed up ${url} on attempt ${i + 1}`);
      return;
    } catch (error) {
      console.error(`Attempt ${i + 1} for ${url} failed: ${error.message}`);
    }
  }
  console.log(`Failed to warm up ${url} after ${attempts} attempts`);
};

module.exports = { warmSite };
