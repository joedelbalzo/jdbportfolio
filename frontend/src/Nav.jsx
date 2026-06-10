import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import Hamburger from "../assets/Hamburger";

const Nav = () => {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerRef = useRef(null);
  const hamburgerRef = useRef(null);

  const isDashboard = pathname === "/dashboard";
  const isHome = pathname === "/" || pathname === "/home";
  const isPortfolio = pathname === "/portfolio";

  useEffect(() => {
    if (isDashboard) {
      setScrolled(false);
      return;
    }
    let rafId = null;
    const handleScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 200);
        rafId = null;
      });
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isDashboard]);

  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        setDrawerOpen(false);
        return;
      }
      if (e.key !== "Tab" || !drawerRef.current) return;
      // Keep Tab cycling inside the drawer while it's open
      const focusable = drawerRef.current.querySelectorAll("a[href], button");
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      } else if (!drawerRef.current.contains(document.activeElement)) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    const closeButton = drawerRef.current?.querySelector("button");
    if (closeButton) closeButton.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  const closeNav = () => {
    setDrawerOpen(false);
    if (hamburgerRef.current) hamburgerRef.current.focus();
  };
  const openNav = () => setDrawerOpen(true);

  const navClasses = ["main-navbar"];
  if (scrolled) navClasses.push("scrolled");
  if (isDashboard) navClasses.push("no-transition");

  return (
    <>
      <div className="nav-placeholder" aria-hidden="true" />
      <nav className={navClasses.join(" ")} aria-label="Primary">
        <span className="name">
          <Link to="/home">Joe Del Balzo</Link>
        </span>

        <div className="nav-links">
          <a href="https://www.linkedin.com/in/joe-delbalzo/" target="_blank" rel="noreferrer noopener">
            LinkedIn
          </a>
          <a href="https://github.com/joedelbalzo" target="_blank" rel="noreferrer noopener">
            GitHub
          </a>
          <Link to="/portfolio" className={isPortfolio ? "is-active" : undefined}>
            Portfolio
          </Link>
        </div>

        <div className="menuItems">
          <button
            ref={hamburgerRef}
            type="button"
            className="hamburger-wrapper"
            aria-label="Open navigation menu"
            aria-expanded={drawerOpen}
            aria-controls="nav-mobile-drawer"
            onClick={openNav}
          >
            <Hamburger />
          </button>
        </div>
      </nav>

      <div
        className={`nav-mobile-overlay ${drawerOpen ? "open" : ""}`}
        onClick={closeNav}
        aria-hidden="true"
      />
      <div
        id="nav-mobile-drawer"
        ref={drawerRef}
        className={`nav-mobile ${drawerOpen ? "open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <button type="button" className="closebtn" onClick={closeNav} aria-label="Close navigation menu">
          ×
        </button>
        <Link to="/home" onClick={closeNav} className={isHome ? "is-active" : undefined}>
          Home
        </Link>
        <a href="https://www.linkedin.com/in/joe-delbalzo/" target="_blank" rel="noreferrer noopener" onClick={closeNav}>
          LinkedIn
        </a>
        <a href="https://github.com/joedelbalzo" target="_blank" rel="noreferrer noopener" onClick={closeNav}>
          GitHub
        </a>
        <Link to="/portfolio" onClick={closeNav} className={isPortfolio ? "is-active" : undefined}>
          Portfolio
        </Link>
      </div>
    </>
  );
};

export default Nav;
