import React from 'react';

function isMobile() {
  const mobileMaxWidth = 767; // Maximum width for mobile devices (adjust as needed)

  if (window.innerWidth <= mobileMaxWidth) {
    return true;
  } else {
    return false;
  }
}

const Links = ()=> {
  return (
    <div id="linkPage">
      <div id={isMobile() ? "linksMobile" : "links"}>
        <a href="https://www.linkedin.com/in/joe-delbalzo/" id="link" target="_blank" rel="noreferrer noopener">LinkedIn</a>
        <a href="https://github.com/joedelbalzo" id="link" target="_blank" rel="noreferrer noopener">GitHub</a>
     
      </div>
      <div id={isMobile() ? "linksMobile" : "links"}>

      <a href="https://jdb-open-places.onrender.com/#/" id="link" target="_blank" rel="noreferrer noopener">Portfolio: "Open Places"</a>   
      <a href="https://scriptforjava.onrender.com" id="link" target="_blank" rel="noreferrer noopener">Portfolio: "Script for Java"</a>
      </div>
    </div>
  );
};

export default Links;
