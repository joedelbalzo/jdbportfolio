import React from "react";

const Resume = () => {
  return (
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
            JavaScript(ES6+), React, Redux, NodeJS, Express, PostgresQL, Python, Axios, RESTful
            APIs, HTML/CSS, Bootstrap, Material UI, TDD (Jest, Mocha), Webpack, Git/GitHub Version
            Control, AGILE(SCRUM)
          </p>
        </div>
        <div id="borderdiv">
          <h2>
            <span id="main-name" style={{ fontSize: "calc(14px + 1vw)", color: "white" }}>
              Experience
            </span>
          </h2>
          <h3 style={{ marginLeft: "3%" }}>“Drop of CSS”</h3>
          <ul>
            <li style={{ paddingBottom: "2vh", fontSize: "calc(10px + 1vw)" }}>
              Led the design and technical implementation of a feature-rich color palette and
              element generating tool allowing designers and freelance developers to build, preview,
              and download built components.
            </li>
            <li style={{ paddingBottom: "2vh", fontSize: "calc(10px + 1vw)" }}>
              Developed a comprehensive React-based user interface with real-time component preview
              functionality, powered by React-Redux for efficient state management.
            </li>
            <li style={{ paddingBottom: "2vh", fontSize: "calc(10px + 1vw)" }}>
              Utilized Axios to facilitate seamless communication and built custom API calls with
              full CRUD functionality to efficiently retrieve and update user-requested data in
              real-time.
            </li>
            <li style={{ paddingBottom: "2vh", fontSize: "calc(10px + 1vw)" }}>
              Built a robust backend using Node.js and Express, ensuring efficient request handling,
              secure data transmission, and seamless database integration with PostgreSQL.
            </li>
            <li style={{ paddingBottom: "2vh", fontSize: "calc(10px + 1vw)" }}>
              Performed comprehensive audits of both front-end and back-end codebases, resulting in
              improved coding standards and style guides for enhanced codebase consistency and
              maintainability.
            </li>
          </ul>
          <h3 style={{ marginLeft: "3%" }}>Console Programmer and Designer</h3>
          <ul>
            <li style={{ paddingBottom: "2vh", fontSize: "calc(10px + 1vw)" }}>
              Led productions into modern LED lighting, adapting new programming techniques with
              data-managed lights and wireless communication technologies to seamlessly integrate
              lighting designs into consoles, ensuring flawless execution of complex visual
              concepts.
            </li>
            <li style={{ paddingBottom: "2vh", fontSize: "calc(10px + 1vw)" }}>
              Led the strategic construction, oversight, and maintenance of intricate wired and
              wireless networks to establish high-speed transmission of data, enabling smooth and
              uninterrupted production operations.
            </li>
            <li style={{ paddingBottom: "2vh", fontSize: "calc(10px + 1vw)" }}>
              Oversaw and implemented critical software and firmware updates to optimize
              performance, bolster reliability, and ensure adherence to industry standards.
            </li>
            <li style={{ paddingBottom: "2vh", fontSize: "calc(10px + 1vw)" }}>
              Developed and programmed custom configurations within the console, showcasing an
              exceptional attention to detail and creative problem-solving skills.
            </li>
            <li style={{ paddingBottom: "2vh", fontSize: "calc(10px + 1vw)" }}>
              Notable projects: John Wick 3, East New York Season 1, Bull Seasons 4-6, and Ray
              Donovan: The Movie.
            </li>
          </ul>
        </div>
        <div id="borderdiv">
          <h2>
            <span id="main-name" style={{ fontSize: "calc(14px + 1vw)", color: "white" }}>
              Open Source Projects
            </span>
          </h2>
          <h3 style={{ marginLeft: "3%", marginTop: "4rem" }}>“AlgoRhythm”</h3>
          Quiz application for JavaScript and Python algorithm studying.
          <ul>
            <li style={{ paddingBottom: "2vh", fontSize: "calc(10px + 1vw)" }}>
              Developed a quiz-style application designed to improve a user’s knowledge of common
              algorithms and solving styles and patterns in JavaScript and Python.{" "}
            </li>

            <li style={{ paddingBottom: "2vh", fontSize: "calc(10px + 1vw)" }}>
              Built a substantial database with hundreds of quiz questions of different styles, from
              coding to multiple-choice, all delivered to the front-end via custom Axios API calls.
            </li>
          </ul>
          <h3 style={{ marginLeft: "3%", marginTop: "4rem" }}>“Open Places”</h3>
          <ul>
            <li style={{ paddingBottom: "2vh", fontSize: "calc(10px + 1vw)" }}>
              Developed in React and utilized Material-UI React library to ensure consistent and
              responsive UI/UX designs for users across multiple device types.
            </li>
            <li style={{ paddingBottom: "2vh", fontSize: "calc(10px + 1vw)" }}>
              Utilized React-Redux, Axios, and the Google Places API to allow end-users to
              seamlessly adjust their settings, from location radius to searched categories.
            </li>
            <li style={{ paddingBottom: "2vh", fontSize: "calc(10px + 1vw)" }}>
              Implemented testing mechanism built around a custom API that queries PostgreSQL
              database of similar Google Places API object responses.
            </li>
          </ul>
          <h3 style={{ marginLeft: "3%", marginTop: "4rem" }}>E-Commerce “A Script for Java”</h3>
          <ul>
            <li style={{ paddingBottom: "2vh", fontSize: "calc(10px + 1vw)" }}>
              Utilizing React, developed a robust interface allowing users to quickly find and
              purchase products.
            </li>
            <li style={{ paddingBottom: "2vh", fontSize: "calc(10px + 1vw)" }}>
              Developed admin tools, using authentication and authorization to give an admin full
              CRUD capabilities.
            </li>
            <li style={{ paddingBottom: "2vh", fontSize: "calc(10px + 1vw)" }}>
              Implemented Material-UI and CSS grid to improve user experience across all platforms.
            </li>
          </ul>
        </div>
        {/* <div id="borderdiv">
          <h2>
            <span id="main-name" style={{ fontSize: "calc(14px + 1vw)", color: "white" }}>
              Professional Experience
            </span>
          </h2>

          <h3 style={{ marginLeft: "3%" }}>
            Lighting Console Programmer | Local 52 | New York, NY
          </h3>
          <p>May, 2019 – Current</p>
          <ul>
            <li>
              Headed the department that designed, programmed, and operated lighting console
              programs and networks for film and television. I built extensive networks to
              distribute gigabits per second of show-critical lighting data to minimize time costs
              to productions.
            </li>
          </ul>
          <p>Projects include:</p>
          <ul>
            <li>
              East New York, Season 1 (Summer 2022 – Spring 2023), Produced by Warner Brothers
            </li>
            <li>Bull, Seasons 4-6 (Fall 2019 – Spring 2022), Produced by CBS</li>
            <li>Ray Donovan: The Movie (Spring 2021), Produced by Showtime</li>
            <li>Chemical Hearts (Spring 2021), Produced by Amazon</li>
            <li>John Wick 3 (Spring 2019), Produced by Dune Films</li>
            <li>Little America, Season 1 (Spring 2019), Produced by Apple TV</li>
          </ul>

          <h3 style={{ marginLeft: "3%" }}>Chief Lighting Technician | Local 52 | New York, NY</h3>
          <p>May, 2011 – June, 2016</p>
          <ul>
            <li style={{ maxWidth: "80%" }}>
              Headed the department that designed and executed the desired look of a film or
              television show through lighting. I oversaw the department, managed all of the
              electricity and lighting decision-making, technicians, and inventory during
              production.
            </li>
          </ul>
          <p>Projects include:</p>
          <ul>
            <li>Trouble (Spring 2016), Directed by Theresa Rebeck</li>
            <li>Wildling (Fall 2015), Directed by Fritz Bohm</li>
            <li>Fan Girl (Fall 2014), Directed by Paul Jarrett</li>
            <li>Dean (Fall 2014), Directed by Demetri Martin</li>
            <li>Tracing the Rope: Eva Hesse (Fall 2013), Directed by Marcie Begleiter</li>
          </ul>

          <h3 style={{ marginLeft: "3%" }}>
            IATSE Local 52 Film and TV Electrician | Local 52 | New York, NY
          </h3>
          <p>May, 2011 – Current</p>
          <ul>
            <li style={{ maxWidth: "80%" }}>
              Delivered the desired look of a film or television series through lighting, executing
              anything relating to electricity and lighting on a production. Both positions above as
              department head were under the umbrella of a Local 52 Electrician.
            </li>
          </ul>

          <p>Projects include:</p>
          <ul>
            <li>Succession, Season 4 (Spring 2023), Produced by HBO</li>
            <li>West Side Story (Fall 2019), Produced by 20th Century Studios</li>
            <li>Bull, Seasons 1-3 (Summer 2016 – Spring 2019), Produced by CBS</li>
            <li>The Americans, Season 4 (Winter 2016), Produced by FX</li>
            <li>Daredevil, Season 1 (Fall, 2015), Produced by Netflix</li>
            <li>The Jinx: The Life and Deaths of Robert Durst (Dec. 2014), Produced by HBO</li>
          </ul>
        </div> */}
        <div id="borderdiv">
          <h2>
            <span id="main-name" style={{ fontSize: "calc(14px + 1vw)", color: "white" }}>
              Education
            </span>
          </h2>
          <p>
            Fullstack Academy Web Development Bootcamp | June 2023
            <br />
            <li style={{ marginLeft: "3%" }}> Software Engineering Certificate</li>
            <li style={{ marginLeft: "3%" }}>
              Full-time, Full Stack Javascript Web Development Immersive
            </li>
          </p>

          <p>
            New York University, Tisch School of the Arts | May 2011
            <li style={{ marginLeft: "3%" }}>Bachelor of Fine Arts, Film and Television</li>
          </p>
        </div>
      </div>
    </>
  );
};

export default Resume;
