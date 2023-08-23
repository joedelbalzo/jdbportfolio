import React from "react";
import { Link } from "react-router-dom";
import Resume from "./Resume";
import CssApp from "./DropOfCSS/App";
import Login from "./Open-Places/Login";
import AScriptForJavaApp from "./ScriptForJava/App";

const Sublinks = () => {
  return (
    <div id="main-linkPage">
      <div id="main-links">
        <a
          href="https://www.linkedin.com/in/joe-delbalzo/"
          id="main-link"
          target="_blank"
          rel="noreferrer noopener"
        >
          LinkedIn
        </a>
        <a
          href="https://github.com/joedelbalzo"
          id="main-link"
          target="_blank"
          rel="noreferrer noopener"
        >
          GitHub
        </a>

        <Link id="main-link" to={"/resume"} element={<Resume />}>
          Resume
        </Link>
      </div>

      <div id="main-links">
        <a id="main-link" href="https://dawnryan.onrender.com/#/" target="_blank">
          Dawn Ryan
        </a>
        <Link id="main-link" to={"/dropofcss"} element={<CssApp />}>
          Drop of CSS
        </Link>
        <Link id="main-link" to={"/openplaces/login"} element={<Login />}>
          Open Places
        </Link>
        <Link id="main-link" to={"/scriptforjava"} element={<AScriptForJavaApp />}>
          Script for Java
        </Link>
      </div>
    </div>
  );
};

export default Sublinks;
