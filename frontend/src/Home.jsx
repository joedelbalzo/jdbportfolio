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
          <div id="main-introParagraph"></div>
        </div>
        <div style={{ margin: "2rem auto" }} id="socials-mobile">
          <Socials />
        </div>
      </div>

      <AboutMe />
      <div style={{ margin: "2rem auto" }} id="socials-mobile">
        <Socials />
      </div>
    </FadeComponent>
  );
};

export default Home;
