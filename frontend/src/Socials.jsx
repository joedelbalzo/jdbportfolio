import React from "react";

import { Facebook, Email, LinkedIn, Twitter, GitHub } from "./ShareIcons/SocialIcons.jsx";

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
      <div className="share-button-line" />

      <button aria-label="Joe Del Balzo's LinkedIn" onClick={() => share("linkedin")}>
        <LinkedIn />
      </button>
      <button aria-label="Joe Del Balzo's GitHub" onClick={() => share("GitHub")}>
        <GitHub />
      </button>
      <button aria-label="Joe Del Balzo's Facebook" onClick={() => share("facebook")}>
        <Facebook />
      </button>
      <button aria-label="Joe Del Balzo's Twitter" onClick={() => share("twitter")}>
        <Twitter />
      </button>
      <button aria-label="Email Joe Del Balzo" onClick={() => share("email")}>
        <Email />
      </button>
      <div className="share-button-line" />
    </div>
  );
};

export default Socials;
