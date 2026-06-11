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
            Beacon, New York
          </address>
        </div>
        <div id="main-resume">
          <section className="borderdiv">
            <h2>Skills, Languages, and Technologies</h2>
            <p className="skills-list">
              <strong>Languages, Frameworks, &amp; Databases:</strong>
              <br />
              JavaScript, TypeScript, Python, React, Next.js, NestJS, Redux, Zustand, Node, Express, Django, PostgreSQL,
              MongoDB
            </p>
            <p className="skills-list">
              <strong>Tools, Platforms, &amp; Practices:</strong>
              <br />
              Kubernetes, Azure Cloud, AWS S3, RESTful APIs, Git Version Control, Agile (Scrum), WordPress, Shopify,
              Mocha, Jest
            </p>
          </section>

          <section className="borderdiv">
            <h2>Work Experience</h2>

            <Job
              company="JetBlue"
              link="https://www.jetblue.com/"
              blurb="Airline in the United States."
              role="Fullstack Developer, Web Services API Developer, December 2025 - Present"
            >
              <li>
                Led migration of core service APIs from Java to NestJS, enabling decommission of a legacy cloud platform
                and eliminating $2M in annual infrastructure costs.
              </li>
              <li>
                Rebuilt a legacy search API into a unified search and AI-powered search service, delivering more
                relevant results and significantly faster response times for customers.
              </li>
            </Job>

            <Job
              company="The Future of Agency, LLC"
              link="https://www.thefutureofagency.com/"
              blurb="A marketing agency in the book publishing industry."
              role="Lead Software Engineer, October 2023 - December 2025"
            >
              <li>
                Directed architecture and delivery of all client web marketing applications, growing unique visitors
                400% and boosting average session time 150%.
              </li>
              <li>
                Built custom, SEO-focused interfaces and performance improvements that lifted search rankings and
                engagement for launches like curtisduffy.com and yourhiddengenius.com.
              </li>
              <li>
                Engineered internal JavaScript tools to automate repetitive tasks, reducing manual processing time and
                saving campaign managers over 50 hours per month.
              </li>
              <li>
                Established new company protocols for version control and code management by maintaining a comprehensive
                Git version history, reducing downtime by 70%.
              </li>
            </Job>

            <Job
              company="Valley Arcade"
              link="https://www.valley-arcade.com/"
              role="Full Stack Engineer (Contract), December 2024 - December 2025"
            >
              <li>
                Hired to scale a one-game Web3 arcade demo into a multi-game platform ahead of a major content and
                traffic increase.
              </li>
              <li>
                Architected a new Next.js front end with modular components, leaner stylesheets, and optimized state
                management; page loads dropped 5-6s and bounce rate cut in half.
              </li>
              <li>
                Refined backend performance through targeted caching and eliminating duplicate requests; database/API
                load down 70%+, response times faster by 50-80%.
              </li>
              <li>Enhanced authentication workflows to token-based, decreasing session validation times by 80%.</li>
            </Job>

            <Job
              company="Poetry Daily"
              link="https://www.poems.com/"
              role="WordPress Engineer (Contract), March 2025 - July 2025"
            >
              <li>
                Brought on to design a sustainable, editor-owned alternative to two external APIs; one costly, the other
                deprecated.
              </li>
              <li>
                Rebuilt both pipelines with custom post types and advanced custom fields for editor-friendly workflows;
                replaced external image dependencies with strict validation and fallback solutions, cutting worst-case
                delays from 63s to 2s.
              </li>
              <li>Eliminated API fees and scraping overhead, giving editors full code-free control of data.</li>
            </Job>

            <Job
              company="Entertainment Partners & Cast and Crew"
              blurb="Notable productions: John Wick 3, East New York (CBS), Bull (CBS), and Ray Donovan: The Movie."
              role="Lighting Console Programmer and Designer, March 2018 - April 2023"
            >
              <li>
                Transitioned film and TV sets from incandescent systems to LED and data-networked lighting, cutting
                project times by 17%, boosting energy efficiency by 30%, and saving 75 person-hours weekly.
              </li>
            </Job>
          </section>

          <section className="borderdiv">
            <h2>Freelance and Open Source Projects</h2>

            <Project title="Dawn Ryan, Freelancer" link="https://www.dawngryan.com/" role="Front-End Engineer">
              <li>
                Designed and developed a portfolio and advertising website for a client freelance writer and
                copy-editor.
              </li>
              <li>Utilized React, React-Router, and Framer Motion to allow for a seamless user experience.</li>
              <li>Implemented Formspree&#39;s library of front-end forms for end-user and client communication.</li>
            </Project>

            <Project title='"AlgoRhythm"' link="https://algorhythm-joedelbalzo.vercel.app/" role="Full Stack Engineer">
              <li>
                Developed a quiz-style application designed to improve a user&#39;s knowledge of common algorithms and
                solving styles and patterns in JavaScript and Python.
              </li>
              <li>
                Built a rich database with hundreds of quiz questions delivered to the front-end via Axios API fetches.
              </li>
            </Project>
          </section>

          <section className="borderdiv">
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
