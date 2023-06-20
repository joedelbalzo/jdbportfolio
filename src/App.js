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

const App = () => {
  return (
    <div>
      <Nav />
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
