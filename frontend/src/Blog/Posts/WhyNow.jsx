import { useEffect } from "react";

function WhyNow() {
  useEffect(() => {
    // Backup existing metadata values
    const originalTitle = document.title;
    const originalDescription = document.querySelector('meta[name="description"]').content;
    const originalKeywords = document.querySelector('meta[name="keywords"]').content;

    // Update metadata dynamically for this blog post
    document.title = "Why a Blog, and Why Now?";

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) metaDescription.content = "Teaching makes people better, and I want to use this space to learn by teaching.";

    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) metaKeywords.content = "software design, react, python, django";

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
        <h1>Why Write a Blog? Why Now?</h1>
        <p>A journey into sharing what I know, learning as I go, and exploring the power of writing about my craft.</p>
        <p className="date">December 1, 2024</p>
      </header>
      <section>
        <h2>Teaching Made Me Better</h2>
        <p>I became a better guitarist when I began to teach guitar.</p>
        <p>
          I became a better lighting designer when I started teaching my younger colleagues. Explaining color theory and the physics of
          light helped me solidify my own understanding.
        </p>
        <p>
          I became a better network architect when I became a department supervisor. Leading a team of technicians and ensuring everything
          was programmed correctly meant I had to explain things clearly. Once I could succinctly explain complex ideas to junior
          technicians, I found it much easier to communicate with my supervisors as well. This skill proved invaluable when justifying the
          resources I needed. For example, I often had to explain why four extra technicians were essential to get a system running before
          high-profile actors arrived. A single minute of downtime can cost a television production anywhere from $500 to $3,000. My
          supervisors knew the value of extra preparation, and me being able to explain why I needed it was vital.
        </p>
        <p>
          <strong>I’m ready to talk about what I do now.</strong>{" "}
        </p>
        <p>
          Not that I expect anyone to read this, but I believe the act of explaining helps me grow. Writing forces me to clarify my thoughts
          and break down what I’ve learned.
        </p>
        <p>
          Working from home has limited my opportunities to explain the technical nuances of my work to other engineers. I rarely discuss
          why I might choose React-based state management over Redux or why this blog is client-side rendered instead of using a
          database-driven approach. Writing this blog gives me that outlet.
        </p>
        <p>
          I also have a habit of starting new projects and abandoning them when the work gets tough or a learning curve feels too steep.
          Journaling my struggles with a particular technology might help me push through and find solutions.
        </p>
        <h2>What Am I Hoping to Accomplish?</h2>
        <p>
          I think I know React pretty well. I know JavaScript, especially in the context of React. Recently, I prepped for a front-end job
          interview by brushing up on DOM manipulation over a weekend. That was fun.
        </p>
        <p>I enjoy working with Express and Node. Writing API functions and manipulating data is a creative outlet for me.</p>
        <p>
          Python? I thought I knew it—but turns out, I don’t. I would put it on my resume because I did in fact use it quite a lot in
          Algorithms and Data Structures, because honestly it's just better and more efficient than JavaScript. So I knew Python, but I
          didn't really know how to <i>use</i> Python. That realization is part of what inspired this blog. I want to document my
          experiences learning Django while building my latest application, a Next.js front-end with a Django back-end. This project will
          also be my first attempt at a CI/CD pipeline and writing robust unit tests.
        </p>
        <p>
          My goal is to keep this blog going for as long as I can. It will mostly be able this Python/Django experience, but maybe also
          about my day job. Let’s see where it takes me!
        </p>
        <p>
          Thanks for reading! If you’ve made it this far, I’d love to hear your thoughts. Feel free to reach out to my email posted below
          with questions or comments and I'll keep on writing.
        </p>
      </section>
    </article>
  );
}

export default WhyNow;
