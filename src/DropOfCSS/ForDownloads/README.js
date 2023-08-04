export const readme = () => {
  return `
  -- npm init -y
  -- in the package.json, you'll add these scripts and dev dependencies:
  "scripts": {
    "build": "webpack",
    "build:dev": "npm run build -- --watch --mode=development",
    "start:dev": "nodemon server.js  --ignore dist/ --ignore src/",
    "dev": "concurrently --kill-others \"npm run start:dev\" \"npm run build:dev\""
  },
  "devDependencies": {
    "@babel/core": "^7.21.8",
    "@babel/preset-react": "^7.18.6",
    "babel-loader": "^9.1.2",
    "concurrently": "^8.0.1"
    "nodemon": "^2.0.22",
    "react": "^18.2.0",
    "react-helmet": "^6.1.0",
    "react-router-dom": "^6.11.0",
    "styled-components": "^6.0.5",
    "webpack": "^5.81.0",
    "webpack-cli": "^5.0.2",
  },
    `;
};
