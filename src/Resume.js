import React from "react";
import { FadeComponent } from "./FadeComponent";

const Resume = () => {
  return (
    <FadeComponent>
      <>
        <h1>
          <span id="main-name" style={{ fontSize: "calc(14px + 2vw)" }}>
            Resume
          </span>
        </h1>
        <h3 style={{ fontSize: "calc(14px + 1vw)" }}>Full Stack Software Engineer</h3>
        <h3 style={{ fontSize: "calc(14px + 1vw)", alignItems: "center" }}>
          240-441-7689
          <br />
          jdelbalzo99@gmail.com <br />
          New York, NY
        </h3>

        <div id="main-resume">
          <div id="borderdiv">
            <h2>
              <span id="main-name" style={{ fontSize: "calc(14px + 1vw)", color: "white" }}>
                Skills
              </span>
            </h2>

            <p>
              <strong>Languages, Frameworks, & Databases: </strong> JavaScript (ES6+), Typescript, Python, React, Redux, Node.js, Express,
              Django, PostgreSQL, Sequelize, Axios, Mocha, Jest, Material UI, Framer Motion <br />
              <strong>Practices, Methodologies, & Technologies: </strong>
              RESTful API, Test Driven Development, Git Version Control, Agile (Scrum), AWS S3, Google OAuth2.0 and APIs, Shopify,
              Squarespace, Google Analytics
            </p>
          </div>
          <div id="borderdiv">
            <h2>
              <span id="main-name" style={{ fontSize: "calc(14px + 1vw)", color: "white" }}>
                Professional Experience
              </span>
            </h2>
            <h3 style={{ marginBottom: 0 }}>the future of agency, LLC</h3>
            <a href="https://www.thefutureofagency.com/" style={{ color: "whitesmoke", fontSize: "smaller" }}>
              https://www.thefutureofagency.com/
            </a>
            <h3 style={{ marginTop: 0 }}>Lead Software Engineer</h3>
            <ul>
              <li style={{ paddingBottom: "2vh", fontSize: "calc(10px + 1vw)" }}>
                Developing and managing web applications designed to market books and authors.
              </li>
              <li style={{ paddingBottom: "2vh", fontSize: "calc(10px + 1vw)" }}>
                Enhancing SEO for previously developed sites, increasing unique visitors 24% and sale conversion rates tripling.
              </li>
            </ul>
            <h3 style={{ marginBottom: 0 }}>Vali</h3>
            <a href="https://asitenamedkaasisindev.onrender.com/" style={{ color: "whitesmoke", fontSize: "smaller" }}>
              https://asitenamedkaasisindev.onrender.com/
            </a>
            <h3 style={{ marginTop: 0 }}>Founding Software Engineer</h3>
            <ul>
              <li style={{ paddingBottom: "2vh", fontSize: "calc(10px + 1vw)" }}>
                Designer, architect of an MVP-stage startup, increasing valuation accuracy for small businesses.
              </li>
              <li style={{ paddingBottom: "2vh", fontSize: "calc(10px + 1vw)" }}>
                Implemented AWS S3 and Google OAuth2.0 to increase privacy for data uploads and user sessions.
              </li>
              <li style={{ paddingBottom: "2vh", fontSize: "calc(10px + 1vw)" }}>
                Tech Used: React, React-Redux, Node.js, Express, PostgreSQL, AWS S3, Google OAuth2.0
              </li>
            </ul>
            <h3 style={{ marginBottom: 0 }}>Entertainment Partners & Cast and Crew</h3>
            <h3 style={{ marginTop: 0 }}>Console Programmer and Designer</h3>
            <ul>
              <li style={{ paddingBottom: "2vh", fontSize: "calc(10px + 1vw)" }}>
                Programming lighting consoles and build robust data networks for film and television productions.
              </li>
              <li style={{ paddingBottom: "2vh", fontSize: "calc(10px + 1vw)" }}>
                Leading productions from antiquated lighting into modern, LED lighting, with huge increases in efficiency. Individual
                projects were completed 17% more quickly and energy efficiency increased 30%.
              </li>
              <li style={{ paddingBottom: "2vh", fontSize: "calc(10px + 1vw)" }}>
                Communicating regularly in teams of 10 to 15 technicians as well as with high-profile clients and executive producers to
                efficiently purchase and implement newer lighting technologies, faster networks (both wired and wireless), and deliver
                critical software and hardware updates to optimize performance and reliability.
              </li>
              <li style={{ paddingBottom: "2vh", fontSize: "calc(10px + 1vw)" }}>
                Notable productions: John Wick 3, East New York Season 1, Bull Seasons 4-6, and Ray Donovan: The Movie.
              </li>
            </ul>
          </div>
          <div id="borderdiv">
            <h2>
              <span id="main-name" style={{ fontSize: "calc(14px + 1vw)", color: "white" }}>
                Freelance and Open Source Projects{" "}
              </span>
            </h2>
            <h3>“dawngryan.com”</h3>
            <div style={{ fontSize: "calc(8px + 1vw)", lineHeight: "1rem", fontStyle: "italic" }}>
              Front-end Designer and Developer || React, React-Redux, Node.js, Express
            </div>
            <ul>
              <li style={{ paddingBottom: "2vh", fontSize: "calc(10px + 1vw)" }}>
                Designed and developed a portfolio and advertising website for a client freelance writer and copy-editor.
              </li>
              <li style={{ paddingBottom: "2vh", fontSize: "calc(10px + 1vw)" }}>
                Utilized React, React-Router, and Framer Motion to allow for a seamless user experience.
              </li>
              <li style={{ paddingBottom: "2vh", fontSize: "calc(10px + 1vw)" }}>
                Implemented Formspree’s library of front-end forms for end-user and client communication.
              </li>
            </ul>
            <h3>“Drop of CSS”</h3>
            <div style={{ fontSize: "calc(8px + 1vw)", lineHeight: "1rem", fontStyle: "italic" }}>
              Front-end Designer and Developer || React, React-Redux, Node.js, Express, PostgreSQL
            </div>
            <ul>
              <li style={{ paddingBottom: "2vh", fontSize: "calc(10px + 1vw)" }}>
                Led the building of a developer tool that allows developers to select and apply colors to pre-built design elements (forms,
                buttons, product cards) and then download the front-end code.
              </li>
              <li style={{ paddingBottom: "2vh", fontSize: "calc(10px + 1vw)" }}>
                Leveraged React-Redux’s state management to move data swiftly through front-end React components as well as calling custom
                Color Palette generating APIs through Axios and Express.
              </li>
              <li style={{ paddingBottom: "2vh", fontSize: "calc(10px + 1vw)" }}>
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
              <li style={{ paddingBottom: "2vh", fontSize: "calc(10px + 1vw)" }}>
                Developed a quiz-style application designed to improve a user’s knowledge of common algorithms and solving styles and
                patterns in JavaScript and Python.
              </li>

              <li style={{ paddingBottom: "2vh", fontSize: "calc(10px + 1vw)" }}>
                Built a rich database with hundreds of quiz questions delivered to the front-end via Axios API fetches.
              </li>
            </ul>
            <h3 style={{ marginTop: "4rem" }}>“Open Places”</h3>
            <div style={{ fontSize: "calc(8px + 1vw)", lineHeight: "1rem", fontStyle: "italic" }}>
              Front-end Designer and Developer || React, React-Redux, Node.js, Express, PostgreSQL
            </div>
            <ul>
              <li style={{ paddingBottom: "2vh", fontSize: "calc(10px + 1vw)" }}>
                Developed a location-based map search application utilizing the Google Places API, React, and Material-UI to ensure
                consistent and responsive UI/UX designs for users across multiple device types.
              </li>
              <li style={{ paddingBottom: "2vh", fontSize: "calc(10px + 1vw)" }}>
                Designed a custom testing mechanism API that queries a PostgreSQL database of similar Google Places API object responses,
                eliminating API costs while in development.
              </li>
            </ul>
            <h3 style={{ marginTop: "4rem" }}>E-Commerce “A Script for Java”</h3>
            <div style={{ fontSize: "calc(8px + 1vw)", lineHeight: "1rem", fontStyle: "italic" }}>
              Front-end Designer and Developer || React, React-Redux, Node.js, Express, PostgreSQL
            </div>
            <ul>
              <li style={{ paddingBottom: "2vh", fontSize: "calc(10px + 1vw)" }}>
                Designed and built an e-commerce template for small chains of cafes.
              </li>
              <li style={{ paddingBottom: "2vh", fontSize: "calc(10px + 1vw)" }}>
                Built administrative tools, authorizing a cafe manager full CRUD capabilities.
              </li>
            </ul>
          </div>

          <div id="borderdiv">
            <h2>
              <span id="main-name" style={{ fontSize: "calc(14px + 1vw)", color: "white" }}>
                Education
              </span>
            </h2>
            <p>
              Fullstack Academy Web Development Bootcamp | June 2023
              <br />
              <li> Software Engineering Certificate</li>
              <li>Full-time, Full Stack Javascript Web Development Immersive</li>
            </p>

            <p>
              New York University, Tisch School of the Arts | May 2011
              <li>Bachelor of Fine Arts, Film and Television</li>
            </p>
          </div>
        </div>
      </>
    </FadeComponent>
  );
};

export default Resume;
