const savedColors = JSON.parse(localStorage.getItem("colors"));
if (savedColors) {
  console.log(savedColors);
}

export const readme = () => {
  return `
  -- npm init -y
  -- in the package.json, you'll add these scripts and dev dependencies:
  \`\`\`
  "scripts": {
    "build": "webpack",
    "build:dev": "npm run build -- --watch --mode=development",
    "start:dev": "nodemon server  --ignore dist/ --ignore src/",
    "dev": "concurrently --kill-others \\"npm run start:dev\\" \\"npm run build:dev\\""
  },
  \\\
  "devDependencies": {
    "@babel/core": "^7.21.8",
    "@babel/preset-react": "^7.18.6",
    "babel-loader": "^9.1.2",
    "concurrently": "^8.0.1",
    "nodemon": "^2.0.22",
    "react": "^18.2.0",
    "react-helmet": "^6.1.0",
    "react-router-dom": "^6.11.0",
    "styled-components": "^6.0.5",
    "webpack": "^5.81.0",
    "webpack-cli": "^5.0.2",
  },
  
  --after, run "npm i" in your terminal
  
  --you're going to have to do a little work with copying and pasting for your colors. here's a template, and you can do select all:

    Here are your primary colors
    copy [PRIMARY HEX] and paste ${savedColors[0].hex.value}
    copy [SECONDARY HEX] and paste ${savedColors[1].hex.value}
    copy [TERTIARY HEX] and paste ${savedColors[2].hex.value}
    copy [BG HEX] and paste ${savedColors[3].hex.value}

    Here are the contrast values. These are which color text looks best against your primary color (darker text against lighter colors, lighter text against darker colors)
    copy [PRIMARY CONTRAST HEX] and paste ${savedColors[0].contrast.value}
    copy [SECONDARY CONTRAST HEX] and paste ${savedColors[1].contrast.value}
    copy [TERTIARY CONTRAST HEX] and paste ${savedColors[2].contrast.value}
    copy [BG CONTRAST HEX] and paste ${savedColors[3].contrast.value}



  --after, run "npm run dev" to run your server. 
  --that's all! enjoy!
  `;
};
