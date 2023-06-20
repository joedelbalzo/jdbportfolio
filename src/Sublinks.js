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
        <a
          href="https://jdb-open-places.onrender.com/#/"
          id="main-link"
          target="_blank"
          rel="noreferrer noopener"
        >
          Portfolio: "Open Places"
        </a>
        <a
          href="https://scriptforjava.onrender.com"
          id="main-link"
          target="_blank"
          rel="noreferrer noopener"
        >
          Portfolio: "Script for Java"
        </a>
      </div>
    </div>
  );
};

export default Sublinks;
