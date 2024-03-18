import React from "react";
import { Typography } from "@mui/material";
import SubNavAbout from "./SubNavAbout";

const AboutContact = () => {
  return (
    <div>
      <SubNavAbout />
      <Typography
        sx={{
          fontFamily: "verdana",
          fontSize: "calc(12px + 1vw)",
          mx: "auto",
          marginTop: "1rem",
          marginBottom: "1rem",
          maxWidth: "70%",
        }}
      >
        <h3 style={{ color: "black" }}>Please contact us at:</h3>
        <li style={{ listStyleType: "none" }}>
          Phone: <a href="tel:240-441-7689">240-441-7689</a>
        </li>
        <li style={{ listStyleType: "none" }}>
          Email: <a href="mailto:jdelbalzo99@gmail.com">jdelbalzo99@gmail.com</a>
        </li>
      </Typography>
    </div>
  );
};

export default AboutContact;
