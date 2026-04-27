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
          <span>Beacon, New York</span>
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
