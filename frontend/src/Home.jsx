import React from "react";
import Sublinks from "./Sublinks";
import Footer from "./Footer";
import Socials from "./Socials";
import { FadeComponent } from "./FadeComponent";
import { motion } from "framer-motion";
import Contact from "./Contact";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 1,
      staggerChildren: 0.4,
    },
  },
};

const child = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      duration: 1.8,
    },
  },
};

const Home = () => {
  return (
    <FadeComponent>
      <h1 style={{ fontSize: "calc(22px + 4vw)", margin: "1.5rem auto 0" }}>
        Hey, I'm{" "}
        <span id="main-name" style={{ fontSize: "calc(22px + 4.5vw)", marginBottom: "0" }}>
          Joe Del Balzo
        </span>
      </h1>
      <h2 style={{ fontSize: "calc(12px + 2vw)", margin: "0 auto 2rem", color: "rgba(240, 240, 240, 0.9)" }}>
        Software Engineer and Full Stack Web Developer.
      </h2>
      <div id="main-introParagraph">
        <p>
          Artist-turned-coder.I liked creating beauty before; I like creating beauty now.
          <br />
          <br />
          <a href="https://www.imdb.com/name/nm3631957/">Former lighting designer and programmer.</a> Musician, cold brew drinker, sports
          fanatic, Certified Cicerone®
        </p>
      </div>
      <Socials />
      <Footer />
    </FadeComponent>
  );
};

export default Home;
