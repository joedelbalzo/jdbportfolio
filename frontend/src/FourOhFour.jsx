import React from "react";
import { FadeComponent } from "./FadeComponent";
import { Link } from "react-router-dom";

const FourOhFour = () => {
  return (
    <FadeComponent>
      <>
        <div className="resume-header" style={{ margin: "5rem auto" }}>
          <h1>Uh oh -- you've hit a 404 error! Let's get you home.</h1>
        </div>
        <div id="main-resume">
          <div id="borderdiv" style={{ padding: "4rem" }}>
            <h2>
              <Link to="/" style={{ color: "whitesmoke" }}>
                Home
              </Link>
            </h2>
          </div>
        </div>
      </>
    </FadeComponent>
  );
};

export default FourOhFour;
