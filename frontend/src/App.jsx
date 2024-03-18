import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./Home.jsx";
import Nav from "./Nav.jsx";
import Sublinks from "./Sublinks.jsx";
import Resume from "./Resume.jsx";
import AScriptForJavaApp from "./ScriptForJava/App.jsx";
import OpenPlacesApp from "./Open-Places/App.jsx";
import CssApp from "./DropOfCSS/App.jsx";
import Portfolio from "./Portfolio.jsx";
import { motion } from "framer-motion";

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

const App = () => {
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
      </Routes>
    </div>
  );
};

export default App;
