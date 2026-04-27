import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="site-footer__row">
        <div className="site-footer__identity">
          <span className="site-footer__name">Joe Del Balzo</span>
          <span className="site-footer__sep">·</span>
          <span>Software Engineer</span>
          <span className="site-footer__sep">·</span>
          <span>Beacon, NY</span>
        </div>

        <div className="site-footer__links">
          <Link to="/home">Home</Link>
          <Link to="/portfolio">Portfolio</Link>
          <Link to="/resume">Resume</Link>
          <a href="https://www.linkedin.com/in/joe-delbalzo/" target="_blank" rel="noreferrer noopener">
            LinkedIn
          </a>
          <a href="https://github.com/joedelbalzo" target="_blank" rel="noreferrer noopener">
            GitHub
          </a>
        </div>
      </div>

      <div className="site-footer__base">
        <a href="mailto:jdelbalzo99@gmail.com">jdelbalzo99@gmail.com</a>
        <span className="site-footer__sep">·</span>
        <span>&copy; {year}</span>
      </div>
    </footer>
  );
};

export default Footer;
