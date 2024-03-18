import React, { useState } from "react";
import { Link } from "react-router-dom";

const PortfolioFooters = () => {
  return (
    <>
      <div
        style={{
          fontSize: "calc(6px + .5vw)",
          color: "rgb(100,100,100)",
          paddingTop: "2rem",
          paddingBottom: "1rem",
        }}
      >
        <a href="https://www.joedelbalzo.com" style={{ color: "rgb(100,100,100)" }}>
          designed by joedelbalzo.com
        </a>
      </div>
    </>
  );
};
export default PortfolioFooters;
