import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import Login from "./Open-Places/Login";
// import HomeJava from "./ScriptForJava/App";
// import Home from "./DropOfCSS/Home";

const Nav = () => {
  // const [dropdownActive, setDropdownActive] = useState(false);
  const [isActive, setIsActive] = useState(null);

  useEffect(() => {
    const activeOptions = {
      "https://joedelbalzo.com/home": 1,
      "https://joedelbalzo.com/blog": 2,
      "https://joedelbalzo.com/portfolio": 3,
      "http://localhost:3000/home": 1,
      "http://localhost:3000/blog": 2,
      "http://localhost:3000/portfolio": 3,
    };
    setIsActive(activeOptions[window.location.href]);
  }, [window.location.href]);

  // console.log(isActive);
  return (
    <>
      <div className={"main-navbar"}>
        <a
          href="../home"
          aria-label="Link to the home page"
          style={{
            color: isActive == 1 ? "#ff5722" : "",
            // fontWeight: isActive == 1 ? "400" : "",
            textShadow: "2px 2px 1px black",
          }}
        >
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
        <a
          href="../blog"
          aria-label="Link to Joe Del Balzo's Blog"
          rel="noreferrer noopener"
          style={{
            color: isActive == 2 ? "#ff5722" : "",
            textShadow: "2px 2px 1px black",
          }}
        >
          Blog
        </a>
        <a
          href="../portfolio"
          aria-label="Link to Joe Del Balzo's Portfolio"
          rel="noreferrer noopener"
          style={{
            color: isActive == 3 ? "#ff5722" : "",
            textShadow: "2px 2px 1px black",
          }}
        >
          Portfolio
        </a>
      </div>
    </>
  );
};
export default Nav;
