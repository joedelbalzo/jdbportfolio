import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import Nav from "./Nav";
import Sublinks from "./Sublinks";
import Resume from "./Resume";
import AScriptForJavaApp from "./ScriptForJava/App.js";
import OpenPlacesApp from "./Open-Places/App.js";
import CssApp from "./DropOfCSS/App";
import Portfolio from "./Portfolio";
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
      delay: 2.5,
      duration: 2,
    },
  },
};
console.log(window);

const App = () => {
  return (
    <div>
      {window.location.hash === "#/home" ? (
        <>
          <motion.div variants={containerVariants} initial="hidden" animate="show">
            <motion.div variants={childVariants}>
              <Nav />
            </motion.div>
          </motion.div>
        </>
      ) : (
        <>
          <Nav />
        </>
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/links" element={<Sublinks />} />
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
