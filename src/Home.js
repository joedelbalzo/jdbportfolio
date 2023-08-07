import React from "react";
import Sublinks from "./Sublinks";

const Home = () => {
  return (
    <>
      <h1 style={{ fontSize: "calc(22px + 4vw)" }}>
        Hey, I'm{" "}
        <span id="main-name" style={{ fontSize: "calc(22px + 4.5vw)", marginBottom: ".5rem" }}>
          Joe Del Balzo
        </span>
      </h1>
      <div id="main-introParagraph">
        <p>Software Engineer and Full Stack Web Developer in New York, NY.</p>
        <p>Former Lighting Designer, Lighting Console Programmer.</p>
        <p>
          Musician, Cold Brew Drinker, Sports Fanatic,{" "}
          <a
            href="https://www.cicerone.org/int-en/users/joseph-del-balzo"
            id="main-name"
            target="_blank"
            style={{ textDecoration: "none", color: "rgba(240, 240, 240, 0.9)" }}
          >
            Certified Cicerone®
          </a>
        </p>
        <p>
          <a
            href="https://www.imdb.com/name/nm3631957/"
            id="main-name"
            target="_blank"
            style={{ textDecoration: "none", color: "rgba(240, 240, 240, 0.9)" }}
          >
            Artist-turned-coder.
          </a>{" "}
          I liked creating beauty before; I like creating beauty now.
        </p>
      </div>
      <Sublinks />
    </>
  );
};

export default Home;
