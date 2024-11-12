import React from "react";
import { FadeComponent } from "./FadeComponent";
import { Link } from "react-router-dom";

const FourOhFour = () => {
  return (
    <FadeComponent>
      <>
        <div className="resume-header" style={{ margin: "5rem auto", width: "60%" }}>
          <h1 style={{ fontSize: "smaller" }}>Uh oh -- you've hit a 404 error! Let's get you home.</h1>
        </div>
        <div id="main-resume">
          <h2>
            <Link to="/" style={{ color: "whitesmoke" }}>
              Home
            </Link>
          </h2>
        </div>
      </>
    </FadeComponent>
  );
};

export default FourOhFour;
