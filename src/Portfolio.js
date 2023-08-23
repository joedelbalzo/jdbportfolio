import React from "react";
import { FadeComponent } from "./FadeComponent";

const Portfolio = () => {
  return (
    <FadeComponent>
      <div id="main-portfolio">
        <h1>
          <span id="main-name" style={{ fontSize: "calc(14px + 2vw)" }}>
            Portfolio
          </span>
        </h1>

        <div id="main-portfolioContainer">
          <div id="borderdiv">
            <span id="main-name" style={{ fontStyle: "italic" }}>
              Dawn Ryan
            </span>
            <p>
              This is a portfolio and services website for freelance copyeditor and proofreader Dawn
              Ryan. She's a long-time professional in the publishing industry, and wanted
              specifically to highlight not only the work she's accomplished, but the variety of
              services she can offer. I explored many new technologies when developing this website
              to accomplish the desires of my client, specifically Framer Motion. I love exploring
              new technologies, and will continue to do so as a client's needs change!
            </p>
          </div>
          <div id="borderdiv">
            These three following applications can be accessed fully with the username "moe" and
            pass "123." Feel free to dig in! All three are built in Javascript using the PERN stack
            -- PostgreSQL, Express, React, Node, and mostly vanilla CSS with some Material-UI
            components.
            <br />
            <br />
            <span id="main-name" style={{ fontStyle: "italic" }}>
              Drop of CSS
            </span>
            <p>
              "Drop of CSS" is a color palette and element generating tool. The idea came from
              simply wanting to provide developers and freelancers with a simple tool to create a
              beautiful website with elements they can preview and download. So much of designing a
              beautiful website comes from picking pleasing colors and combining them seamlessly
              with component elements, and we aimed to make that as simple as possible!
              <br />
              <br />
            </p>
            <span id="main-name" style={{ fontStyle: "italic" }}>
              Open Places
            </span>
            <p>
              "Open Places" is an innovative app designed to provide you with real-time information
              about open establishments in your desired area. By pinging your location, the app
              delivers a comprehensive list of all the nearby places that are currently open. <br />
              <br />
              The inspiration for this app came from my experiences with my wife and our young son.
              As we took walks with him in his stroller, our schedule would vary depending on his
              sleep patterns. We often encountered the frustration of arriving at cafes that were
              still an hour away from opening or finding that the library had different hours for no
              apparent reason.
              <br />
              <br />
              The data in this app is currently hard-coded, for minimizing costs of an app that's
              not in production. I manually added and seeded 30 restaurants, bars, museums,
              libraries, parks, and more. The code includes a switch to integrate Google's Places
              API, which would allow for real-time data retrieval with minimal effort.
              <br />
              <br />
            </p>
            <span id="main-name" style={{ fontStyle: "italic" }}>
              Script for Java
            </span>
            <p>
              "Script for Java" is a basic shopping app for a small chain of coffee stores.
              <br />
              <br />
              The inspiration for this app was simply an experiment in authentication, authorization
              (including administrative tools), and the ability to shop both with and without an
              account. <br />
              <br />
            </p>
          </div>
        </div>
      </div>
    </FadeComponent>
  );
};

export default Portfolio;
