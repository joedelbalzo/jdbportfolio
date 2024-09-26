import React, { useEffect, useRef } from "react";
import { FadeComponent } from "./FadeComponent";
import { motion, useAnimation } from "framer-motion";
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
  const controls1 = useAnimation();
  const controls2 = useAnimation();
  const controls3 = useAnimation();
  const controls4 = useAnimation();
  const controls5 = useAnimation();
  const controls6 = useAnimation();
  const controls7 = useAnimation();
  const controls8 = useAnimation();
  const controls9 = useAnimation();
  const controls10 = useAnimation();

  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const ref5 = useRef(null);
  const ref6 = useRef(null);
  const ref7 = useRef(null);
  const ref8 = useRef(null);
  const ref9 = useRef(null);
  const ref10 = useRef(null);

  const transition = {
    type: "spring",
    damping: 10,
    stiffness: 50,
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === ref1.current) controls1.start({ opacity: 1, y: 0 });
            if (entry.target === ref2.current) controls2.start({ opacity: 1, y: 0 });
            if (entry.target === ref3.current) controls3.start({ opacity: 1, y: 0 });
            if (entry.target === ref4.current) controls4.start({ opacity: 1, y: 0 });
            if (entry.target === ref5.current) controls5.start({ opacity: 1, y: 0 });
            if (entry.target === ref6.current) controls6.start({ opacity: 1, y: 0 });
            if (entry.target === ref7.current) controls7.start({ opacity: 1, y: 0 });
            if (entry.target === ref8.current) controls8.start({ opacity: 1, y: 0 });
            if (entry.target === ref9.current) controls9.start({ opacity: 1, y: 0 });
            if (entry.target === ref10.current) controls10.start({ opacity: 1, y: 0 });
          }
        });
      },
      { threshold: 0.1, rootMargin: "-20px 0px -20px 0px" }
    );

    observer.observe(ref1.current);
    observer.observe(ref2.current);
    observer.observe(ref3.current);
    observer.observe(ref4.current);
    observer.observe(ref5.current);
    observer.observe(ref6.current);
    observer.observe(ref7.current);
    observer.observe(ref8.current);
    observer.observe(ref9.current);
    observer.observe(ref10.current);

    return () => observer.disconnect();
  }, []);

  return (
    <FadeComponent>
      <div style={{ margin: "2rem auto 5rem auto", color: "whitesmoke" }} id="about-me">
        <motion.div
          ref={ref1}
          initial={{ opacity: 0, y: "50px" }}
          id="about-me-paragraph-container"
          animate={controls1}
          transition={transition}
        >
          <div id="about-me-titles">About Me</div>
        </motion.div>
        <motion.div ref={ref2} initial={{ opacity: 0, y: "50px" }} animate={controls2} transition={transition}>
          <p id="about-me-paragraphs">
            Hello! I'm Joe. I love solving technical problems and creating unique, interesting solutions for my clients.
          </p>
        </motion.div>
        <motion.div ref={ref3} initial={{ opacity: 0, y: "50px" }} animate={controls3} transition={transition}>
          <p id="about-me-paragraphs">
            After over 10 years in the film and television industry as a lighting designer, network architect, and console programmer, I was
            ready to take my love of technology and the visual arts in a different direction.
          </p>
        </motion.div>
        <motion.div ref={ref4} initial={{ opacity: 0, y: "50px" }} animate={controls4} transition={transition}>
          <p id="about-me-paragraphs">
            Today, I'm a front-end specialist at{" "}
            <a href="https://thefutureofagency.com" target="_blank">
              the future of agency
            </a>
            , a marketing firm for books, authors, and publishers. I spend my time crafting custom code solutions that provide our clients
            with highly responsive websites, outstanding SEO, and creative control over their digital marketing applications.
          </p>
        </motion.div>
        <motion.div ref={ref5} initial={{ opacity: 0, y: "50px" }} animate={controls5} transition={transition}>
          <div class="about-me-paragraph-grid-section" id="about-me-paragraphs">
            <p style={{ width: "100%" }}>
              When I'm not coding, you'll find me in the backyard with my wife and three year old son. Chances are we're playing in the
              sandbox or playing hockey in the driveway. I probably have a cold brew (either the upper or the downer, depending on the
              hour!) on the chair, and nowhere in this house is too far from a guitar.
            </p>
            <img src={familyPhoto} alt="photo of Joe Del Balzo and his family" />
          </div>
        </motion.div>
        <motion.div
          ref={ref6}
          initial={{ opacity: 0, y: "50px" }}
          animate={controls6}
          id="about-me-paragraph-container"
          transition={transition}
        >
          <div id="about-me-titles">Languages and Technologies I Love</div>
        </motion.div>
        <motion.div ref={ref7} initial={{ opacity: 0, y: "50px" }} animate={controls7} transition={transition}>
          <p className="devicons">
            <img src={javascript} alt="logo of JavaScript" />
            <img src={typescript} alt="logo of TypeScript" />
            <img src={python} alt="logo of Python" />
          </p>
          <br />
          <p className="devicons">
            <img src={react} alt="logo of React" />
            <img src={express} alt="logo of Express" />
            <img src={nodejs} alt="logo of Node.js" />
            <img src={postgresql} alt="logo of PostgreSQL" />
            <img src={less} alt="logo of less" />
            <img src={css3} alt="logo of CSS" />
            <img src={html5} alt="logo of HTML5" />
          </p>
          <br />
        </motion.div>
        <motion.div
          ref={ref8}
          initial={{ opacity: 0, y: "100px" }}
          animate={controls8}
          id="about-me-paragraph-container"
          transition={transition}
        >
          <div id="about-me-titles">Portfolio Highlights</div>
        </motion.div>
        <PortfolioHighlights />
        <motion.div
          ref={ref9}
          initial={{ opacity: 0, y: "100px" }}
          animate={controls9}
          id="about-me-paragraph-container"
          transition={transition}
        >
          <div id="about-me-titles">Get in Touch</div>
          <p>
            I would love to be in touch! Whether you need something as minimal as bug troubleshooting and maintanence, to something from
            scratch, to something full-time, I'm your guy! <br />
            <br />
            Let's make something cool together.
          </p>
        </motion.div>
        <motion.div
          ref={ref10}
          initial={{ opacity: 0, y: "100px" }}
          animate={controls10}
          id="about-me-paragraph-container"
          transition={transition}
        >
          <Contact />
        </motion.div>
      </div>
    </FadeComponent>
  );
};

export default AboutMe;
