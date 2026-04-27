import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home.jsx";
import Nav from "./Nav.jsx";
import PortfolioHighlights from "./PortfolioHighlights.jsx";
import FourOhFour from "./FourOhFour.jsx";
import Socials from "./Socials.jsx";
import { waveform } from "ldrs";
import ScrollToTopOnRouteChange from "./Components/ScrollToTop.jsx";

import useScrollTrigger from "@mui/material/useScrollTrigger";
import Fab from "@mui/material/Fab";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";

const Footer = lazy(() => import("./Footer.jsx"));
const Resume = lazy(() => import("./Resume.jsx"));
const Dashboard = lazy(() => import("./Dashboard/Dashboard.jsx"));

waveform.register();

function ScrollTop({ children }) {
  const trigger = useScrollTrigger({
    target: window,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <Fade in={trigger}>
      <Box onClick={handleClick} role="presentation" sx={{ position: "fixed", bottom: 24, right: 24, zIndex: 1000 }}>
        {children}
      </Box>
    </Fade>
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
        </div>

        <ScrollTop>
          <Fab
            size="large"
            sx={{
              border: "1px solid #FF5722",
              height: "42px",
              width: "42px",
              borderRadius: "4px",
              boxShadow: "2px 2px 2px rgba(20,30,70, .5)",
              backgroundColor: "transparent",
              color: "whitesmoke",
              "&:hover": {
                backgroundColor: "#FF5722",
                color: "#FFF",
              },
            }}
            className="scroll-button"
            aria-label="scroll back to top"
          >
            <ArrowUpwardOutlinedIcon />
          </Fab>
        </ScrollTop>
      </div>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default App;
