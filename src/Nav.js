import React from "react";
import Sublinks from "./Sublinks";
import Resume from "./Resume";
import { Link } from "react-router-dom";
import Portfolio from "./Portfolio";

const Nav = () => {
  return (
    <>
      <div className="main-navbar">
        <a href="#/home">Home</a>
        <a
          href="https://www.linkedin.com/in/joe-delbalzo/"
          target="_blank"
          rel="noreferrer noopener"
        >
          LinkedIn
        </a>
        <a href="https://github.com/joedelbalzo" target="_blank" rel="noreferrer noopener">
          GitHub
        </a>
        <a href="#/resume" rel="noreferrer noopener">
          Resume
        </a>
        <div className="main-dropdown">
          <button className="main-dropbtn">
            Portfolio
            {/* <i className="fa fa-caret-down"></i> */}
          </button>
          <div className="main-dropdown-links">
            <a href="#/portfolio">About</a>
            <a href="#/dropofcss/">"Drop of CSS"</a>
            <a href="#/openplaces/login">"Open Places"</a>
            <a href="#/scriptforjava">"Script for Java"</a>
          </div>
        </div>
      </div>
    </>
  );
};
export default Nav;
