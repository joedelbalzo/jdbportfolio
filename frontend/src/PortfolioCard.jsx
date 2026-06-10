import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { OpenWindow } from "./ShareIcons/OpenWindow";
import { GitHub } from "./ShareIcons/SocialIcons";

const PortfolioCard = ({ title, description, siteLink, repoLink, imgSrc, imgAlt }) => {
  const [hoveredElement, setHoveredElement] = useState(null);
  const reduceMotion = useReducedMotion();

  const getColor = (id) => (hoveredElement === id ? "#ff5722" : "whitesmoke");

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: "50px" }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", damping: 10, stiffness: 50 }}
      viewport={{ once: true, amount: 0.1 }}
    >
      <article className="portfolio-card">
        <a href={siteLink} target="_blank" rel="noopener noreferrer" aria-label={`Open ${title}`}>
          <div className="image-wrapper">
            <img src={imgSrc} alt={imgAlt} className="portfolio-images" loading="lazy" decoding="async" />
          </div>
        </a>
        <h2>{title}</h2>
        <p className="portfolio-card-description">{description}</p>
        <div className="portfolio-card-actions">
          <span
            className="card-icon"
            onMouseEnter={() => setHoveredElement("open")}
            onMouseLeave={() => setHoveredElement(null)}
          >
            <a href={siteLink} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${title}`}>
              <OpenWindow color={getColor("open")} />
            </a>
          </span>

          {repoLink && (
            <span
              className="card-icon"
              onMouseEnter={() => setHoveredElement("github")}
              onMouseLeave={() => setHoveredElement(null)}
            >
              <a href={repoLink} target="_blank" rel="noopener noreferrer" aria-label={`${title} GitHub repo`}>
                <GitHub color={getColor("github")} />
              </a>
            </span>
          )}
        </div>
      </article>
    </motion.div>
  );
};

export default PortfolioCard;
