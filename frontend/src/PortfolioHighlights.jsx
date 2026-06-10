import React from "react";
import { FadeComponent } from "./FadeComponent";

import dawnRyanScreenshot from "../assets/site-screenshots/DawnRyan_Screenshot.webp";
import algoScreenshot from "../assets/site-screenshots/Algo_Screenshot.webp";
import yhgScreenshot from "../assets/site-screenshots/YHG-ss.webp";
import CSAScreenshot from "../assets/site-screenshots/CSA_Screenshot.webp";
import valleyScreenshot from "../assets/site-screenshots/valley-ss.webp";
import curtisSS from "../assets/site-screenshots/curtis-ss.webp";
import poemsSS from "../assets/site-screenshots/pd-ss.webp";
import PortfolioCard from "./PortfolioCard";

const PortfolioHighlights = () => {
  return (
    <FadeComponent>
      <div id="main-portfolio">
        <div id="main-portfolioContainer">
          <PortfolioCard
            title="Valley Arcade"
            description="An online Gaming Studio and Arcade designed for both the Web3 and the Physical Arcade Cabinet audience."
            siteLink="https://www.valley-arcade.com"
            imgSrc={valleyScreenshot}
            imgAlt="image of www.valley-arcade.com"
          />
          <PortfolioCard
            title="Poetry Daily"
            description="Poetry Daily is an anthology of contemporary poetry. I joined this team to redesign their News and Hot off the Presses APIs."
            siteLink="https://www.poems.com"
            imgSrc={poemsSS}
            imgAlt="image of www.poems.com"
          />
          <PortfolioCard
            title="Cynthia St. Aubin"
            description="Website for USA Today Bestselling author Cynthia St. Aubin."
            siteLink="https://www.cynthiastaubin.com"
            imgSrc={CSAScreenshot}
            imgAlt="Screenshot of www.yourhiddengenius.com"
          />
          <PortfolioCard
            title="Your Hidden Genius"
            description="Website for authors Betsy Wills and Alex Ellison to market their debut book Your Hidden Genius."
            siteLink="https://www.yourhiddengenius.com"
            repoLink="https://github.com/joedelbalzo/yhg-assessment"
            imgSrc={yhgScreenshot}
            imgAlt="Screenshot of www.yourhiddengenius.com"
          />
          <PortfolioCard
            title="Chef Curtis Duffy"
            description="Website for Michelin-Starred, James Beard Award Winning Chef and now USA Today Bestselling author Curtis Duffy to market his debut book Fireproof: Memoir of a Chef."
            siteLink="https://www.curtisduffy.com"
            imgSrc={curtisSS}
            imgAlt="Screenshot of www.curtisduffy.com"
          />
          <PortfolioCard
            title="Dawn Ryan"
            description="Portfolio and services website for freelance copyeditor and proofreader Dawn Ryan, a long-time professional in the publishing industry who wanted to highlight not only the work she's accomplished but also the variety of services she offers."
            siteLink="https://www.dawngryan.com"
            repoLink="https://github.com/joedelbalzo/jdb-dr"
            imgSrc={dawnRyanScreenshot}
            imgAlt="Screenshot of www.dawngryan.com"
          />
          <PortfolioCard
            title="AlgoRhythm"
            description="This application is a multiple-choice study guide for algorithms, data structures, and basic questions about popular languages like JavaScript and Python, as well as popular frameworks like React and Node.js."
            siteLink="https://algorhythm-joedelbalzo.vercel.app/"
            repoLink="https://github.com/joedelbalzo/jdb-algo"
            imgSrc={algoScreenshot}
            imgAlt="Screenshot of AlgoRhythm"
          />
        </div>
      </div>
    </FadeComponent>
  );
};

export default PortfolioHighlights;
