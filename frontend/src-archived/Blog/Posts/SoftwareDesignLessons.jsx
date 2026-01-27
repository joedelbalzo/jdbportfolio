import { useEffect } from "react";

function SoftwareDesignLessons() {
  useEffect(() => {
    // Backup existing metadata values
    const originalTitle = document.title;
    const originalDescription = document.querySelector('meta[name="description"]').content;
    const originalKeywords = document.querySelector('meta[name="keywords"]').content;

    // Update metadata dynamically for this blog post
    document.title = 'Lessons in Modularity: What a Weekend of "Change Everything" Taught Me About Software Design';

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) metaDescription.content = "Reflections on modularity, security, and adaptive design in software development.";

    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) metaKeywords.content = "software design, modularity, React, Redux, form pathways";

    // Cleanup function to restore original metadata
    return () => {
      document.title = originalTitle;
      if (metaDescription) metaDescription.content = originalDescription;
      if (metaKeywords) metaKeywords.content = originalKeywords;
    };
  }, []);

  return (
    <article className="blogposts">
      <header>
        <h1>Lessons in Modularity: What a Weekend of 'Change Everything' Taught Me About Software Design</h1>
        <p>Reflections on Modularity, Security, and Adaptive Design</p>
        <p className="date">December 18, 2024</p>
      </header>
      <section>
        <h2>The "Change Everything" Weekend</h2>
        <p>
          This weekend brought a stark reminder of the importance of modularity in software design. John Ousterhout’s{" "}
          <span style={{ fontStyle: "italic" }}>"A Philosophy of Software Design"</span> highlights that complexity is the enemy of
          progress. This insight resonated deeply as I grappled with a project upheaval that could have been far smoother if I just spent
          five or ten percent more time designing.
        </p>
        <p>
          Modularity is not just about organizing code; it’s about reducing the interconnectedness that makes change difficult. Our system’s
          pathways had lots of visually reusable components, but I was finding that variables were not quite as easy to add or remove. We
          lacked the reusable components necessary for adaptability. If those pathways had been modular, implementing new requirements, such
          as added security measures, would have been straightforward rather than chaotic.
        </p>
        <p>
          While the immediate task at hand was daunting — shifting from four unique pathways to two less-unique but more complex pathways —
          the bigger challenge was addressing the technical debt that came from a lack of forethought about modularity. Ousterhout’s call to
          "design for change" became more than just an ideal; it was a necessity.
        </p>

        <h2>The Specific Adjustments</h2>
        <p>
          To adapt, we focused on key changes. A major adjustment involved creating a form field that integrated with a custom-built API for
          real-time security checks. Balancing usability with security was critical, so we carefully refined the API’s responsiveness.
          "Responsiveness" is so vague. What is responsive? Is it more responsive to have a user make one slow interaction, or two really
          fast interactions? Specifically, in our case, I could build a filter that helps you autofill an answer to a question, but what if
          we're searching through 100,000 different items? What happens if I ask you one simple clarifying question first that can bring
          that search down to 2,000?{" "}
        </p>
        <p>
          I think 99% of the time, you would say that one single interaction, where a user types, an API interacts, a database populates,
          would be fastest. That said, we're on a tight budget here. So instead, let's implement a second question and keep all 100,000
          items in the frontend, but broken down into 2,000-item arrays that are only imported and/or required when the first question is
          answered. This moved substantially faster than having a 100,000-item json file live client-side or in the server. This
          approach—introducing a clarifying question and chunking large datasets—balanced speed and resource efficiency while staying within
          budget.
        </p>
        <p>
          Additionally, we incorporated reCAPTCHA verification and updated the backend’s decimal return standard to strengthen reliability
          without hindering performance.
        </p>
        <p>
          These changes weren’t just technical; they were architectural, requiring a deeper evaluation of how different layers of the system
          interacted. This effort underscored the cost of addressing complex interdependencies versus building with modularity from the
          outset.
        </p>

        <h2>Lessons in Modularity</h2>
        <p>
          John Ousterhout's "A Philosophy of Software Design" emphasizes the importance of modularity to reduce complexity. This weekend
          reminded me how critical this principle is. While our system worked, the lack of modular components made pivoting unnecessarily
          difficult. If each pathway had been built with more reusable components, integrating the new security measures and API would have
          been far smoother.
        </p>

        <h2>React: useContext vs Redux</h2>
        <p>
          In hindsight, our choice to use <code>useContext</code> for global state management limited our flexibility. React Redux might
          have added some upfront complexity but would have given us more control over state changes across these evolving pathways. Redux's
          predictable state container could have made the transition less painful, particularly with actions and reducers that encapsulate
          logic better than sprawling <code>useContext</code> calls.Redux's strict structure—using actions to define state changes and
          reducers to implement them—makes the system more predictable, especially in larger applications.
        </p>

        <h2>Pathway Design and Responsive Forms</h2>
        <p>
          Designing responsive forms is always a challenge. It would be one thing to have a <code>contentMap</code> where answers were just
          set in state variables, but when pathways diverge based on user input, clarity and adaptability become critical. One overlooked
          aspect was the humble back button—making it work seamlessly across dynamic pathways required far more effort than expected. For
          example, a user moving from Path A to Path B encountered a scenario where the back button led them to an unrelated page.
          Modularizing pathways with clear state tracking could have resolved this issue. If the forms were better modularized and their
          pathways more clearly defined, these changes would have been easier to implement.
        </p>
        <p>
          Moving forward, I’ll prioritize clarity in pathway definitions and modular design to handle changes more efficiently while keeping
          the user experience smooth.
        </p>

        <h2>Closing Thoughts</h2>
        <p>
          This weekend reaffirmed the importance of modularity, strong state management choices, and clear design pathways. While the
          "change everything" moment was stressful, it offered valuable lessons that I’ll carry into future projects. Building adaptable
          systems isn't just a nice-to-have—it's essential in today's fast-paced development environment.Moving forward, I aim to apply
          these lessons to every project—building modular, adaptable systems that embrace change rather than resist it.
        </p>
      </section>
    </article>
  );
}

export default SoftwareDesignLessons;
