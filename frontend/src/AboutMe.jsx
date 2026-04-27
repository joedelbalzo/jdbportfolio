import React from "react";
import { FadeComponent } from "./FadeComponent";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PortfolioHighlights from "./PortfolioHighlights";
import familyPhoto from "../assets/family_photo.webp";

const transition = { type: "spring", damping: 15, stiffness: 50 };

const AboutMe = () => {
  return (
    <FadeComponent>
      <div className="about-me-container">
        <div id="about-me">
          <motion.div
            initial={{ opacity: 0, y: "50px" }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={transition}
            viewport={{ once: true, amount: 0.1 }}
          >
            <div className="about-me-paragraph-grid-section">
              <p className="about-me-paragraphs">
                A software engineer who builds fast, thoughtful web apps across industries. From arcade games with thousands of
                active players to digital platforms for publishers and artists, I focus on performance, clarity, and making
                things that actually work.
                <br />
                <br />
                Before tech, I spent a decade designing lighting and building show networks in film and TV—training that shaped
                how I handle complexity, detail, and timing in everything I build now.
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
            <p className="about-me-paragraphs" style={{ marginTop: 0 }}>
              These days, I split my time between writing code, chasing my kid around the yard, and staying just caffeinated
              enough to keep things running. I’m always open to the next good project—especially the kind that’s fun to build
              and built to last.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: "50px" }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={transition}
            viewport={{ once: true, amount: 0.1 }}
          >
            <p className="about-me-paragraphs">
              <Link to="/resume" aria-label="Link to Joe Del Balzo's Resume">
                Check out my resume here!
              </Link>
            </p>
          </motion.div>
        </div>
      </div>

      <div className="about-me-container">
        <div id="about-me" className="about-me-portfolio-wrap">
          <motion.div
            initial={{ opacity: 0, y: "100px" }}
            whileInView={{ opacity: 1, y: 0 }}
            id="about-me-paragraph-container"
            transition={transition}
            viewport={{ once: true, amount: 0.1 }}
          >
            <div id="about-me-titles">Portfolio</div>
          </motion.div>

          <PortfolioHighlights />
        </div>
      </div>
    </FadeComponent>
  );
};

export default AboutMe;
