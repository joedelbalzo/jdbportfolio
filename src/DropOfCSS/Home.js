import React, { useEffect, useState } from "react";
import PreviewPane from "./PreviewPane";
import Components from "./Components";
import ColorGenForm from "./ColorGenForm";
// import UserNavBar from "./UserNavBar";

const Home = ({}) => {
  const [form, setForm] = useState(null);
  const [nav, setNavBar] = useState(null);
  const [title, setTitle] = useState(null);
  const [sideNav, setSideNav] = useState(null);
  const [card, setCard] = useState(null);
  const [button, setButton] = useState(null);
  const [generatedColors, setGeneratedColors] = useState(null);
  const [wholePageBackground, setWholePageBackground] = useState("");
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark" ? true : false;
  });
  // useEffect(() => {
  //   const preferredTheme = localStorage.getItem("theme");
  //   console.log(preferredTheme);
  //   preferredTheme === "dark" ? setDarkMode(true) : setDarkMode(false);
  // }, []);

  useEffect(() => {
    const savedNav = JSON.parse(localStorage.getItem("savedNavbar"));
    const savedForm = JSON.parse(localStorage.getItem("savedForm"));
    const savedTitle = JSON.parse(localStorage.getItem("savedTitle"));
    const savedSideNav = JSON.parse(localStorage.getItem("savedSideNav"));
    const savedCard = JSON.parse(localStorage.getItem("savedCard"));
    const savedButton = JSON.parse(localStorage.getItem("savedButton"));
    const savedWholePageBackground = JSON.parse(localStorage.getItem("savedWholePageBackground"));

    if (savedNav) {
      setNavBar(savedNav);
    }
    if (savedForm) {
      setForm(savedForm);
    }
    if (savedTitle) {
      setTitle(savedTitle);
    }
    if (savedSideNav) {
      setSideNav(savedSideNav);
    }
    if (savedCard) {
      setCard(savedCard);
    }
    if (savedButton) {
      setButton(savedButton);
    }
    setWholePageBackground(savedWholePageBackground);
  }, []);

  const handleOpenInPreview = (component) => {
    if (component.type === "navbar") {
      setNavBar(component);
    }
    if (component.type === "form") {
      setForm(component);
    }
    if (component.type === "title") {
      setTitle(component);
    }
    if (component.type === "sideNav") {
      setSideNav(component);
    }
    if (component.type === "card") {
      setCard(component);
    }
    if (component.type === "button") {
      setButton(component);
    }
  };

  return (
    <div
      style={{
        backgroundColor: darkMode === true ? "#575757" : "",
      }}
    >
      <div id="css-page-container-div">
        <div id="css-page-container-left-divs">
          <div id="css-cpg-div">
            <ColorGenForm
              openColorsInPreview={setGeneratedColors}
              wholePageBackground={wholePageBackground}
              setWholePageBackground={setWholePageBackground}
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
          </div>
          <div id="css-component-div">
            <Components
              openInPreview={handleOpenInPreview}
              generatedColors={generatedColors}
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
          </div>
        </div>
        <div id="css-preview-pane-div">
          <PreviewPane
            wholePageBackground={wholePageBackground}
            form={form}
            nav={nav}
            title={title}
            sideNav={sideNav}
            card={card}
            button={button}
            generatedColors={generatedColors}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />
          {/* <UserNavBar /> */}
        </div>
      </div>
    </div>
  );
};

export default Home;
