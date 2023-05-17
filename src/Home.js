import React from 'react';

function isMobile() {
  const mobileMaxWidth = 767; // Maximum width for mobile devices (adjust as needed)

  if (window.innerWidth <= mobileMaxWidth) {
    console.log('true')
    return true;
  } else {
    console.log('false')
    return false;
  }
  console.log()
}

const Home = ()=> {
  return (
    <>
     <h1 >Hey, I'm <span id="name">Joe Del Balzo.</span></h1>
     <div id={isMobile() ? "introParagraphMobile" : "introParagraph"}>
      <p>Web developer, front end, and back end engineer in New York, NY.</p> 
      <p>Former Lighting Designer, Lighting Console Programmer.</p> 
      <p>Musician, Cold Brew Drinker, Sports Fanatic, Certified Cicerone®</p> 
      <p>Artist-turned-coder. I liked creating beauty before; I like creating beauty now.</p> 
        
      </div>
    </>
  );
};

export default Home;
