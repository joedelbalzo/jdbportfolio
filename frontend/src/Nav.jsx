import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Login from "./Open-Places/Login";
import HomeJava from "./ScriptForJava/App";
import Home from "./DropOfCSS/Home";

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
        <a href="../home" aria-label="Link to the home page">
          Home
        </a>
        <a
          href="https://www.linkedin.com/in/joe-delbalzo/"
          target="_blank"
          aria-label="Link to Joe Del Balzo's LinkedIn"
          rel="noreferrer noopener"
        >
          LinkedIn
        </a>
        <a href="https://github.com/joedelbalzo" target="_blank" aria-label="Link to Joe Del Balzo's GitHub" rel="noreferrer noopener">
          GitHub
        </a>
        <a href="../resume" aria-label="Link to Joe Del Balzo's Resume" rel="noreferrer noopener">
          Resume
        </a>
        <div className={`main-dropdown ${dropdownActive ? "active" : ""}`} onClick={() => setDropdownActive(!dropdownActive)}>
          <button className={`main-dropbtn ${dropdownActive ? "main-dropdown-hover" : ""}`}>Portfolio</button>
          <div className="main-dropdown-links" style={{ zIndex: "9999" }}>
            <a
              href="/portfolio"
              onClick={(e) => handleMenuItemClick(e, "/portfolio")}
              target="_blank"
              aria-label="Link to an About page for Joe Del Balzo's portfolio"
              rel="noreferrer noopener"
            >
              About
            </a>
            <a
              href="https://joinvali.com/"
              aria-label="Link to the website Vali, engineered by Joe Del Balzo"
              target="_blank"
              rel="noreferrer noopener"
            >
              Vali
            </a>
            <a
              href="https://www.dawngryan.com"
              target="_blank"
              aria-label="Link to the website Dawn Ryan, engineered by Joe Del Balzo"
              rel="noreferrer noopener"
            >
              Dawn Ryan
            </a>
            <a
              href="https://algorhythm-joedelbalzo.vercel.app/"
              target="_blank"
              aria-label="Link to the website AlgoRhythm, engineered by Joe Del Balzo"
              rel="noreferrer noopener"
            >
              AlgoRhythm
            </a>
            <Link to={"../dropofcss"} aria-label="Link to the website Drop of CSS, engineered by Joe Del Balzo" element={<Home />}>
              Drop of CSS
            </Link>
            <Link to={"../openplaces/login"} aria-label="Link to the website Open Places, engineered by Joe Del Balzo" element={<Login />}>
              Open Places
            </Link>
            <Link
              to={"../scriptforjava"}
              aria-label="Link to the website Script for Java, engineered by Joe Del Balzo"
              element={<HomeJava />}
            >
              Script for Java
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
export default Nav;
