import React, { useEffect, useRef, useState } from "react";
import { FadeComponent } from "./FadeComponent";

import { motion, useAnimation } from "framer-motion";

import valiScreenshot from "../assets/site-screenshots/Vali_Screenshot.webp";
import dawnRyanScreenshot from "../assets/site-screenshots/DawnRyan_Screenshot.webp";
import algoScreenshot from "../assets/site-screenshots/Algo_Screenshot.webp";
import yhgScreenshot from "../assets/site-screenshots/YHG-ss.webp";
import { OpenWindow } from "./ShareIcons/OpenWindow";
import { GitHub } from "./ShareIcons/SocialIcons";

const PortfolioHighlights = () => {
  const [hoveredElement, setHoveredElement] = useState(null);
  const controls11 = useAnimation();
  const controls12 = useAnimation();
  const controls13 = useAnimation();
  const controls14 = useAnimation();

  const ref11 = useRef(null);
  const ref12 = useRef(null);
  const ref13 = useRef(null);
  const ref14 = useRef(null);

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
            if (entry.target === ref11.current) controls11.start({ opacity: 1, y: 0 });
            if (entry.target === ref12.current) controls12.start({ opacity: 1, y: 0 });
            if (entry.target === ref13.current) controls13.start({ opacity: 1, y: 0 });
            if (entry.target === ref14.current) controls14.start({ opacity: 1, y: 0 });
          }
        });
      },
      { threshold: 0.1, rootMargin: "-20px 0px -20px 0px" }
    );

    observer.observe(ref11.current);
    observer.observe(ref12.current);
    observer.observe(ref13.current);
    observer.observe(ref14.current);

    return () => observer.disconnect();
  }, []);

  const yhgRef = useRef(null);
  const valiRef = useRef(null);
  const dawnRef = useRef(null);
  const algoRef = useRef(null);

  const setOutlineSize = (ref) => {
    if (ref.current) {
      const height = ref.current.offsetHeight;
      ref.current.parentNode.style.setProperty("--img-height", `${height}px`);
    }
  };

  useEffect(() => {
    setOutlineSize(yhgRef);
    setOutlineSize(valiRef);
    setOutlineSize(dawnRef);
    setOutlineSize(algoRef);
  }, []);

  const changeColor = (color) => {
    setHoverColor(color);
  };
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
    <FadeComponent>
      <div id="main-portfolio">
        <div id="main-portfolioContainer">
          <motion.div
            ref={ref11}
            initial={{ opacity: 0, y: "50px" }}
            id="about-me-paragraph-container"
            animate={controls11}
            transition={transition}
          >
            <div id="borderdiv">
              <h2>Your Hidden Genius</h2>
              <div className="portfolio-descriptions evens">
                <p>
                  This is a site for the authors of the book <i>Your Hidden Genius</i>, who are clients of mine at the future of agency. I'm
                  particularly proud of my work on this site. It was built on a web design platform that allows the agency to fully transfer
                  the website to the clients at the end of the contract, so it was built with ease-of-use in mind, but also involves the
                  company's first fully embedded full-stack application.
                </p>
                <p>
                  The site has not officially launched, so please feel free to email me if you would like to see more. I would be happy to
                  walk you through a beta version of the designs.
                </p>
                <span className="devicons-open-and-github">
                  <span className="devicons-open-and-github" onMouseEnter={() => handleMouseEnter(1)} onMouseLeave={handleMouseLeave}>
                    <a href="https://www.yourhiddengenius.com" aria-label="a link to yourhiddengenius.com" target="_blank">
                      <OpenWindow style={{ padding: "1rem" }} color={getColor(1)} />
                    </a>
                  </span>
                  <span className="devicons-open-and-github" onMouseEnter={() => handleMouseEnter(2)} onMouseLeave={handleMouseLeave}>
                    <a
                      href="https://github.com/joedelbalzo/yhg-assessment"
                      aria-label="a link to this project's GitHub Repository"
                      target="_blank"
                    >
                      <GitHub style={{ padding: "1rem" }} color={getColor(2)} />
                    </a>
                  </span>
                </span>
              </div>
              <div className="image-wrapper">
                <img src={yhgScreenshot} alt="Screenshot of www.yourhiddengenius.com" className="portfolio-images evens" ref={yhgRef}></img>
              </div>
            </div>
          </motion.div>
          <motion.div
            ref={ref12}
            initial={{ opacity: 0, y: "50px" }}
            id="about-me-paragraph-container"
            animate={controls12}
            transition={transition}
          >
            <div id="borderdiv">
              <h2>Vali</h2>
              <div className="portfolio-descriptions odds">
                <p>
                  Vali is an MVP-level startup aimed at small and medium business owners who typically aren't aware of their business'
                  actual valuation. As the principal and founding engineer, I attempted to create a clean but soft, visually impressive and
                  inviting website to make owners feel like they're comfortable and can get the information their business needs to
                  progress!
                </p>
                <p>
                  The site's password is createdbyJDB and you can peruse a rough beta version of the admin dashboard with the username admin
                  and I'll happily email you back the password.
                </p>
                <span className="devicons-open-and-github">
                  <span className="devicons-open-and-github" onMouseEnter={() => handleMouseEnter(3)} onMouseLeave={handleMouseLeave}>
                    <a href="https://www.joinvali.com" aria-label="a link to this project" target="_blank">
                      <OpenWindow style={{ padding: "1rem" }} color={getColor(3)} />
                    </a>
                  </span>
                  <span className="devicons-open-and-github" onMouseEnter={() => handleMouseEnter(4)} onMouseLeave={handleMouseLeave}>
                    <a href="https://github.com/joedelbalzo/kan-th" aria-label="a link to this project's GitHub Repository" target="_blank">
                      <GitHub style={{ padding: "1rem" }} color={getColor(4)} />
                    </a>
                  </span>
                </span>
              </div>
              <div className="image-wrapper">
                <img src={valiScreenshot} alt="Screenshot of www.joinvali.com" className="portfolio-images odds" ref={valiRef}></img>
              </div>
            </div>
          </motion.div>
          <motion.div
            ref={ref13}
            initial={{ opacity: 0, y: "50px" }}
            id="about-me-paragraph-container"
            animate={controls13}
            transition={transition}
          >
            <div id="borderdiv">
              <h2>Dawn Ryan</h2>
              <div className="portfolio-descriptions evens">
                <p>
                  This is a portfolio and services website for freelance copyeditor and proofreader Dawn Ryan. She's a long-time
                  professional in the publishing industry, and wanted specifically to highlight not only the work she's accomplished, but
                  the variety of services she can offer. I explored many new technologies when developing this website to accomplish the
                  desires of my client, specifically Framer Motion. I love exploring new technologies, and will continue to do so as a
                  client's needs change!
                </p>
                <span className="devicons-open-and-github">
                  <span className="devicons-open-and-github" onMouseEnter={() => handleMouseEnter(5)} onMouseLeave={handleMouseLeave}>
                    <a href="https://www.dawngryan.com" aria-label="a link to this project" target="_blank">
                      <OpenWindow style={{ padding: "1rem" }} color={getColor(5)} />
                    </a>
                  </span>
                  <span className="devicons-open-and-github" onMouseEnter={() => handleMouseEnter(6)} onMouseLeave={handleMouseLeave}>
                    <a href="https://github.com/joedelbalzo/jdb-dr" aria-label="a link to this project's GitHub Repository" target="_blank">
                      <GitHub style={{ padding: "1rem" }} color={getColor(6)} />
                    </a>
                  </span>
                </span>
              </div>

              <div className="image-wrapper">
                <img src={dawnRyanScreenshot} alt="Screenshot of www.dawngryan.com" className="portfolio-images evens" ref={dawnRef} />
              </div>
            </div>
          </motion.div>
          <motion.div
            ref={ref14}
            initial={{ opacity: 0, y: "50px" }}
            id="about-me-paragraph-container"
            animate={controls14}
            transition={transition}
          >
            <div id="borderdiv">
              <h2>AlgoRhythm</h2>
              <div className="portfolio-descriptions odds">
                <p>
                  This application is a Multiple Choice study-guide for Algorhithms, Data Structures, and basic questions about popular
                  languages like JavaScript and Python as well as popular frameworks like React and NodeJs. At the moment, it's only
                  Multiple Choice. I've written the JS coderunner, but I'm hoping to implement a Python coderunner as well before launching
                  that page. The goal is to eventually incorporate Oauth so a user can share data between devices (which will eventually
                  also include iOS and Android devices!) and user-selected categories.
                </p>
                <span className="devicons-open-and-github">
                  <span className="devicons-open-and-github" onMouseEnter={() => handleMouseEnter(7)} onMouseLeave={handleMouseLeave}>
                    <a href="https://algorhythm-joedelbalzo.vercel.app/" aria-label="a link to this project" target="_blank">
                      <OpenWindow style={{ padding: "1rem" }} color={getColor(7)} />
                    </a>
                  </span>

                  <span className="devicons-open-and-github" onMouseEnter={() => handleMouseEnter(8)} onMouseLeave={handleMouseLeave}>
                    <a
                      href="https://github.com/joedelbalzo/jdb-algo"
                      aria-label="a link to this project's GitHub Repository"
                      target="_blank"
                    >
                      <GitHub style={{ padding: "1rem" }} color={getColor(8)} />
                    </a>
                  </span>
                </span>
              </div>

              <div className="image-wrapper">
                <img src={algoScreenshot} alt="Screenshot of AlgoRhythym" className="portfolio-images odds" ref={algoRef} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </FadeComponent>
  );
};

export default PortfolioHighlights;
