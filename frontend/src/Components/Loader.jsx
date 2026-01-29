import React from "react";
import "./Loader.css";

const Loader = ({ message = "Loading..." }) => {
  return (
    <div className="loader-container">
      <l-waveform size="45" stroke="4.5" speed="1" color="#ff5722"></l-waveform>
      {message && <p className="loader-message">{message}</p>}
    </div>
  );
};

export default Loader;
