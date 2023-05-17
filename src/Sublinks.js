import React from "react";
import { Link } from "react-router-dom";
import Resume from "./Resume";

const Sublinks = () => {
  return (
    <div id="linkPage">
      <div id="links">
        <a
          href="https://www.linkedin.com/in/joe-delbalzo/"
          id="link"
          target="_blank"
          rel="noreferrer noopener"
        >
          LinkedIn
        </a>
        <a
          href="https://github.com/joedelbalzo"
          id="link"
          target="_blank"
          rel="noreferrer noopener"
        >
          GitHub
        </a>

        <Link id="link" to={"/resume"} element={<Resume />}>
          Resume
        </Link>
      </div>
      <div id="links">
        <a
          href="https://jdb-open-places.onrender.com/#/"
          id="link"
          target="_blank"
          rel="noreferrer noopener"
        >
          Portfolio: "Open Places"
        </a>
        <a
          href="https://scriptforjava.onrender.com"
          id="link"
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
