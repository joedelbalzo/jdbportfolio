import React from "react";
import { FadeComponent } from "./FadeComponent";
import { Link } from "react-router-dom";

const FourOhFour = () => {
  return (
    <FadeComponent>
      <div className="four-oh-four">
        <div className="resume-header">
          <h1 className="four-oh-four__title">Uh oh — you've hit a 404 error. Let's get you home.</h1>
        </div>
        <div id="main-resume" className="four-oh-four__home-link">
          <h2>
            <Link to="/">Home</Link>
          </h2>
        </div>
      </div>
    </FadeComponent>
  );
};

export default FourOhFour;
