import React from "react";
import { FadeComponent } from "./FadeComponent";

import valleyGif from "../assets/site-screenshots/valley-homepage-1-30-25.gif";
import valiScreenshot from "../assets/site-screenshots/Vali_Screenshot.webp";
import dawnRyanScreenshot from "../assets/site-screenshots/DawnRyan_Screenshot.webp";
import algoScreenshot from "../assets/site-screenshots/Algo_Screenshot.webp";
import yhgScreenshot from "../assets/site-screenshots/YHG-ss.webp";
import PortfolioCard from "./PortfolioCard";

const PortfolioHighlights = () => {
  return (
    <FadeComponent>
      <div id="main-portfolio">
        <div id="main-portfolioContainer">
          <PortfolioCard
            title="Valley Arcade"
            description="Valley is more than just a gaming studio – it's revolutionizing the arcade experience by combining blockchain technology 
                  with high-quality, engaging games. I was initially brought on to do a complete redesign of their homepage and other UI components, but I also ended up doing a lot of work on their API calling and database efficiency!"
            siteLink="https://www.valley-arcade.com"
            imgSrc={valleyGif}
            imgAlt="GIF of www.valley-arcade.com"
            isOdd={true}
          />
          <PortfolioCard
            title="Your Hidden Genius"
            description="This is a site for the authors of the book 'Your Hidden Genius,' who are clients of mine at The Future of Agency. 
                  I'm particularly proud of my work on this site. It was built on a web design platform that allows the agency to fully transfer 
                  the website to the clients at the end of the contract. It was designed with ease-of-use in mind but also includes the company's 
                  first fully embedded full-stack application."
            siteLink="https://www.yourhiddengenius.com"
            repoLink="https://github.com/joedelbalzo/yhg-assessment"
            imgSrc={yhgScreenshot}
            imgAlt="Screenshot of www.yourhiddengenius.com"
            isOdd={false}
          />
          <PortfolioCard
            title="Vali"
            description="Vali is an MVP-level startup aimed at small and medium business owners who typically aren't aware of their business' 
                  actual valuation. As the principal and founding engineer, I attempted to create a clean but soft, visually impressive, 
                  and inviting website to make owners feel comfortable while getting the information their business needs to progress. 
                  The site's password is createdbyJDB, and you can peruse a rough beta version of the admin dashboard with the username 'admin.' 
                  I'll happily email you back the password."
            siteLink="https://www.joinvali.com"
            repoLink="https://github.com/joedelbalzo/kan-th"
            imgSrc={valiScreenshot}
            imgAlt="Screenshot of www.joinvali.com"
            isOdd={true}
          />
          <PortfolioCard
            title="Dawn Ryan"
            description="This is a portfolio and services website for freelance copyeditor and proofreader Dawn Ryan. She's a long-time professional 
                  in the publishing industry and wanted to highlight not only the work she's accomplished but also the variety of services she offers. 
                  I explored many new technologies when developing this website to meet her needs, specifically Framer Motion. 
                  I love exploring new technologies and will continue to do so as a client's needs evolve!"
            siteLink="https://www.dawngryan.com"
            repoLink="https://github.com/joedelbalzo/jdb-dr"
            imgSrc={dawnRyanScreenshot}
            imgAlt="Screenshot of www.dawngryan.com"
            isOdd={false}
          />
          <PortfolioCard
            title="AlgoRhythm"
            description="This application is a multiple-choice study guide for algorithms, data structures, and basic questions about popular 
                  languages like JavaScript and Python, as well as popular frameworks like React and Node.js. At the moment, it's multiple-choice only. 
                  I've written the JavaScript coderunner but plan to implement a Python coderunner before launching that page. The goal is to 
                  incorporate OAuth so users can share data between devices, including iOS and Android, and allow user-selected categories."
            siteLink="https://algorhythm-joedelbalzo.vercel.app/"
            repoLink="https://github.com/joedelbalzo/jdb-algo"
            imgSrc={algoScreenshot}
            imgAlt="Screenshot of AlgoRhythm"
            isOdd={true}
          />
        </div>
      </div>
    </FadeComponent>
  );
};

export default PortfolioHighlights;
