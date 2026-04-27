import React from "react";
import { FadeComponent } from "./FadeComponent";

const Job = ({ company, link, blurb, role, children }) => (
  <div className="resume-job">
    <h3 className="resume-company">
      {company}
      {link && (
        <>
          {" — "}
          <a href={link} target="_blank" rel="noreferrer noopener">
            {link.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
          </a>
        </>
      )}
    </h3>
    {blurb && <p className="resume-blurb">{blurb}</p>}
    <p className="resume-tenure">
      <i>{role}</i>
    </p>
    <ul>{children}</ul>
  </div>
);

const Project = ({ title, link, role, children }) => (
  <div className="resume-job">
    <h3 className="resume-company">
      {title}
      {link && (
        <>
          {" — "}
          <a href={link} target="_blank" rel="noreferrer noopener">
            {link.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
          </a>
        </>
      )}
    </h3>
    <p className="resume-tenure">
      <i>{role}</i>
    </p>
    <ul>{children}</ul>
  </div>
);

const Resume = () => {
  return (
    <FadeComponent>
      <>
        <div className="resume-header">
          <h1>Resume</h1>
          <address className="resume-contact">
            jdelbalzo99@gmail.com
            <br />
            Beacon, NY
          </address>
        </div>
        <div id="main-resume">
          <section id="borderdiv">
            <h2>Skills</h2>
            <p>
              <strong>Languages, Frameworks, &amp; Databases:</strong>
              <br />
              JavaScript, TypeScript, Python, React, Redux, Node, Express, PostgreSQL, Sequelize, Axios, Mocha, Jest
            </p>
            <p>
              <strong>Practices, Methodologies, &amp; Technologies:</strong>
              <br />
              RESTful API, Test Driven Development, Git Version Control, Agile (Scrum), AWS S3, Shopify, Squarespace, Google
              OAuth2.0, Google Analytics, and Google APIs
            </p>
          </section>

          <section id="borderdiv">
            <h2>Work Experience</h2>

            <Job
              company="The Future of Agency"
              link="https://www.thefutureofagency.com/"
              blurb="A marketing agency in the book publishing industry."
              role="Software Engineer, October 2023 – Present"
            >
              <li>Leading the development and management of web applications to market and advertise books.</li>
              <li>
                Collaborating with clients to enhance design and SEO, increasing unique visitor and Google Search traffic by over
                400%.
              </li>
              <li>
                Engineering and integrating full-stack applications using React.js, Node.js, and RESTful APIs to provide our
                clients more tailored solutions, enhancing client satisfaction and retention.
              </li>
              <li>
                Improving UI/UX and accessibility on our portfolio of client websites using CSS and JavaScript, enhancing user
                engagement.
              </li>
              <li>
                Optimizing DNS configurations and email systems, ensuring reliable communication for client mailing lists upwards
                of 50,000 subscribers.
              </li>
              <li>
                Implementing company-wide version control for custom designs in Squarespace and Shopify by maintaining a
                comprehensive version history on GitHub, reducing downtime by 70%.
              </li>
            </Job>

            <Job
              company="Vali"
              link="https://www.joinvali.com/"
              blurb="MVP-stage startup in the financial spectrum."
              role="Full Stack Engineer, July 2023 – November 2023 (Contract)"
            >
              <li>
                Led the design, architecture, and development of a full stack application of an MVP-stage startup for small
                business financial valuations to accelerate startup growth.
              </li>
              <li>Integrated AWS S3, streamlining content management and upload processes.</li>
              <li>Leveraged Framer Motion to develop a fluid and responsive user interface, enhancing user experience.</li>
              <li>Tech Used: React, React-Redux, Node.js, Express, PostgreSQL, AWS S3, Google OAuth2.0</li>
            </Job>

            <Job
              company="Entertainment Partners & Cast and Crew"
              blurb="Notable productions: John Wick 3, East New York (CBS), Bull (CBS), and Ray Donovan: The Movie."
              role="Lighting Console Programmer and Designer, March 2018 – April 2023"
            >
              <li>Programmed lighting consoles and built data networks for film and television.</li>
              <li>
                Transitioned film and TV sets from outdated incandescent systems to modern LED lighting, cutting project times by
                17% and boosting energy efficiency by 30%.
              </li>
              <li>Coordinated new tech installations, optimizing performance and saving over 75 person-hours weekly.</li>
            </Job>
          </section>

          <section id="borderdiv">
            <h2>Freelance and Open Source Projects</h2>

            <Project title="Dawn Ryan, Freelancer" link="https://www.dawngryan.com/" role="Front-End Engineer">
              <li>Designed and developed a portfolio and advertising website for a client freelance writer and copy-editor.</li>
              <li>Utilized React, React-Router, and Framer Motion to allow for a seamless user experience.</li>
              <li>Implemented Formspree’s library of front-end forms for end-user and client communication.</li>
            </Project>

            <Project
              title="“AlgoRhythm”"
              link="https://algorhythm-joedelbalzo.vercel.app/"
              role="Full Stack Engineer"
            >
              <li>
                Developed a quiz-style application designed to improve a user’s knowledge of common algorithms and solving styles
                and patterns in JavaScript and Python.
              </li>
              <li>Built a rich database with hundreds of quiz questions delivered to the front-end via Axios API fetches.</li>
            </Project>
          </section>

          <section id="borderdiv">
            <h2>Education</h2>
            <p className="resume-company-line">New York University, Tisch School of the Arts</p>
            <ul>
              <li>Bachelor of Fine Arts, Film and Television</li>
            </ul>
          </section>
        </div>
      </>
    </FadeComponent>
  );
};

export default Resume;
