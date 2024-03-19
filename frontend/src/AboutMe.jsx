import React, { useEffect, useRef } from "react";
import { FadeComponent } from "./FadeComponent";
import { motion, useAnimation } from "framer-motion";
import { useWindowSize } from "@react-hook/window-size";

const AboutMe = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        delayChildren: 1,
        staggerChildren: 0.4,
      },
    },
  };

  const child = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        duration: 1.8,
      },
    },
  };

  const controls = useAnimation();
  const controls1 = useAnimation();
  const controls2 = useAnimation();
  const controls3 = useAnimation();
  const controls4 = useAnimation();
  // const controls5 = useAnimation();
  const [width] = useWindowSize();

  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  // const ref5 = useRef(null);

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
            // if (entry.target === ref5.current) controls5.start({ opacity: 1, y: 0 });
          }
        });
      },
      { threshold: 0.1, rootMargin: "-20px 0px -20px 0px" }
    );

    observer.observe(ref1.current);
    observer.observe(ref2.current);
    observer.observe(ref3.current);
    observer.observe(ref4.current);
    // observer.observe(ref5.current);

    return () => observer.disconnect();
  }, []);

  return (
    <FadeComponent>
      <div style={{ margin: "2rem auto", color: "whitesmoke" }}>
        <motion.div ref={ref1} initial={{ opacity: 0, y: "50px" }} animate={controls1} transition={transition}>
          <div style={{ color: "whitesmoke", textAlign: "left" }} id="about-me">
            About Me
          </div>
        </motion.div>
        <motion.div ref={ref2} initial={{ opacity: 0, y: "50px" }} animate={controls2} transition={transition}>
          <p style={{ color: "whitesmoke", textAlign: "left" }} id="about-me">
            Hello! After nearly 15 years in the film and television industry as a lighting designer, network designer, and console
            programmer, I was ready to take my love of technology and the visual arts in a different direction.
          </p>
        </motion.div>
        <motion.div ref={ref3} initial={{ opacity: 0, y: "50px" }} animate={controls3} transition={transition}>
          <div style={{ color: "whitesmoke", textAlign: "left" }} id="about-me">
            Languages and Technologies I Love:
          </div>
        </motion.div>
        <motion.div ref={ref4} initial={{ opacity: 0, y: "50px" }} animate={controls4} transition={transition}>
          <p className="devicons">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" />{" "}
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" />{" "}
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" />{" "}
          </p>
          <p className="devicons">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original-wordmark.svg" />{" "}
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg"
              style={{ backgroundColor: "rgba(230,230,230,.8)" }}
            />{" "}
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" />{" "}
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" />{" "}
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" />{" "}
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/less/less-plain-wordmark.svg" />
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" />
          </p>
        </motion.div>
      </div>
    </FadeComponent>
  );
};

export default AboutMe;
