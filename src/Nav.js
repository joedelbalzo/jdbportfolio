import React, { useState } from "react";
import Sublinks from "./Sublinks";
import Resume from "./Resume";
import { Link } from "react-router-dom";
import Portfolio from "./Portfolio";

const Nav = () => {
  const [dropdownActive, setDropdownActive] = useState(false);

  const handleMenuItemClick = () => {
    setDropdownActive(false);
  };

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
        <div
          className={`main-dropdown ${dropdownActive ? "active" : ""}`}
          onClick={() => setDropdownActive(!dropdownActive)}
        >
          <button className={`main-dropbtn ${dropdownActive ? "main-dropdown-hover" : ""}`}>
            Portfolio
          </button>
          <div className="main-dropdown-links" style={{ zIndex: "9999" }}>
            <a href="#/portfolio" onClick={handleMenuItemClick}>
              About
            </a>
            <a href="#/dropofcss/" onClick={handleMenuItemClick}>
              "Drop of CSS"
            </a>
            <a href="#/openplaces/login" onClick={handleMenuItemClick}>
              "Open Places"
            </a>
            <a href="#/scriptforjava" onClick={handleMenuItemClick}>
              "Script for Java"
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
export default Nav;
