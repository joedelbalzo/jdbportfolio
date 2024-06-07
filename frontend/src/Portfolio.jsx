import React, { useEffect, useRef } from "react";
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
  const valiRef = useRef(null);
  const dawnRef = useRef(null);
  const algoRef = useRef(null);
  const cssRef = useRef(null);
  const openPlacesRef = useRef(null);
  const scriptRef = useRef(null);

  const setOutlineSize = (ref) => {
    if (ref.current) {
      const height = ref.current.offsetHeight;
      ref.current.parentNode.style.setProperty("--img-height", `${height}px`);
    }
  };

  useEffect(() => {
    setOutlineSize(valiRef);
    setOutlineSize(dawnRef);
    setOutlineSize(algoRef);
    setOutlineSize(cssRef);
    setOutlineSize(openPlacesRef);
    setOutlineSize(scriptRef);
  }, []);
  return (
    <FadeComponent>
      <h1 style={{ fontSize: "calc(14px + 2vw)", color: "whitesmoke" }}>Portfolio</h1>
      <>
        <PortfolioHighlights />
      </>
      <div id="main-portfolio">
        <div id="main-portfolioContainer">
          {/* <div id="borderdiv">
            <h2>Vali</h2>
            <div className="portfolio-descriptions odds">
              <p>
                Vali is an MVP-level startup aimed at small and medium business owners who typically aren't aware of their business' actual
                valuation. As the principal and founding engineer, I attempted to create a clean but soft, visually impressive and inviting
                website to make owners feel like they're comfortable and can get the information their business needs to progress!
              </p>
              <p>
                The site's password is createdbyJDB and you can peruse a rough beta version of the admin dashboard with the username admin
                and I'll happily email you back the password.
              </p>
              <span className="devicons-open-and-github">
                <a href="https://www.joinvali.com" target="_blank">
                  <OpenWindow style={{ padding: "1rem" }} />
                </a>
                <a href="https://github.com/joedelbalzo/kan-th" target="_blank">
                  <GitHub style={{ padding: "1rem" }} />
                </a>
              </span>
            </div>
            <div className="image-wrapper">
              <img src={valiScreenshot} alt="Screenshot of www.joinvali.com" className="portfolio-images odds" ref={valiRef}></img>
            </div>
          </div>
          <div id="borderdiv">
            <h2>Dawn Ryan</h2>
            <div className="portfolio-descriptions evens">
              <p>
                This is a portfolio and services website for freelance copyeditor and proofreader Dawn Ryan. She's a long-time professional
                in the publishing industry, and wanted specifically to highlight not only the work she's accomplished, but the variety of
                services she can offer. I explored many new technologies when developing this website to accomplish the desires of my
                client, specifically Framer Motion. I love exploring new technologies, and will continue to do so as a client's needs
                change!
              </p>
              <span className="devicons-open-and-github">
                <a href="https://www.dawngryan.com" target="_blank">
                  <OpenWindow style={{ padding: "1rem" }} />
                </a>
                <a href="https://github.com/joedelbalzo/jdb-dr" target="_blank">
                  <GitHub style={{ padding: "1rem" }} />
                </a>
              </span>
            </div>
            <div className="image-wrapper">
              <img src={dawnRyanScreenshot} alt="Screenshot of www.dawngryan.com" className="portfolio-images evens" ref={dawnRef} />
            </div>
          </div>
          <div id="borderdiv">
            <h2>AlgoRhythm</h2>
            <div className="portfolio-descriptions odds">
              <p>
                This application is a Multiple Choice study-guide for Algorhithms, Data Structures, and basic questions about popular
                languages like JavaScript and Python as well as popular frameworks like React and NodeJs. At the moment, it's only Multiple
                Choice. I've written the JS coderunner, but I'm hoping to implement a Python coderunner as well before launching that page.
                The goal is to eventually incorporate Oauth so a user can share data between devices (which will eventually also include iOS
                and Android devices!) and user-selected categories.
              </p>
              <span className="devicons-open-and-github">
                <a href="https://algorhythm-joedelbalzo.vercel.app/" target="_blank">
                  <OpenWindow style={{ padding: "1rem" }} />
                </a>
                <a href="https://github.com/joedelbalzo/jdb-algo" target="_blank">
                  <GitHub style={{ padding: "1rem" }} />
                </a>
              </span>
            </div>

            <div className="image-wrapper">
              <img src={algoScreenshot} alt="Screenshot of AlgoRhythym" className="portfolio-images odds" ref={algoRef} />
            </div>
          </div> */}
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
                  <Link to={"../dropofcss"} element={<Home />}>
                    <OpenWindow style={{ padding: "1rem" }} />
                  </Link>
                  <a href="https://github.com/react-cpg-capstone/react-color-gen-capstone" target="_blank">
                    <GitHub style={{ padding: "1rem" }} />
                  </a>
                </span>
              </div>
              <div className="image-wrapper">
                <img src={cssScreenshot} alt="Screenshot of Drop of CSS" className="portfolio-images evens" ref={cssRef} />
              </div>
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
                    <Link to={"../openplaces/login"} element={<Login />}>
                      <OpenWindow style={{ padding: "1rem" }} />
                    </Link>
                    <a href="https://github.com/joedelbalzo/jdb-openplaces" target="_blank">
                      <GitHub style={{ padding: "1rem" }} />
                    </a>
                  </span>
                </p>
              </div>
              <div className="image-wrapper">
                <img src={openScreenshot} alt="Screenshot of Open Places" className="portfolio-images odds" ref={openPlacesRef} />
              </div>
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
                  <Link to={"../scriptforjava"} element={<HomeJava />}>
                    <OpenWindow style={{ padding: "1rem" }} />
                  </Link>
                  <a href="https://github.com/joedelbalzo/jdb-openplaces" target="_blank">
                    <GitHub style={{ padding: "1rem" }} />
                  </a>
                </span>
              </div>
              <div className="image-wrapper">
                <img src={scriptScreenshot} alt="Screenshot of Script for Java" className="portfolio-images evens" ref={scriptRef} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </FadeComponent>
  );
};

export default Portfolio;
