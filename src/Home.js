import React from "react";
import Sublinks from "./Sublinks";
import Footer from "./Footer";
import { FadeComponent } from "./FadeComponent";
import { motion } from "framer-motion";
import Contact from "./Contact";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 1,
      staggerChildren: 0.5,
    },
  },
};

const child = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      duration: 2,
    },
  },
};

const Home = () => {
  return (
    <FadeComponent>
      <motion.div variants={container} initial="hidden" animate="show">
        <h1 style={{ fontSize: "calc(22px + 4vw)", margin: "1.5rem auto" }}>
          Hey, I'm{" "}
          <span id="main-name" style={{ fontSize: "calc(22px + 4.5vw)", marginBottom: "0" }}>
            Joe Del Balzo
          </span>
        </h1>
        <div id="main-introParagraph">
          <motion.div variants={child}>
            <p>Software Engineer and Full Stack Web Developer.</p>
          </motion.div>
          <motion.div variants={child}>
            <p>Artist-turned-coder. I liked creating beauty before; I like creating beauty now.</p>
          </motion.div>
          <motion.div variants={child}>
            <p>
              Former Lighting Designer, Network Designer, and Console Programmer. Musician, Cold
              Brew Drinker, Sports Fanatic, Certified Cicerone®
            </p>
          </motion.div>
          <motion.div variants={child}>
            <p>
              <span id="main-name" style={{ fontSize: "inherit", marginBottom: "0" }}>
                Let's build something together!
              </span>
            </p>
          </motion.div>
          <motion.div variants={child}>
            <Contact />
          </motion.div>
        </div>
        <motion.div variants={child}>
          <Footer />
        </motion.div>
      </motion.div>
    </FadeComponent>
  );
};

export default Home;
