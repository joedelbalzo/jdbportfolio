import React, { useEffect, useRef } from "react";
import Sublinks from "./Sublinks";
import Footer from "./Footer";
import Socials from "./Socials";
import AboutMe from "./AboutMe";
import { FadeComponent } from "./FadeComponent";
import { motion, useAnimation } from "framer-motion";
import Contact from "./Contact";

const Home = () => {
  return (
    <FadeComponent>
      <div className="main-name">
        <h1>
          Hey, I'm <div id="main-name">Joe Del Balzo.</div>
        </h1>
        <h2>Software Engineer. Full Stack Web Developer.</h2>
      </div>
      <div id="main-introParagraph">
        <p>Artist-turned-coder.I liked creating beauty before; I like creating beauty now.</p>
        <p>
          <a href="https://www.imdb.com/name/nm3631957/" target="_blank">
            Former lighting designer and console programmer.
          </a>{" "}
          Musician, cold brew drinker, sports fanatic, Certified Cicerone®
        </p>
        <p>
          Currently a Software Engineer at{" "}
          <a href="thefutureofagency.com" target="_blank">
            the future of agency
          </a>
          , and I'd love to show you some of my work.
        </p>
      </div>
      <div style={{ margin: "2rem auto" }}>
        <Socials />
      </div>
      <AboutMe />
      <Footer />
    </FadeComponent>
  );
};

export default Home;
