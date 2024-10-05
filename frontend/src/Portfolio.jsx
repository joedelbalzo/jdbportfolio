import React, { useState } from "react";
import { FadeComponent } from "./FadeComponent";
import { Link } from "react-router-dom";

import cssScreenshot from "../assets/site-screenshots/CSS_Screenshot.webp";
import openScreenshot from "../assets/site-screenshots/OpenPlaces_Screenshot.webp";
import scriptScreenshot from "../assets/site-screenshots/Script_Screenshot.webp";
import { OpenWindow } from "./ShareIcons/OpenWindow";
import { GitHub } from "./ShareIcons/SocialIcons";
import Login from "./Open-Places/Login";
import HomeJava from "./ScriptForJava/App";
import Home from "./DropOfCSS/Home";
import PortfolioHighlights from "./PortfolioHighlights";

const Portfolio = () => {
  const [hoveredElement, setHoveredElement] = useState(null);

  const changeColor = (color) => {
    setHoverColor(color);
  };
  const handleMouseEnter = (id) => {
    setHoveredElement(id);
  };

  const handleMouseLeave = () => {
    setHoveredElement(null);
  };

  const getColor = (id) => {
    return hoveredElement === id ? "#ff5722" : "whitesmoke";
  };
  return (
    <FadeComponent>
      <div className="resume-header">
        <h1>Portfolio</h1>
      </div>
      <>
        <PortfolioHighlights />
      </>
      <div id="main-portfolio">
        <div id="main-portfolioContainer">
          <div style={{ margin: "0 auto", width: "90%", padding: "1rem" }}>
            These three following applications can be accessed fully with the username "moe" and pass "123." Feel free to dig in! All three
            are built in Javascript using the PERN stack -- PostgreSQL, Express, React, Node, and mostly vanilla CSS with some Material-UI
            components.
          </div>
          <div>
            <div id="borderdiv">
              <h2>Drop of CSS</h2>
              <div className="portfolio-descriptions evens">
                <p>
                  "Drop of CSS" is a color palette and element generating tool. The idea came from simply wanting to provide developers and
                  freelancers with a simple tool to create a beautiful website with elements they can preview and download. So much of
                  designing a beautiful website comes from picking pleasing colors and combining them seamlessly with component elements,
                  and we aimed to make that as simple as possible!
                </p>

                <span className="devicons-open-and-github">
                  <Link
                    to={"../dropofcss"}
                    aria-label="a link to this project"
                    element={<Home />}
                    onMouseEnter={() => handleMouseEnter(1)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <OpenWindow style={{ padding: "1rem" }} color={getColor(1)} />
                  </Link>
                  <a
                    href="https://github.com/react-cpg-capstone/react-color-gen-capstone"
                    aria-label="a link to this project's GitHub Repository"
                    target="_blank"
                    onMouseEnter={() => handleMouseEnter(2)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <GitHub style={{ padding: "1rem" }} color={getColor(2)} />
                  </a>
                </span>
              </div>
              <Link to={"../dropofcss"} aria-label="a link to this project" element={<Home />}>
                <div className="image-wrapper">
                  <img src={cssScreenshot} alt="Screenshot of Drop of CSS" className="portfolio-images evens" />
                </div>
              </Link>
            </div>
          </div>

          <div>
            <div id="borderdiv">
              <h2>Open Places</h2>
              <div className="portfolio-descriptions odds">
                <p>
                  "Open Places" is an innovative app designed to provide you with real-time information about open establishments in your
                  desired area. By pinging your location, the app delivers a comprehensive list of all the nearby places that are currently
                  open. <br />
                  <br />
                  The inspiration for this app came from my experiences with my wife and our young son. As we took walks with him in his
                  stroller, our schedule would vary depending on his sleep patterns. We often encountered the frustration of arriving at
                  cafes that were still an hour away from opening or finding that the library had different hours for no apparent reason.
                  <br />
                  <br />
                  The data in this app is currently hard-coded, for minimizing costs of an app that's not in production. I manually added
                  and seeded 30 restaurants, bars, museums, libraries, parks, and more. The code includes a switch to integrate Google's
                  Places API, which would allow for real-time data retrieval with minimal effort.
                  <br />
                  <br />
                  <span className="devicons-open-and-github">
                    <Link
                      to={"../openplaces/login"}
                      aria-label="a link to this project"
                      element={<Login />}
                      onMouseEnter={() => handleMouseEnter(3)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <OpenWindow style={{ padding: "1rem" }} color={getColor(3)} />
                    </Link>
                    <a
                      href="https://github.com/joedelbalzo/jdb-openplaces"
                      aria-label="a link to this project's GitHub Repository"
                      target="_blank"
                      onMouseEnter={() => handleMouseEnter(4)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <GitHub style={{ padding: "1rem" }} color={getColor(4)} />
                    </a>
                  </span>
                </p>
              </div>
              <Link to={"../openplaces/login"} aria-label="a link to this project" element={<Login />}>
                <div className="image-wrapper">
                  <img src={openScreenshot} alt="Screenshot of Open Places" className="portfolio-images odds" />
                </div>
              </Link>
            </div>
          </div>

          <div>
            <div id="borderdiv">
              <h2>Script for Java</h2>
              <div className="portfolio-descriptions evens">
                <p>
                  "Script for Java" is a basic shopping app for a small chain of coffee stores.
                  <br />
                  <br />
                  The inspiration for this app was simply an experiment in authentication, authorization (including administrative tools),
                  and the ability to shop both with and without an account. <br />
                  <br />
                </p>
                <span className="devicons-open-and-github">
                  <Link
                    to={"../scriptforjava"}
                    aria-label="a link to this project"
                    element={<HomeJava />}
                    onMouseEnter={() => handleMouseEnter(5)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <OpenWindow style={{ padding: "1rem" }} color={getColor(5)} />
                  </Link>
                  <a
                    href="https://github.com/joedelbalzo/jdb-openplaces"
                    aria-label="a link to this project's GitHub Repository"
                    target="_blank"
                    onMouseEnter={() => handleMouseEnter(6)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <GitHub style={{ padding: "1rem" }} color={getColor(6)} />
                  </a>
                </span>
              </div>
              <Link to={"../scriptforjava"} aria-label="a link to this project" element={<HomeJava />}>
                <div className="image-wrapper">
                  <img src={scriptScreenshot} alt="Screenshot of Script for Java" className="portfolio-images evens" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <br />
    </FadeComponent>
  );
};

export default Portfolio;
