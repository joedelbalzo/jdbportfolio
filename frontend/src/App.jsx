import React, {Suspense, lazy} from "react";
import {Routes, Route, Link} from "react-router-dom";
import Home from "./Home.jsx";
import Nav from "./Nav.jsx";
import Portfolio from "./Portfolio.jsx";
import FourOhFour from "./FourOhFour.jsx";
import Socials from "./Socials.jsx";
import {waveform} from "ldrs";
import ScrollToTopOnRouteChange from "./Components/ScrollToTop.jsx";

//mui
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Fab from "@mui/material/Fab";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";

//Lazy
const Footer = lazy(() => import("./Footer.jsx"));
const Resume = lazy(() => import("./Resume.jsx"));
const Dashboard = lazy(() => import("./Dashboard/Dashboard.jsx"));
// Legacy app imports (hidden - restorable)
// const AScriptForJavaApp = lazy(() => import("./ScriptForJava/App.jsx"));
// const OpenPlacesApp = lazy(() => import("./Open-Places/App.jsx"));
// const CssApp = lazy(() => import("./DropOfCSS/App.jsx"));
// const BlogHome = lazy(() => import("./Blog/BlogHome.jsx"));
// const BlogPost = lazy(() => import("./Blog/BlogPost.jsx"));
// WebRTC deleted

waveform.register();

function ScrollTop(props) {
  const {children} = props;

  const trigger = useScrollTrigger({
    target: window,
    disableHysteresis: true,
    threshold: 100,
  });

  const smoothScrollToTop = (duration) => {
    const scrollStep = -window.scrollY / (duration / 15),
      scrollInterval = setInterval(function () {
        if (window.scrollY != 0) {
          window.scrollBy(0, scrollStep);
        } else clearInterval(scrollInterval);
      }, 15);
  };

  const handleClick = () => {
    window.scrollTo({top: 0, behavior: "smooth"});
  };

  return (
    <Fade in={trigger}>
      <Box onClick={handleClick} role="presentation" sx={{position: "fixed", bottom: 24, right: 24, zIndex: 1000}}>
        {children}
      </Box>
    </Fade>
  );
}

const App = (props) => {
  return (
    <div className="app-wrapper">
      <div className="fixed-bg" />
      <Nav />
      <div className="main-grid">
        <div className="share-buttons-container">
          <Socials />
        </div>

        <div className="main-content">
          <Suspense
            fallback={
              <div style={{margin: "10% auto"}}>
                <l-waveform size="45" stroke="4.5" speed="1" color="#ff5722"></l-waveform>
              </div>
            }>
            <ScrollToTopOnRouteChange />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/resume" element={<Resume />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/dashboard" element={<Dashboard />} />
              {/* Legacy app routes (hidden - restorable) */}
              {/* <Route path="/dropofcss/*" element={<CssApp />} /> */}
              {/* <Route path="/scriptforjava/*" element={<AScriptForJavaApp />} /> */}
              {/* <Route path="/openplaces/*" element={<OpenPlacesApp />} /> */}
              {/* <Route path="/blog" element={<BlogHome />} /> */}
              {/* <Route path="/blog/:slug" element={<BlogPost />} /> */}
              {/* WebRTC deleted */}
              <Route path="/*" element={<FourOhFour />} />
            </Routes>
          </Suspense>
        </div>

        <ScrollTop {...props}>
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
            aria-label="scroll back to top">
            <ArrowUpwardOutlinedIcon />
          </Fab>
        </ScrollTop>
      </div>
      <div style={{margin: "0 auto"}}>
        <Footer />
      </div>
    </div>
  );
};

export default App;
