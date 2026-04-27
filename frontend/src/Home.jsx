import React from "react";
import Socials from "./Socials";
import AboutMe from "./AboutMe";
import { FadeComponent } from "./FadeComponent";

const Home = () => {
  return (
    <FadeComponent>
      <div className="home-background-image-wrapper">
        <div className="soft-glow glow-orange pos-glow-1"></div>
        <div className="soft-glow glow-blue pos-glow-2"></div>
        <div className="soft-glow glow-blue pos-glow-3"></div>
        <div className="soft-glow glow-orange pos-glow-4"></div>
        <div className="soft-glow glow-blue pos-glow-5"></div>
        <div className="soft-glow glow-orange pos-glow-6"></div>
        <div className="soft-glow glow-blue pos-glow-7"></div>
        <div className="soft-glow glow-orange pos-glow-8 fixed-glow"></div>
        <div className="soft-glow glow-blue pos-glow-9 fixed-glow"></div>
        <div className="soft-glow glow-orange pos-glow-10 fixed-glow"></div>
        <div className="soft-glow glow-blue pos-glow-11 fixed-glow"></div>
        <div className="soft-glow glow-orange pos-glow-12 fixed-glow"></div>

        <div className="home-content">
          <div className="main-name">
            <h1 id="main-name">Hi! I'm Joe Del Balzo.</h1>
          </div>
        </div>
      </div>

      <AboutMe />
      <div id="socials-mobile">
        <Socials />
      </div>
    </FadeComponent>
  );
};

export default Home;
