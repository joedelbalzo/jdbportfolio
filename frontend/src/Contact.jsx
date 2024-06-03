import React, { useState, useEffect } from "react";
import { FadeComponent } from "./FadeComponent";

import { useForm, ValidationError } from "@formspree/react";
import { Link } from "react-router-dom";

//notes - create a thanks for your submission page for redirecting. set timeout there for 4 seconds to redirect home

function Contact() {
  const [state, handleSubmit] = useForm("mgejadwz");
  const [submit, setSubmit] = useState(false);
  // if (state.succeeded) {
  //   setSubmit(true);
  //   setTimeout(() => {
  //     setSubmit(false);
  //   }, 2000);
  // }

  useEffect(() => {
    if (state.succeeded) {
      setSubmit(true);
      const timeoutId = setTimeout(() => {
        setSubmit(false);
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [state.succeeded]);

  return (
    <FadeComponent>
      <form className="main-form" onSubmit={handleSubmit}>
        {/* <label htmlFor="email">Email Address:</label> */}
        <input id="name" type="name" name="name" placeholder="Your Name" />
        <input id="email" type="email" name="email" placeholder="Your Email Address" />
        <ValidationError prefix="Email" field="email" errors={state.errors} />
        {/* <label htmlFor="subject">Subject:</label> */}
        <input id="subject" type="subject" name="subject" placeholder="Subject" />
        {/* <label htmlFor="message">Message:</label> */}
        <textarea id="message" name="message" placeholder="Your message" />
        <ValidationError prefix="Message" field="message" errors={state.errors} />
        {submit ? (
          <button disabled>SUBMITTED!</button>
        ) : (
          <button type="submit" disabled={state.submitting}>
            SUBMIT
          </button>
        )}
        <div style={{ fontSize: "calc(8px + 0.5vw)", margin: ".5rem auto" }}>or email me at jdelbalzo99@gmail.com</div>
      </form>
    </FadeComponent>
  );
}

export default Contact;
