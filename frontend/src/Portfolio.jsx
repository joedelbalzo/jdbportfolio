import React, { Suspense, lazy } from "react";
import { FadeComponent } from "./FadeComponent";
import { Link } from "react-router-dom";

import cssScreenshot from "../assets/site-screenshots/CSS_Screenshot.webp";
import openScreenshot from "../assets/site-screenshots/OpenPlaces_Screenshot.webp";
import scriptScreenshot from "../assets/site-screenshots/Script_Screenshot.webp";
import PortfolioHighlights from "./PortfolioHighlights";
import PortfolioCard from "./PortfolioCard";

const HomeJava = lazy(() => import("./ScriptForJava/App"));
const Login = lazy(() => import("./Open-Places/Auth/Login"));
const Home = lazy(() => import("./DropOfCSS/Home"));

const Portfolio = () => {
  return (
    <FadeComponent>
      <div className="resume-header">
        <h1>Portfolio</h1>
      </div>

      <PortfolioHighlights />

      <div id="main-portfolio">
        <div id="main-portfolioContainer">
          <div style={{ margin: "0 auto", width: "90%", padding: "1rem" }}>
            These three applications can be accessed with **username:** "moe" **password:** "123". Feel free to dig in! All are built using
            the **PERN stack** (PostgreSQL, Express, React, Node) with mostly vanilla CSS and some Material-UI components.
          </div>

          <PortfolioCard
            title="Drop of CSS"
            description="Drop of CSS is a color palette and element generator for developers and freelancers. 
              The goal was to provide a simple tool for previewing and downloading UI elements. A great design starts 
              with cohesive colors and well-crafted components—this app simplifies that process!"
            siteLink="../dropofcss"
            repoLink="https://github.com/react-cpg-capstone/react-color-gen-capstone"
            imgSrc={cssScreenshot}
            imgAlt="Screenshot of Drop of CSS"
            isOdd={false}
          />

          <PortfolioCard
            title="Open Places"
            description="Open Places is an app providing real-time data on open businesses nearby, perfect for parents or 
              anyone navigating varying business hours. Inspired by personal experiences trying to find open cafes while 
              walking with my son, the app includes a manual dataset of 30+ locations. It’s built with the ability to 
              integrate Google's Places API for real-time data when scaled."
            siteLink="../openplaces/login"
            repoLink="https://github.com/joedelbalzo/jdb-openplaces"
            imgSrc={openScreenshot}
            imgAlt="Screenshot of Open Places"
            isOdd={true}
          />

          <PortfolioCard
            title="Script for Java"
            description="Script for Java is a fully functional coffee shop ordering system, featuring authentication, 
              authorization (including admin tools), and the ability to shop with or without an account. The app was 
              primarily an experiment in handling different user roles and session-based shopping experiences."
            siteLink="../scriptforjava"
            repoLink="https://github.com/joedelbalzo/jdb-openplaces"
            imgSrc={scriptScreenshot}
            imgAlt="Screenshot of Script for Java"
            isOdd={false}
          />
        </div>
      </div>
      <br />
    </FadeComponent>
  );
};

export default Portfolio;
