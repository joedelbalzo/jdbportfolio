import React, { useState } from "react";
import { motion } from "framer-motion";
import { OpenWindow } from "./ShareIcons/OpenWindow";
import { GitHub } from "./ShareIcons/SocialIcons";

const PortfolioCard = ({ title, description, siteLink, repoLink, imgSrc, imgAlt, isOdd }) => {
  const [hoveredElement, setHoveredElement] = useState(null);

  const handleMouseEnter = (id) => {
    setHoveredElement(id);
  };

  const handleMouseLeave = () => {
    setHoveredElement(null);
  };

  const getColor = (id) => {
    return hoveredElement === id ? "#ff5722" : "whitesmoke";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: "50px" }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", damping: 10, stiffness: 50 }}
      viewport={{ once: true, amount: 0.1 }}
      // style={{ width: "100%" }}
    >
      <div id="portfolio-card">
        <a href={siteLink} target="_blank" rel="noopener noreferrer">
          <div className="image-wrapper">
            <img src={imgSrc} alt={imgAlt} className={`portfolio-images`} />
          </div>
        </a>
        <h2>{title}</h2>
        <h3>{description}</h3>
        <div>
          <span className="devicons-open-and-github">
            <span className="devicons-open-and-github" onMouseEnter={() => handleMouseEnter("open")} onMouseLeave={handleMouseLeave}>
              <a href={siteLink} target="_blank" rel="noopener noreferrer">
                <OpenWindow style={{ padding: "1rem" }} color={getColor("open")} />
              </a>
            </span>

            {repoLink && (
              <span className="devicons-open-and-github" onMouseEnter={() => handleMouseEnter("github")} onMouseLeave={handleMouseLeave}>
                <a href={repoLink} target="_blank" rel="noopener noreferrer">
                  <GitHub style={{ padding: "1rem" }} color={getColor("github")} />
                </a>
              </span>
            )}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default PortfolioCard;
