import React from "react";
import { FadeComponent } from "./FadeComponent";

const Resume = () => {
  return (
    <FadeComponent>
      <>
        <div className="resume-header">
          <h1>Joseph Del Balzo</h1>
          {/* <h2>Software Engineer</h2> */}
          <h3>
            jdelbalzo99@gmail.com <br />
            240-441-7689
            <br />
            Beacon, NY
          </h3>
        </div>
        <div id="main-resume">
          <div id="borderdiv">
            <h2>Skills</h2>

            <p>
              <strong>Languages, Frameworks, & Databases: </strong>
              <br />
              <br />
              JavaScript (ES6+), Typescript, Python, React, Redux, Node.js, Express, Django, PostgreSQL, Sequelize, Axios, Mocha, Jest,
              Material UI, Framer Motion <br /> <br />
              <strong>Practices, Methodologies, & Technologies: </strong>
              <br />
              <br />
              RESTful API, Test Driven Development, Git Version Control, Agile (Scrum), AWS S3, Google OAuth2.0 and APIs, Shopify,
              Squarespace, Google Analytics
            </p>
          </div>
          <div id="borderdiv">
            <h2>Work Experience</h2>
            <h3 style={{ marginBottom: "10px" }}>the future of agency, LLC</h3>
            <a href="https://www.thefutureofagency.com/">https://www.thefutureofagency.com/</a>
            <h3 style={{ marginTop: "10px" }}>Software Engineer</h3>
            <ul>
              <li>Leading the development and management of web applications to market and advertise books.</li>
              <li>
                Collaborating with clients to enhance design and SEO performance, substantially improving unique visitor traffic and Google
                Search traffic across our portfolio over 400%.
              </li>
              <li>
                Engineering and embedding custom full-stack applications on client-side web development platforms, utilizing technologies
                such as React.js, Node.js, RESTful APIs, reCAPTCHA, to provide our clients more tailored solutions, contributing to enhanced
                client satisfaction and retention.
              </li>
              <li>
                Enhancing UI/UX and accessibility with CSS and JavaScript on websites like{" "}
                <a href="https://www.melodybeattie.com/">melodybeattie.com</a>,{" "}
                <a href="https://www.benjaminherold.com/">benjaminherold.com</a>, and{" "}
                <a href="https://www.umanaidoomd.com/">umanaidoomd.com</a>.
              </li>
              <li>
                Optimizing DNS configurations and email delivery systems, ensuring robust and reliable communication for mailing lists up to
                50,000 subscribers.
              </li>
              <li>
                Implementing company-wide version control for custom designs in Squarespace and Shopify by maintaining a comprehensive
                version history on GitHub, minimizing down time by 70% with easy code recoverability, smoother updates, and troubleshooting.
              </li>
            </ul>
            <h3 style={{ marginBottom: "10px" }}>Vali</h3>
            <a href="https://www.joinvali.com/">https://www.joinvali.com/</a>
            <h3 style={{ marginTop: "10px" }}>Founding Software Engineer</h3>
            <ul>
              <li>Designer, architect of an MVP-stage startup, increasing valuation accuracy for small businesses.</li>
              <li>Implemented AWS S3 and Google OAuth2.0 to increase privacy for data uploads and user sessions.</li>
              <li>Tech Used: React, React-Redux, Node.js, Express, PostgreSQL, AWS S3, Google OAuth2.0</li>
            </ul>
            <h3 style={{ marginBottom: "10px" }}>Entertainment Partners & Cast and Crew</h3>
            <h3 style={{ marginTop: "10px" }}>Console Programmer and Designer</h3>
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
            {/* <p>
              Fullstack Academy || June 2023
              <br />
              <li> Certificate in Software Engineering, Web Development, and Computer Science</li>
            </p> */}

            <p>
              New York University, Tisch School of the Arts
              <li>Bachelor of Fine Arts, Film and Television</li>
            </p>
          </div>
        </div>
      </>
    </FadeComponent>
  );
};

export default Resume;
