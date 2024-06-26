import React from "react";
import { FadeComponent } from "./FadeComponent";

const Resume = () => {
  return (
    <FadeComponent>
      <>
        <div className="resume-header">
          <h1>Resume</h1>
          <h2>
            240-441-7689
            <br />
            jdelbalzo99@gmail.com <br />
            Beacon, NY
          </h2>
        </div>
        <div id="main-resume">
          <div id="borderdiv">
            <h2>Skills</h2>

            <p>
              <strong>Languages, Frameworks, & Databases: </strong>
              <br /> JavaScript (ES6+), Typescript, Python, React, Redux, Node.js, Express, Django, PostgreSQL, Sequelize, Axios, Mocha,
              Jest, Material UI, Framer Motion <br /> <br />
              <strong>Practices, Methodologies, & Technologies: </strong> <br />
              RESTful API, Test Driven Development, Git Version Control, Agile (Scrum), AWS S3, Google OAuth2.0 and APIs, Shopify,
              Squarespace, Google Analytics
            </p>
          </div>
          <div id="borderdiv">
            <h2>Professional Experience</h2>
            <h3 style={{ marginBottom: 0 }}>the future of agency, LLC</h3>
            <a href="https://www.thefutureofagency.com/">https://www.thefutureofagency.com/</a>
            <h3 style={{ marginTop: 0 }}>Software Engineer</h3>
            <ul>
              <li>Developing and managing web applications designed to market and advertise authors.</li>
              <li>Collaborating directly with clients to improve design, troubleshoot bugs, and improve SEO. </li>
              <li>
                Creating CSS and JavaScript enhancements to improve UI/UX and visual responsiveness, notably on{" "}
                <a href="https://www.melodybeattie.com/">melodybeattie.com</a>,{" "}
                <a href="https://www.benjaminherold.com/">benjaminherold.com</a>, and{" "}
                <a href="https://www.umanaidoomd.com/">umanaidoomd.com</a>.
              </li>
              <li>
                Managing DNS configurations and optimizing email delivery system infrastructure, ensuring robust and scalable communication
                for mailing lists ranging from 50 to over 49,000 subscribers.
              </li>
              <li>
                Leading SEO enhancements on all of our sites, leading to increases in unique visitors by 400-600% and a 550% surge in visits
                from Google Search-derived traffic across our whole portfolio.
              </li>
              <li>
                Developing the company's inaugural portfolio-wide PostgreSQL database and Express.js server, enabling unique client-specific
                configurations including dedicated user authorization, API secrets, and expandable custom features.
              </li>
              <li>
                Implementing version control for custom Squarespace and Shopify code by maintaining a comprehensive history of changes on
                GitHub, ensuring code recoverability and facilitating smoother updates and troubleshooting.
              </li>
            </ul>
            <h3 style={{ marginBottom: 0 }}>Vali</h3>
            <a href="https://www.joinvali.com/">https://www.joinvali.com/</a>
            <h3 style={{ marginTop: 0 }}>Founding Software Engineer</h3>
            <ul>
              <li>Designer, architect of an MVP-stage startup, increasing valuation accuracy for small businesses.</li>
              <li>Implemented AWS S3 and Google OAuth2.0 to increase privacy for data uploads and user sessions.</li>
              <li>Tech Used: React, React-Redux, Node.js, Express, PostgreSQL, AWS S3, Google OAuth2.0</li>
            </ul>
            <h3 style={{ marginBottom: 0 }}>Entertainment Partners & Cast and Crew</h3>
            <h3 style={{ marginTop: 0 }}>Console Programmer and Designer</h3>
            <ul>
              <li>Programming lighting consoles and build robust data networks for film and television productions.</li>
              <li>
                Leading productions from antiquated lighting into modern, LED lighting, with huge increases in efficiency. Individual
                projects were completed 17% more quickly and energy efficiency increased 30%.
              </li>
              <li>
                Communicating regularly in teams of 10 to 15 technicians as well as with high-profile clients and executive producers to
                efficiently purchase and implement newer lighting technologies, faster networks (both wired and wireless), and deliver
                critical software and hardware updates to optimize performance and reliability.
              </li>
              <li>Notable productions: John Wick 3, East New York Season 1, Bull Seasons 4-6, and Ray Donovan: The Movie.</li>
            </ul>
          </div>
          <div id="borderdiv">
            <h2>Freelance and Open Source Projects </h2>
            <h3>Dawn Ryan, Freelancer</h3>
            <a href="https://www.dawngryan.com/">https://www.dawngryan.com/</a>
            <div style={{ fontSize: "calc(8px + 1vw)", lineHeight: "1rem", fontStyle: "italic" }}>
              Front-end Designer and Developer || React, React-Redux, Node.js, Express
            </div>
            <ul>
              <li>Designed and developed a portfolio and advertising website for a client freelance writer and copy-editor.</li>
              <li>Utilized React, React-Router, and Framer Motion to allow for a seamless user experience.</li>
              <li>Implemented Formspree’s library of front-end forms for end-user and client communication.</li>
            </ul>
            <h3>“Drop of CSS”</h3>
            <div style={{ fontSize: "calc(8px + 1vw)", lineHeight: "1rem", fontStyle: "italic" }}>
              Front-end Designer and Developer || React, React-Redux, Node.js, Express, PostgreSQL
            </div>
            <ul>
              <li>
                Led the building of a developer tool that allows developers to select and apply colors to pre-built design elements (forms,
                buttons, product cards) and then download the front-end code.
              </li>
              <li>
                Leveraged React-Redux’s state management to move data swiftly through front-end React components as well as calling custom
                Color Palette generating APIs through Axios and Express.
              </li>
              <li>
                Performed comprehensive audits of both front-end and back-end codebases, resulting in improved coding standards and style
                guides for enhanced codebase consistency and maintainability.
              </li>
            </ul>
            <h3 style={{ marginTop: "4rem" }}>“AlgoRhythm”</h3>
            <div style={{ fontSize: "calc(8px + 1vw)", lineHeight: "1rem", fontStyle: "italic" }}>
              Front-end Designer and Developer || Next.js, Node.js, Express, PostgreSQL
            </div>
            Quiz application for JavaScript and Python algorithm studying.
            <ul>
              <li>
                Developed a quiz-style application designed to improve a user’s knowledge of common algorithms and solving styles and
                patterns in JavaScript and Python.
              </li>

              <li>Built a rich database with hundreds of quiz questions delivered to the front-end via Axios API fetches.</li>
            </ul>
            <h3 style={{ marginTop: "4rem" }}>“Open Places”</h3>
            <div style={{ fontSize: "calc(8px + 1vw)", lineHeight: "1rem", fontStyle: "italic" }}>
              Front-end Designer and Developer || React, React-Redux, Node.js, Express, PostgreSQL
            </div>
            <ul>
              <li>
                Developed a location-based map search application utilizing the Google Places API, React, and Material-UI to ensure
                consistent and responsive UI/UX designs for users across multiple device types.
              </li>
              <li>
                Designed a custom testing mechanism API that queries a PostgreSQL database of similar Google Places API object responses,
                eliminating API costs while in development.
              </li>
            </ul>
            <h3 style={{ marginTop: "4rem" }}>E-Commerce “A Script for Java”</h3>
            <div style={{ fontSize: "calc(8px + 1vw)", lineHeight: "1rem", fontStyle: "italic" }}>
              Front-end Designer and Developer || React, React-Redux, Node.js, Express, PostgreSQL
            </div>
            <ul>
              <li>Designed and built an e-commerce template for small chains of cafes.</li>
              <li>Built administrative tools, authorizing a cafe manager full CRUD capabilities.</li>
            </ul>
          </div>

          <div id="borderdiv">
            <h2>Education</h2>
            <p>
              Fullstack Academy || June 2023
              <br />
              <li> Certificate in Software Engineering, Web Development, and Computer Science</li>
            </p>

            <p>
              New York University, Tisch School of the Arts || May 2011
              <li>Bachelor of Fine Arts, Film and Television</li>
            </p>
          </div>
        </div>
      </>
    </FadeComponent>
  );
};

export default Resume;
