import React from "react";
import "./Components.css";

const TwoColumnLayout = ({ left, right }) => {
  return (
    <div className="two-column-layout">
      <div className="two-column-layout__left">{left}</div>
      <div className="two-column-layout__right">{right}</div>
    </div>
  );
};

export default TwoColumnLayout;
