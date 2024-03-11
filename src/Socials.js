import React from "react";

import { Facebook, Email, LinkedIn, Twitter, GitHub } from "./ShareIcons/Email.jsx";

const Socials = () => {
  const share = (platform) => {
    if (platform === "facebook") {
      window.open(`https://www.facebook.com/joedelbalzo/`, "_blank");
    } else if (platform === "linkedin") {
      window.open(`https://www.linkedin.com/in/joe-delbalzo/`, "_blank");
    } else if (platform === "twitter") {
      window.open("https://twitter.com/joedelbalzo", "_blank");
    } else if (platform === "email") {
      const emailBody = `Hey, Joe! I'd love to work with you.`;
      window.open(`mailto:?subject=Hey, Joe!&body=${emailBody}`, "_blank");
    } else if (platform === "GitHub") {
      window.open(`https://www.github.com/joedelbalzo`, "_blank");
    }
  };

  return (
    <div className="share-buttons">
      <button onClick={() => share("linkedin")}>
        <LinkedIn />
      </button>
      <button onClick={() => share("GitHub")}>
        <GitHub />
      </button>
      <button onClick={() => share("facebook")}>
        <Facebook />
      </button>
      <button onClick={() => share("twitter")}>
        <Twitter />
      </button>
      <button onClick={() => share("email")}>
        <Email />
      </button>
    </div>
  );
};

export default Socials;
