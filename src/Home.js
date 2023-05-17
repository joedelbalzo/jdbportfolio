import React from "react";
import Sublinks from "./Sublinks";

const Home = () => {
  return (
    <>
      <h1>
        Hey, I'm <span id="name">Joe Del Balzo.</span>
      </h1>
      <div id="introParagraph">
        <p>Web developer, front end, and back end engineer in New York, NY.</p>
        <p>Former Lighting Designer, Lighting Console Programmer.</p>
        <p>Musician, Cold Brew Drinker, Sports Fanatic, Certified Cicerone®</p>
        <p>
          Artist-turned-coder. I liked creating beauty before; I like creating
          beauty now.
        </p>
      </div>
      <Sublinks />
    </>
  );
};

export default Home;
