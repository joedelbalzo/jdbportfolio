import React from "react";
import Sublinks from "./Sublinks";

const Home = () => {
  return (
    <>
      <h1 style={{ fontSize: "calc(22px + 2.5vw)" }}>
        Hey, I'm{" "}
        <span id="main-name" style={{ fontSize: "calc(22px + 2.5vw)" }}>
          Joe Del Balzo
        </span>
      </h1>
      <div id="main-introParagraph">
        <p>Software Engineer and Full Stack Web Developer in New York, NY.</p>
        <p>Former Lighting Designer, Lighting Console Programmer.</p>
        <p>Musician, Cold Brew Drinker, Sports Fanatic, Certified Cicerone®</p>
        <p>Artist-turned-coder. I liked creating beauty before; I like creating beauty now.</p>
      </div>
      <Sublinks />
    </>
  );
};

export default Home;
