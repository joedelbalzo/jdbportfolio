import React from "react";
import { FadeComponent } from "./FadeComponent";
import { motion } from "framer-motion";
import Contact from "./Contact";
import PortfolioHighlights from "./PortfolioHighlights";
import css3 from "../assets/to-move-to-static/coding-svgs/css3.svg";
import express from "../assets/to-move-to-static/coding-svgs/express.svg";
import html5 from "../assets/to-move-to-static/coding-svgs/html5.svg";
import javascript from "../assets/to-move-to-static/coding-svgs/javascript.svg";
import less from "../assets/to-move-to-static/coding-svgs/less.svg";
import nodejs from "../assets/to-move-to-static/coding-svgs/nodejs.svg";
import postgresql from "../assets/to-move-to-static/coding-svgs/postgresql.svg";
import python from "../assets/to-move-to-static/coding-svgs/python.svg";
import react from "../assets/to-move-to-static/coding-svgs/react.svg";
import typescript from "../assets/to-move-to-static/coding-svgs/typescript.svg";
import familyPhoto from "../assets/family_photo.webp";

const AboutMe = () => {
  const transition = {
    type: "spring",
    damping: 15,
    stiffness: 50,
  };

  return (
    <FadeComponent>
      <div className="about-me-container">
        <div style={{ color: "whitesmoke" }} id="about-me">
          <motion.div
            initial={{ opacity: 0, y: "50px" }}
            whileInView={{ opacity: 1, y: 0 }}
            id="about-me-paragraph-container"
            transition={transition}
            viewport={{ once: true, amount: 0.1 }}
          >
            <div id="about-me-titles">About Me</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: "50px" }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={transition}
            viewport={{ once: true, amount: 0.1 }}
          >
            <p id="about-me-paragraphs">
              Hello! I'm Joe. I love solving technical problems and creating unique, interesting solutions for my clients.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: "50px" }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={transition}
            viewport={{ once: true, amount: 0.1 }}
          >
            <p id="about-me-paragraphs">
              After over 10 years in the film and television industry as a lighting designer, network architect, and console programmer, I
              was ready to take my love of technology in a different direction.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: "50px" }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={transition}
            viewport={{ once: true, amount: 0.1 }}
          >
            <p id="about-me-paragraphs">
              Today, I'm a software engineer at{" "}
              <a href="https://thefutureofagency.com" target="_blank" rel="noopener noreferrer">
                the future of agency
              </a>
              , a marketing firm for books, authors, and publishers. I spend my time crafting custom front-end solutions that provide our
              clients with highly responsive websites, outstanding SEO, and creative control over their digital marketing applications.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: "50px" }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={transition}
            viewport={{ once: true, amount: 0.1 }}
          >
            <div className="about-me-paragraph-grid-section" id="about-me-paragraphs">
              <p style={{ width: "100%" }}>
                When I'm not coding, you'll find me in the backyard with my wife and three year old son. Chances are we're playing in the
                sandbox or playing hockey in the driveway. I probably have a cold brew (either the upper or the downer, depending on the
                hour!) on the chair, and nowhere in this house is too far from a guitar.
              </p>
              <img src={familyPhoto} alt="Joe Del Balzo and his family" />
            </div>
          </motion.div>
        </div>
      </div>
      <div className="recordspinning">
        <div id="about-me-titles" style={{ paddingTop: "8%" }}>
          Languages and Technologies I Love
        </div>
        <motion.div
          initial={{ opacity: 0, y: "50px" }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={transition}
          viewport={{ once: true, amount: 0.1 }}
        >
          <p className="devicons">
            <img src={javascript} alt="JavaScript logo" />
            <img src={typescript} alt="TypeScript logo" />
            <img src={python} alt="Python logo" />
          </p>
          <br />
          <p className="devicons">
            <img src={react} alt="React logo" />
            <img src={express} alt="Express logo" />
            <img src={nodejs} alt="Node.js logo" />
            <img src={postgresql} alt="PostgreSQL logo" />
            <img src={less} alt="Less logo" />
            <img src={css3} alt="CSS3 logo" />
            <img src={html5} alt="HTML5 logo" />
          </p>
          <br />
        </motion.div>
      </div>
      <div className="about-me-container">
        <div style={{ color: "whitesmoke", padding: "0%", margin: "0 auto", width: "90%" }} id="about-me">
          <motion.div
            initial={{ opacity: 0, y: "100px" }}
            whileInView={{ opacity: 1, y: 0 }}
            id="about-me-paragraph-container"
            transition={transition}
            viewport={{ once: true, amount: 0.1 }}
          >
            <div id="about-me-titles">Portfolio Highlights</div>
          </motion.div>

          <PortfolioHighlights />

          <motion.div
            initial={{ opacity: 0, y: "100px" }}
            whileInView={{ opacity: 1, y: 0 }}
            id="about-me-paragraph-container"
            transition={transition}
            viewport={{ once: true, amount: 0.1 }}
          >
            <div id="about-me-titles">Get in Touch</div>
            <p>
              I would love to be in touch! Whether you need something as minimal as bug troubleshooting and maintenance, to something from
              scratch, to something full-time, I'm your guy! <br />
              <br />
              Let's make something cool together.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: "100px" }}
            whileInView={{ opacity: 1, y: 0 }}
            id="about-me-paragraph-container"
            transition={transition}
            viewport={{ once: true, amount: 0.1 }}
          >
            <Contact />
          </motion.div>
        </div>
      </div>
    </FadeComponent>
  );
};

export default AboutMe;
