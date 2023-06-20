import React from "react";
import { Link } from "react-router-dom";
import Resume from "./Resume";

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

      <div id="main-links" style={{ marginBottom: "10vh" }}>
        <Link id="main-link" to={"/resume"} element={<Resume />}>
          Portfolio: "Drop of CSS"
        </Link>
        <Link id="main-link" to={"/resume"} element={<Resume />}>
          Portfolio: "Open Places"
        </Link>
        <Link id="main-link" to={"/resume"} element={<Resume />}>
          Portfolio: "Script for Java"
        </Link>
      </div>
    </div>
  );
};

export default Sublinks;
