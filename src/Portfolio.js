import React from "react";

const Portfolio = () => {
  return (
    <div id="main-portfolio">
      <h1>
        <span id="main-name">Portfolio</span>
      </h1>
      <h2>
        <a
          href="https://jdb-open-places.onrender.com/#/"
          target="_blank"
          style={{ color: "rgba(240, 240, 240, 0.9)" }}
        >
          "Open Places"
        </a>
      </h2>
      <div id="main-portfolioContainer">
        <div id="main-portfolioDescription">
          <p>
            Open Places is an innovative app designed to provide you with real-time information
            about open establishments in your desired area. By pinging your location, the app
            delivers a comprehensive list of all the nearby places that are currently open. <br />
            <br />
            Technologies for this app include the PERN Javascript stack (PostgreSQL, Express, React,
            Node), MUI styling components, and React-Redux.
            <br />
            <br />
            The inspiration for this app came from my experiences with my wife and our young son. As
            we took walks with him in his stroller, our schedule would vary depending on his sleep
            patterns. We often encountered the frustration of arriving at cafes that were still an
            hour away from opening or finding that the library had different hours for no apparent
            reason. <br />
            <br />
            Feel free to open the app and play around -- it's very simple to just make an account
            with your name and a simple password, or just using the most basic "Moe" and "123"
            login!The data in this app is currently hard-coded, for minimizing costs of an app
            that's not in production. I manually added and seeded 30 restaurants, bars, museums,
            libraries, parks, and more. The code includes a switch to integrate Google's Places API,
            which would allow for real-time data retrieval with minimal effort.
            <br />
            <br />
          </p>
        </div>
        <div id="main-portfolioPictures"></div>
        <iframe src="https://jdb-open-places.onrender.com/#/"></iframe>
      </div>
      <br />
      <br />
      <hr />
      <br />
      <br />
      <h2>
        <a
          href="https://scriptforjava.onrender.com/"
          target="_blank"
          style={{ color: "rgba(240, 240, 240, 0.9)" }}
        >
          "Script for Java"
        </a>
      </h2>
      <div id="main-portfolioContainer">
        <iframe src="https://scriptforjava.onrender.com/"></iframe>

        <div id="main-portfolioDescription">
          <p>
            "Script for Java" is a basic shopping app for a small chain of coffee stores.
            <br />
            <br />
            Technologies for this app include the PERN Javascript stack (PostgreSQL, Express, React,
            Node), MUI styling components, and React-Redux.
            <br />
            <br />
            The inspiration for this app was simply an experiment in authentication, authorization
            (including administrative tools), and the ability to shop both with and without an
            account. <br />
            <br />
            Feel free to open the app and play around -- it's very simple to just make an account
            with your name and a simple password. Other options include OAuth with your Github
            account or just using the most basic "Moe" and "123" login!
            <br />
            <br />
          </p>
        </div>
        <div id="main-portfolioPictures"></div>
      </div>
    </div>
  );
};

export default Portfolio;
