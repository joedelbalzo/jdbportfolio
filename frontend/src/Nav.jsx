import React, { useEffect, useLayoutEffect, useState, useRef } from "react";
import Hamburger from "../assets/Hamburger";

const Nav = () => {
  const [isActive, setIsActive] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navRef = useRef(null);
  const [placeholderHeight, setPlaceholderHeight] = useState(0);

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

    const handleScroll = () => {
      setScrolled(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useLayoutEffect(() => {
    if (navRef.current) {
      setPlaceholderHeight(navRef.current.offsetHeight);
    }
  }, []);

  const closeNav = () => setDrawerOpen(false);
  const openNav = () => setDrawerOpen(true);

  return (
    <>
      <div style={{ height: placeholderHeight }} />
      <div
        ref={navRef}
        className="main-navbar"
        style={{
          position: scrolled ? "fixed" : "absolute",
          top: scrolled ? "10px" : "0",
          left: "50%",
          transform: "translateX(-50%)",
          width: scrolled ? "75%" : "90%",
          borderRadius: scrolled ? "4rem" : "0",
          backgroundColor: scrolled ? "#000813" : "transparent",
          boxShadow: scrolled ? "0px 8px 20px rgba(0,0,0,0.5)" : "none",
          transition: "all 0.3s ease",
          zIndex: "1000",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span className="name">Joe Del Balzo</span>

        <div className="nav-links">
          <a href="../home" style={{ color: isActive === 1 ? "#ff5722" : "", textShadow: "2px 2px 1px black" }}>
            Home
          </a>
          <a href="https://www.linkedin.com/in/joe-delbalzo/" target="_blank" rel="noreferrer noopener">
            LinkedIn
          </a>
          <a href="https://github.com/joedelbalzo" target="_blank" rel="noreferrer noopener">
            GitHub
          </a>
          <a href="../blog" style={{ color: isActive === 2 ? "#ff5722" : "", textShadow: "2px 2px 1px black" }}>
            Blog
          </a>
          <a href="../portfolio" style={{ color: isActive === 3 ? "#ff5722" : "", textShadow: "2px 2px 1px black" }}>
            Portfolio
          </a>
        </div>

        <div className="menuItems" id="small">
          <div className="hamburger-wrapper" onClick={openNav}>
            <Hamburger />
          </div>
        </div>
      </div>

      <div className={`nav-mobile ${drawerOpen ? "open" : ""}`}>
        <span className="closebtn" onClick={closeNav}>
          ×
        </span>
        <a href="../home" onClick={closeNav}>
          Home
        </a>
        <a href="https://www.linkedin.com/in/joe-delbalzo/" target="_blank" rel="noreferrer" onClick={closeNav}>
          LinkedIn
        </a>
        <a href="https://github.com/joedelbalzo" target="_blank" rel="noreferrer" onClick={closeNav}>
          GitHub
        </a>
        <a href="../blog" onClick={closeNav}>
          Blog
        </a>
        <a href="../portfolio" onClick={closeNav}>
          Portfolio
        </a>
      </div>
    </>
  );
};

export default Nav;
