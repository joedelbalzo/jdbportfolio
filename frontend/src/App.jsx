import React, { Suspense, lazy, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home.jsx";
import Nav from "./Nav.jsx";
import PortfolioHighlights from "./PortfolioHighlights.jsx";
import FourOhFour from "./FourOhFour.jsx";
import Socials from "./Socials.jsx";
import { waveform } from "ldrs";
import ScrollToTopOnRouteChange from "./Components/ScrollToTop.jsx";
import ErrorBoundary from "./Components/ErrorBoundary.jsx";

const Footer = lazy(() => import("./Footer.jsx"));
const Resume = lazy(() => import("./Resume.jsx"));
const Dashboard = lazy(() => import("./Dashboard/Dashboard.jsx"));

waveform.register();

function ScrollTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let rafId = null;
    const handleScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        setVisible(window.scrollY > 100);
        rafId = null;
      });
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <button
      type="button"
      className={`scroll-button ${visible ? "scroll-button--visible" : ""}`}
      onClick={() =>
        window.scrollTo({ top: 0, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" })
      }
      aria-label="Scroll back to top"
      tabIndex={visible ? 0 : -1}
    >
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
        <path d="M12 19V5M5 12l7-7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

const App = () => {
  return (
    <div className="app-wrapper">
      <div className="fixed-bg" />
      <div className="grain-overlay" aria-hidden="true" />
      <Nav />
      <div className="main-grid">
        <div className="share-buttons-container">
          <Socials />
        </div>

        <div className="main-content">
          <ErrorBoundary>
            <Suspense
              fallback={
                <div className="suspense-fallback">
                  <l-waveform size="45" stroke="4.5" speed="1" color="#ff5722"></l-waveform>
                </div>
              }
            >
              <ScrollToTopOnRouteChange />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/resume" element={<Resume />} />
                <Route
                  path="/portfolio"
                  element={
                    <>
                      <div className="resume-header">
                        <h1>Portfolio</h1>
                      </div>
                      <PortfolioHighlights />
                    </>
                  }
                />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/*" element={<FourOhFour />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </div>

        <ScrollTop />
      </div>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default App;
