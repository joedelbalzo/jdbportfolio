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
            transition={transition}
            viewport={{ once: true, amount: 0.1 }}
          >
            <p id="about-me-paragraphs">
              Hey, I’m Joe—a software engineer passionate about building clean, efficient, and visually compelling applications.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: "50px" }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={transition}
            viewport={{ once: true, amount: 0.1 }}
          >
            <p id="about-me-paragraphs">
              After a decade in film and TV as a lighting designer and network architect, I transitioned into software engineering. Now, I
              craft intuitive front-end solutions at{" "}
              <a href="https://thefutureofagency.com" target="_blank" rel="noopener noreferrer">
                the future of agency
              </a>
              , helping authors and publishers take control of their digital presence.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: "50px" }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={transition}
            viewport={{ once: true, amount: 0.1 }}
          >
            <p id="about-me-paragraphs">
              Beyond that, I like taking on full-stack projects that push the boundaries of performance and scalability. Most recently, I
              led a front-end architecture overhaul for{" "}
              <a href="https://valley-arcade.com" target="_blank" rel="noopener noreferrer">
                Valley Arcade
              </a>
              , an innovative Web3 gaming platform. My optimizations cut database query load by 70% and improved API response times by up to
              80%, cutting page load times by 5-6 seconds while ensuring scalability for 3,000+ active users.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: "50px" }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={transition}
            viewport={{ once: true, amount: 0.1 }}
          >
            <div className="about-me-paragraph-grid-section" id="about-me-paragraphs">
              <p id="about-me-paragraphs">
                Outside of coding, I’m in the backyard with my wife and son, probably playing driveway hockey or making sandcastles. There’s
                always a guitar nearby and a cold brew (caffeinated or otherwise) within reach.
              </p>
              <img src={familyPhoto} alt="Joe Del Balzo and his family" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: "50px" }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={transition}
            viewport={{ once: true, amount: 0.1 }}
          >
            <p id="about-me-paragraphs">
              <a href="../resume" aria-label="Link to Joe Del Balzo's Resume" rel="noreferrer noopener" target="_blank">
                Check out my resume.
              </a>
            </p>
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
          {/* 
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
          </motion.div> */}
        </div>
      </div>
    </FadeComponent>
  );
};

export default AboutMe;
