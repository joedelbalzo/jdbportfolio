import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <p>
        &copy; Joe Del Balzo, {year}. Email me at <a href="mailto:jdelbalzo99@gmail.com">jdelbalzo99@gmail.com</a>.
      </p>
    </footer>
  );
};

export default Footer;
