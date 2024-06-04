import React, { useEffect, useRef } from "react";
import { FadeComponent } from "./FadeComponent";

import { motion, useAnimation } from "framer-motion";

import valiScreenshot from "../assets/Vali_Screenshot.png";
import dawnRyanScreenshot from "../assets/DawnRyan_Screenshot.png";
import algoScreenshot from "../assets/Algo_Screenshot.png";
import { OpenWindow } from "./ShareIcons/OpenWindow";
import { GitHub } from "./ShareIcons/SocialIcons";

const PortfolioHighlights = () => {
  const controls11 = useAnimation();
  const controls12 = useAnimation();
  const controls13 = useAnimation();

  const ref11 = useRef(null);
  const ref12 = useRef(null);
  const ref13 = useRef(null);

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
          }
        });
      },
      { threshold: 0.1, rootMargin: "-20px 0px -20px 0px" }
    );

    observer.observe(ref11.current);
    observer.observe(ref12.current);
    observer.observe(ref13.current);

    return () => observer.disconnect();
  }, []);

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
    setOutlineSize(valiRef);
    setOutlineSize(dawnRef);
    setOutlineSize(algoRef);
  }, []);
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
                  <a href="https://www.joinvali.com" target="_blank">
                    <OpenWindow style={{ padding: "1rem" }} />
                  </a>
                  <a href="https://github.com/joedelbalzo/kan-th" target="_blank">
                    <GitHub style={{ padding: "1rem" }} />
                  </a>
                </span>
              </div>
              <div className="image-wrapper">
                <img src={valiScreenshot} alt="Screenshot of www.joinvali.com" className="portfolio-images odds" ref={valiRef}></img>
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
                  <a href="https://www.dawngryan.com" target="_blank">
                    <OpenWindow style={{ padding: "1rem" }} />
                  </a>
                  <a href="https://github.com/joedelbalzo/jdb-dr" target="_blank">
                    <GitHub style={{ padding: "1rem" }} />
                  </a>
                </span>
              </div>

              <div className="image-wrapper">
                <img src={dawnRyanScreenshot} alt="Screenshot of www.dawngryan.com" className="portfolio-images evens" ref={dawnRef} />
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
                  <a href="https://algorhythm-joedelbalzo.vercel.app/" target="_blank">
                    <OpenWindow style={{ padding: "1rem" }} />
                  </a>
                  <a href="https://github.com/joedelbalzo/jdb-algo" target="_blank">
                    <GitHub style={{ padding: "1rem" }} />
                  </a>
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
