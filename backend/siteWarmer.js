const axios = require("axios");

const warmSite = async (url, attempts = 3) => {
  for (let i = 0; i < attempts; i++) {
    try {
      await axios.get(url);
      return;
    } catch (error) {
      console.error(`Attempt ${i + 1} for ${url} failed: ${error.message}`);
    }
  }
};

module.exports = { warmSite };
