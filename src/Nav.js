import React, { useState, useEffect, useRef } from "react";
// import Sublinks from "./Sublinks";
// import Resume from "./Resume";
// import { Link } from "react-router-dom";
// import Portfolio from "./Portfolio";

const Nav = () => {
  const [dropdownActive, setDropdownActive] = useState(false);

  const handleMenuItemClick = (e, href) => {
    e.preventDefault();
    setDropdownActive(false);
    window.location.href = href;
  };

  useEffect(() => {
    setDropdownActive(false);
  }, []);

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
            <a href="#/portfolio" onClick={(e) => handleMenuItemClick(e, "#/portfolio")}>
              About
            </a>
            <a href="https://dawnryan.onrender.com/#/" target="_blank">
              Dawn Ryan
            </a>
            <a href="#/dropofcss/" onClick={(e) => handleMenuItemClick(e, "/#/dropofcss/")}>
              "Drop of CSS"
            </a>
            <a
              href="#/openplaces/login"
              onClick={(e) => handleMenuItemClick(e, "/#/openplaces/login")}
            >
              "Open Places"
            </a>
            <a href="#/scriptforjava" onClick={(e) => handleMenuItemClick(e, "/#/scriptforjava")}>
              "Script for Java"
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
export default Nav;
