import React from "react";
import { FadeComponent } from "./FadeComponent";

const Resume = () => {
  return (
    <FadeComponent>
      <>
        <div className="resume-header">
          <h1>Resume</h1>
          {/* <h2>Software Engineer</h2> */}
          <h3>
            jdelbalzo99@gmail.com <br />
            {/* <br /> */}
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
              JavaScript, TypeScript, Python, React, Redux, Node, Express, PostgreSQL, Sequelize, Axios, Mocha, Jest <br /> <br />
              <strong>Practices, Methodologies, & Technologies: </strong>
              <br />
              <br />
              RESTful API, Test Driven Development, Git Version Control, Agile (Scrum), AWS S3, Shopify, Squarespace, Google OAuth2.0,
              Google Analytics, and Google APIs
            </p>
          </div>
          <div id="borderdiv">
            <h2>Work Experience</h2>
            <h3 style={{ marginBottom: "10px" }}>
              The Future of Agency &mdash;{" "}
              <a href="https://www.thefutureofagency.com/" style={{}}>
                thefutureofagency.com
              </a>
            </h3>

            <h3 style={{ margin: "4px auto 4px 0", fontWeight: "300", fontSize: "smaller" }}>
              A marketing agency in the book publishing industry.
            </h3>
            <h3 style={{ margin: "4px auto 4px 0", fontWeight: "300", fontSize: "smaller" }}>
              <i>Software Engineer, October 2023 – Present</i>
            </h3>
            <ul>
              <li>Leading the development and management of web applications to market and advertise books.</li>
              <li>
                Collaborating with clients to enhance design and SEO, increasing unique visitor and Google Search traffic by over 400%.
              </li>
              <li>
                Engineering and integrating full-stack applications using React.js, Node.js, and RESTful APIs to provide our clients more
                tailored solutions, enhancing client satisfaction and retention.
              </li>
              <li>
                Improving UI/UX and accessibility on our portfolio of client websites using CSS and JavaScript, enhancing user engagement.
              </li>
              <li>
                Optimizing DNS configurations and email systems, ensuring reliable communication for client mailing lists upwards of 50,000
                subscribers.
              </li>
              <li>
                Implementing company-wide version control for custom designs in Squarespace and Shopify by maintaining a comprehensive
                version history on GitHub, reducing downtime by 70%.
              </li>
            </ul>
            <h3 style={{ marginBottom: "10px" }}>
              Vali &mdash;{" "}
              <a href="https://www.joinvali.com/" style={{}}>
                joinvali.com
              </a>
            </h3>
            <h3 style={{ margin: "4px auto 4px 0", fontWeight: "300", fontSize: "smaller" }}>
              MVP-stage startup in the financial spectrum.
            </h3>
            <h3 style={{ margin: "4px auto 4px 0", fontWeight: "300", fontSize: "smaller" }}>
              <i>Full Stack Engineer, July 2023 – November 2023 (Contract)</i>
            </h3>
            <ul>
              <li>
                Led the design, architecture, and development of a full stack application of an MVP-stage startup for small business
                financial valuations to accelerate startup growth.
              </li>
              <li>Integrated AWS S3, streamlining content management and upload processes.</li>
              <li>Leveraged Framer Motion to develop a fluid and responsive user interface, enhancing user experience.</li>
              <li>Tech Used: React, React-Redux, Node.js, Express, PostgreSQL, AWS S3, Google OAuth2.0</li>
            </ul>
            <h3 style={{ marginBottom: "10px" }}>Entertainment Partners & Cast and Crew</h3>
            <h3 style={{ margin: "4px auto 4px 0", fontWeight: "300", fontSize: "smaller" }}>
              Notable productions: John Wick 3, East New York (CBS), Bull (CBS), and Ray Donovan: The Movie.
            </h3>
            <h3 style={{ margin: "4px auto 4px 0", fontWeight: "300", fontSize: "smaller" }}>
              <i>Lighting Console Programmer and Designer, March 2018 – April 2023</i>
            </h3>
            <ul>
              <li>Programmed lighting consoles and built data networks for film and television.</li>
              <li>
                Transitioned film and TV sets from outdated incandescent systems to modern LED lighting, cutting project times by 17% and
                boosting energy efficiency by 30%.
              </li>
              <li>Coordinated new tech installations, optimizing performance and saving over 75 person-hours weekly.</li>
            </ul>
          </div>
          <div id="borderdiv">
            <h2>Freelance and Open Source Projects </h2>
            <h3 style={{ marginBottom: "10px" }}>
              Dawn Ryan, Freelancer &mdash; <a href="https://www.dawngryan.com/">dawngryan.com</a>
            </h3>
            <div style={{ fontSize: "calc(8px + 1vw)", lineHeight: "1rem", fontStyle: "italic" }}>Front-End Engineer</div>
            <ul>
              <li>Designed and developed a portfolio and advertising website for a client freelance writer and copy-editor.</li>
              <li>Utilized React, React-Router, and Framer Motion to allow for a seamless user experience.</li>
              <li>Implemented Formspree’s library of front-end forms for end-user and client communication.</li>
            </ul>
            <h3 style={{ marginBottom: "10px" }}>
              “AlgoRhythm” &mdash; <a href="https://algorhythm-joedelbalzo.vercel.app/">algorhythm-joedelbalzo.vercel.app</a>
            </h3>
            <div style={{ fontSize: "calc(8px + 1vw)", lineHeight: "1rem", fontStyle: "italic" }}>Full Stack Engineer</div>
            <ul>
              <li>
                Developed a quiz-style application designed to improve a user’s knowledge of common algorithms and solving styles and
                patterns in JavaScript and Python.
              </li>
              <li>Built a rich database with hundreds of quiz questions delivered to the front-end via Axios API fetches.</li>
            </ul>
            <h3>
              “Drop of CSS” &mdash; <a href="./dropofcss">./dropofcss</a>
            </h3>
            <div style={{ fontSize: "calc(8px + 1vw)", lineHeight: "1rem", fontStyle: "italic" }}>
              Front-End Developer || React, React-Redux, Node.js, Express, PostgreSQL
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
            <h3 style={{ marginTop: "4rem" }}>
              “Open Places” &mdash; <a href="./openplaces/login">./openplaces/login</a>
            </h3>
            <div style={{ fontSize: "calc(8px + 1vw)", lineHeight: "1rem", fontStyle: "italic" }}>Full Stack Engineer</div>
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
            <h3 style={{ marginTop: "4rem" }}>
              E-Commerce “A Script for Java” &mdash; <a href="./scriptforjava">./scriptforjava</a>
            </h3>
            <div style={{ fontSize: "calc(8px + 1vw)", lineHeight: "1rem", fontStyle: "italic" }}>Full Stack Engineer</div>
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
