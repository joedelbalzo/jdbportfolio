import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./Home.jsx";
import Nav from "./Nav.jsx";
import Resume from "./Resume.jsx";
import AScriptForJavaApp from "./ScriptForJava/App.jsx";
import OpenPlacesApp from "./Open-Places/App.jsx";
import CssApp from "./DropOfCSS/App.jsx";
import LetsChatApp from "./WebRTC/App.jsx";
import Portfolio from "./Portfolio.jsx";
import FourOhFour from "./FourOhFour.jsx";

//mui
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Fab from "@mui/material/Fab";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";

function ScrollTop(props) {
  const { children } = props;

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
    smoothScrollToTop(200);
  };
  return (
    <Fade in={trigger}>
      <Box onClick={handleClick} role="presentation" sx={{ position: "fixed", bottom: 24, right: 24, zIndex: "1000" }}>
        {children}
      </Box>
    </Fade>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
  },
};

const childVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delay: 0,
      duration: 0.5,
    },
  },
};

const App = (props) => {
  return (
    <div>
      <Nav />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/dropofcss/*" element={<CssApp />} />
        <Route path="/scriptforjava/*" element={<AScriptForJavaApp />} />
        <Route path="/openplaces/*" element={<OpenPlacesApp />} />
        <Route path="/letschat/*" element={<LetsChatApp />} />
        <Route path="/*" element={<FourOhFour />} />
      </Routes>

      <ScrollTop {...props}>
        <Fab
          size="large"
          sx={{
            border: "1px solid #FF5722;",
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
  );
};

export default App;
