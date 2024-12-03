import React, { useEffect, useRef } from "react";
import Footer from "./Footer";
import Socials from "./Socials";
import AboutMe from "./AboutMe";
import { FadeComponent } from "./FadeComponent";

const Home = () => {
  return (
    <FadeComponent>
      <div className="home-background-image-wrapper">
        <div className="home-content">
          <div className="main-name">
            <h1 id="main-name">Hi! I'm Joe Del Balzo.</h1>
            <h2>Full Stack Software Engineer</h2>
          </div>
          <div id="main-introParagraph">
            {/* <p>Artist-turned-coder.I liked creating beauty before; I like creating beauty now.</p> */}
            <p>
              Software Engineer at{" "}
              <a href="thefutureofagency.com" target="_blank">
                the future of agency
              </a>
              , and I'd love to show you some of my work.
            </p>
            <p>
              <a href="https://www.imdb.com/name/nm3631957/" target="_blank">
                Former lighting designer and console programmer.
              </a>{" "}
              Musician, cold brew drinker, sports fanatic, Certified Cicerone®
            </p>
            <p>
              <a href="../resume" aria-label="Link to Joe Del Balzo's Resume" rel="noreferrer noopener" target="_blank">
                Click here to check out my resume.
              </a>{" "}
            </p>
          </div>
        </div>
        <div style={{ margin: "2rem auto" }} id="socials-mobile">
          <Socials />
        </div>
      </div>

      <AboutMe />
      <div style={{ margin: "2rem auto" }} id="socials-mobile">
        <Socials />
      </div>

      {/* <Footer /> */}
    </FadeComponent>
  );
};

export default Home;
