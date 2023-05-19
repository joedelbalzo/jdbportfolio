import React from "react";
import Sublinks from "./Sublinks";
import Resume from "./Resume";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <>
      <div className="navbar">
        <a href="#/home">Home</a>
        <a
          href="https://www.linkedin.com/in/joe-delbalzo/"
          target="_blank"
          rel="noreferrer noopener"
        >
          LinkedIn
        </a>
        <a
          href="https://github.com/joedelbalzo"
          target="_blank"
          rel="noreferrer noopener"
        >
          GitHub
        </a>
        <a href="#/resume" rel="noreferrer noopener">
          Resume
        </a>
        <a href="#/portfolio" rel="noreferrer noopener">
          Portfolio
        </a>
        {/* <div className="dropdown">
          <button className="dropbtn">
            Portfolio
            <i className="fa fa-caret-down"></i>
          </button>
          <div className="dropdown-links">
            <a href="https://jdb-open-places.onrender.com/#/" target="_blank">
              "Open Places"
            </a>
            <a href="https://scriptforjava.onrender.com" target="_blank">
              "Script for Java"
            </a>
          </div>
        </div> */}
      </div>
    </>
  );
};
export default Nav;
