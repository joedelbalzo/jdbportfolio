import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cssCreateTemplate } from "../store";
import store from "../store";
import { useNavigate } from "react-router-dom";
import FavHeart from "./FavHeart";
import { saveAs } from "file-saver";
import DownloadIcon from "@mui/icons-material/Download";
import ClearIcon from "@mui/icons-material/Clear";
import TitlePage from "./Components/TitlePage";
import NavbarPage from "./Components/NavbarPage";
import SideNavPage from "./Components/SideNavPage";
import CardPage from "./Components/CardPage";
import FormPage from "./Components/FormPage";
import ButtonPage from "./Components/ButtonPage";

const jsxGenerator = (component) => {
  if (!component.htmlText) {
    component.htmlText = "";
  }
  const { htmlText } = component;
  return htmlText;
};

const config = {};

const handleComponentChange = () => {
  const components = store.getState().components;
  components.forEach((component) => {
    config[component.type] = jsxGenerator(component);
  });
  config["jsxGenerator"] = jsxGenerator;
};

const PreviewPane = ({
  wholePageBackground,
  form,
  nav,
  title,
  sideNav,
  card,
  button,
  darkMode,
  setDarkMode,
}) => {
  const { cssAuth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [colors, setColors] = useState("");
  const [savedComponents, setSavedComponents] = useState([]);
  const [hoveredOnComponent, setHoveredOnComponent] = useState(null);

  const saveComponent = (componentType) => {
    const userId = cssAuth.id;
    const componentData = {
      htmlText: jsxGenerator(componentType),
      userId: userId,
      type: componentType.type,
    };
    // console.log("SAVE COMP FUNCTION", componentData);
    dispatch(cssCreateTemplate(componentData));
    setSavedComponents((prevSavedComponents) => [...prevSavedComponents, componentType]);
  };
  const goToUserComponents = () => {
    navigate("/profile");
  };

  const renderSaveButtons = () => {
    if (cssAuth.id) {
      return (
        <div>
          <div className="css-button-container" style={{ display: "block", textAlign: "center" }}>
            <h3 className="css-header">
              Save Components
              <div className="css-instructions">login to save your built components</div>
            </h3>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              width: "max-content",
              margin: "auto",
            }}
          >
            {title && !savedComponents.includes(title) && (
              <button onClick={() => saveComponent(title)}>Save Title</button>
            )}
            {nav && !savedComponents.includes(nav) && (
              <button onClick={() => saveComponent(nav)}>Save Nav</button>
            )}
            {sideNav && !savedComponents.includes(sideNav) && (
              <button onClick={() => saveComponent(sideNav)}>Save SideNav</button>
            )}
            {card && !savedComponents.includes(card) && (
              <button onClick={() => saveComponent(card)}>Save Card</button>
            )}
            {form && !savedComponents.includes(form) && (
              <button onClick={() => saveComponent(form)}>Save Form</button>
            )}
            {button && !savedComponents.includes(button) && (
              <button onClick={() => saveComponent(button)}>Save Button</button>
            )}
          </div>
          <button
            onClick={goToUserComponents}
            className="css-rainbowBtn"
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              width: "max-content",
              margin: "auto",
            }}
          >
            Go to My Components
          </button>
        </div>
      );
    }
    return null;
  };

  // console.log(wholePageBackground);

  const clearComponents = (str) => {
    if (str === "all") {
      localStorage.removeItem("savedNavbar");
      localStorage.removeItem("savedWholePageBackground");
      localStorage.removeItem("savedForm");
      localStorage.removeItem("savedTitle");
      localStorage.removeItem("savedNav");
      localStorage.removeItem("savedSideNav");
      localStorage.removeItem("savedCard");
      localStorage.removeItem("savedButton");
      form = null;
      wholePageBackground = null;
      nav = null;
      title = null;
      sideNav = null;
      card = null;
      button = null;
    } else if (str === "navbar") {
      localStorage.removeItem("savedNavbar");
      nav = null;
    } else if (str === "form") {
      localStorage.removeItem("savedForm");
      form = null;
    } else if (str === "title") {
      localStorage.removeItem("savedTitle");
      title = null;
    } else if (str === "sideNav") {
      localStorage.removeItem("savedSideNav");
      sideNav = null;
    } else if (str === "card") {
      localStorage.removeItem("savedCard");
      card = null;
    } else if (str === "button") {
      localStorage.removeItem("savedButton");
      button = null;
    }
    window.location.reload();
  };

  const handleComponentOnHover = (comp, html, code, filename) => {
    const downloadCode = () => {
      const blobForJsx = new Blob([code], { type: "text/plain;charset=utf-8" });
      const blobForHtml = new Blob([html], { type: "text/plain;charset=utf-8" });
      saveAs(blobForJsx, `${filename}_jsx.txt`);
      saveAs(blobForHtml, `${filename}_innerHTML.txt`);
    };

    const clear = () => {
      clearComponents(comp.type);
    };
    return (
      <span id="css-hoverbox">
        <DownloadIcon onClick={downloadCode}>{`Download code for ${filename}`}</DownloadIcon>
        <FavHeart component={comp} />
        <ClearIcon onClick={clear} />
      </span>
    );
  };

  //this is broken
  if (!wholePageBackground) {
    const savedWholePageBackground = JSON.parse(localStorage.getItem("savedWholePageBackground"));
    wholePageBackground = savedWholePageBackground;
  }

  return (
    <div>
      <h3
        className="css-header"
        style={{ display: "block", textAlign: "center", color: darkMode === true ? "#F0FAFA" : "" }}
      >
        Template Preview
        <div className="css-instructions">
          your preview template. you can save individual components or the template as a whole
        </div>
      </h3>
      <div className="css-preview-option-buttons">
        <button className="css-reset-button" onClick={() => clearComponents("all")}>
          Reset Template
        </button>
        {darkMode === true ? (
          <button className="css-light-mode-button" onClick={() => setDarkMode(false)}>
            Template Light Mode
          </button>
        ) : (
          <button className="css-dark-mode-button" onClick={() => setDarkMode(true)}>
            Template Dark Mode
          </button>
        )}
      </div>
      <div
        className="css-preview-pane-container"
        style={{
          zIndex: -1,
          backgroundColor: wholePageBackground ? `${wholePageBackground}` : "#F0FAFA",
        }}
      >
        {title ? (
          <div
            id="css-previewTitle"
            style={{
              background: "transparent",
              outline: "none",
              position: "relative",
            }}
            onMouseEnter={() => setHoveredOnComponent(title)}
            onMouseLeave={() => setHoveredOnComponent(null)}
          >
            <TitlePage title={title} />

            <span>
              {hoveredOnComponent === title
                ? handleComponentOnHover(
                    title,
                    title.htmlText,
                    `<div id="css-previewTitle" 
                        style={{ 
                          background: "transparent", 
                          outline: "none", 
                          position: "relative" }}>
                    <div 
                    dangerouslySetInnerHTML={{ __html: jsxGenerator(title) }}>
                    </div>
                  </div>`,
                    "title"
                  )
                : ""}
            </span>
          </div>
        ) : (
          <div
            id="css-previewTitle"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "calc(12px + 0.5vw)",
              backgroundColor: darkMode === true ? "#282828" : "#e2e2e2",
              color: darkMode === true ? "#e2e2e2" : "black",
            }}
          >
            Your Website Title
          </div>
        )}
        {nav ? (
          <div
            id="css-previewNav"
            style={{ background: "transparent", outline: "none", position: "relative" }}
            onMouseEnter={() => setHoveredOnComponent(nav)}
            onMouseLeave={() => setHoveredOnComponent(null)}
          >
            <NavbarPage nav={nav} />

            <span>
              {hoveredOnComponent === nav
                ? handleComponentOnHover(
                    nav,
                    nav.htmlText,
                    `<div id="css-previewTitle" 
                        style={{ 
                          background: "transparent", 
                          outline: "none", 
                          position: "relative" }}>
                    <div 
                    dangerouslySetInnerHTML={{ __html: jsxGenerator(nav) }}>
                    </div>
                  </div>`,
                    "nav"
                  )
                : ""}
            </span>
          </div>
        ) : (
          <div
            id="css-previewNav"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "calc(12px + 0.5vw)",
              backgroundColor: darkMode === true ? "#282828" : "#e2e2e2",
              color: darkMode === true ? "#e2e2e2" : "black",
            }}
          >
            Navigation
          </div>
        )}
        {/* sidenav needs some positioning work on the hover box */}
        {sideNav ? (
          <div
            id="css-previewSideNav"
            style={{ background: "transparent", outline: "none", position: "relative" }}
            onMouseEnter={() => setHoveredOnComponent(sideNav)}
            onMouseLeave={() => setHoveredOnComponent(null)}
          >
            <SideNavPage sideNav={sideNav} />

            <span>
              {hoveredOnComponent === sideNav
                ? handleComponentOnHover(
                    sideNav,
                    sideNav.htmlText,
                    `<div id="css-previewTitle" 
                        style={{ 
                          background: "transparent", 
                          outline: "none", 
                          position: "relative" }}>
                    <div 
                    dangerouslySetInnerHTML={{ __html: jsxGenerator(sideNav) }}>
                    </div>
                  </div>`,
                    "sideNav"
                  )
                : ""}
            </span>
          </div>
        ) : (
          <div
            id="css-previewSideNav"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "calc(12px + 0.5vw)",
              backgroundColor: darkMode === true ? "#282828" : "#e2e2e2",
              color: darkMode === true ? "#e2e2e2" : "black",
            }}
          >
            Side Nav
          </div>
        )}
        <main className="css-preview-pane-Main-Content">
          <div
            id="css-previewCardContainer"
            onMouseEnter={card ? () => setHoveredOnComponent(card) : () => {}}
            onMouseLeave={card ? () => setHoveredOnComponent(null) : () => {}}
          >
            {card ? (
              <div
                id="css-previewCard"
                style={{ background: "transparent", outline: "none", position: "relative" }}
                onMouseEnter={() => setHoveredOnComponent(card)}
                onMouseLeave={() => setHoveredOnComponent(null)}
              >
                <CardPage card={card} />
                <span>
                  {hoveredOnComponent === card
                    ? handleComponentOnHover(
                        card,
                        card.htmlText,
                        `<div id="css-previewTitle" 
                        style={{ 
                          background: "transparent", 
                          outline: "none", 
                          position: "relative" }}>
                    <div 
                    dangerouslySetInnerHTML={{ __html: jsxGenerator(card) }}>
                    </div>
                  </div>`,
                        "card"
                      )
                    : ""}
                </span>
              </div>
            ) : (
              <div
                id="css-previewCard"
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flexWrap: "wrap",
                  fontSize: "calc(12px + 0.5vw)",
                  backgroundColor: darkMode === true ? "#404040" : "#e2e2e2",
                  color: darkMode === true ? "#e2e2e2" : "black",
                }}
              >
                Info or Product Card
              </div>
            )}
            {card ? (
              <div
                id="css-previewCard"
                style={{ background: "transparent", outline: "none", position: "relative" }}
                onMouseEnter={() => setHoveredOnComponent(card)}
                onMouseLeave={() => setHoveredOnComponent(null)}
              >
                <CardPage card={card} />
                <span>
                  {hoveredOnComponent === card
                    ? handleComponentOnHover(
                        card,
                        card.htmlText,
                        `<div id="css-previewTitle" 
                        style={{ 
                          background: "transparent", 
                          outline: "none", 
                          position: "relative" }}>
                    <div 
                    dangerouslySetInnerHTML={{ __html: jsxGenerator(card) }}>
                    </div>
                  </div>`,
                        "card"
                      )
                    : ""}
                </span>
              </div>
            ) : (
              <div
                id="css-previewCard"
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flexWrap: "wrap",
                  fontSize: "calc(12px + 0.5vw)",
                  backgroundColor: darkMode === true ? "#404040" : "#e2e2e2",
                  color: darkMode === true ? "#e2e2e2" : "black",
                }}
              >
                Info or Product Card
              </div>
            )}
            {card ? (
              <div
                id="css-previewCard"
                style={{ background: "transparent", outline: "none", position: "relative" }}
                onMouseEnter={() => setHoveredOnComponent(card)}
                onMouseLeave={() => setHoveredOnComponent(null)}
              >
                <CardPage card={card} />
                <span>
                  {hoveredOnComponent === card
                    ? handleComponentOnHover(
                        card,
                        card.htmlText,
                        `<div id="css-previewTitle" 
                        style={{ 
                          background: "transparent", 
                          outline: "none", 
                          position: "relative" }}>
                    <div 
                    dangerouslySetInnerHTML={{ __html: jsxGenerator(card) }}>
                    </div>
                  </div>`,
                        "card"
                      )
                    : ""}
                </span>
              </div>
            ) : (
              <div
                id="css-previewCard"
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flexWrap: "wrap",
                  fontSize: "calc(12px + 0.5vw)",
                  backgroundColor: darkMode === true ? "#404040" : "#e2e2e2",
                  color: darkMode === true ? "#e2e2e2" : "black",
                }}
              >
                Info or Product Card
              </div>
            )}
          </div>
          {form ? (
            <div
              id="css-previewForm"
              style={{ background: "transparent", outline: "none", position: "relative" }}
              onMouseEnter={() => setHoveredOnComponent(card)}
              onMouseLeave={() => setHoveredOnComponent(null)}
            >
              <FormPage form={form} />
              <span>
                {hoveredOnComponent === form
                  ? handleComponentOnHover(
                      form,
                      form.htmlText,
                      `<div id="css-previewTitle" 
                          style={{ 
                            background: "transparent", 
                            outline: "none", 
                            position: "relative" }}>
                      <div 
                      dangerouslySetInnerHTML={{ __html: jsxGenerator(form) }}>
                      </div>
                    </div>`,
                      "form"
                    )
                  : ""}
              </span>
            </div>
          ) : (
            <div
              id="css-previewForm"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "calc(12px + 0.5vw)",

                backgroundColor: darkMode === true ? "#404040" : "#e2e2e2",
                color: darkMode === true ? "#e2e2e2" : "black",
              }}
            >
              Login, Contact, General Information Form
            </div>
          )}
          <div id="css-previewButtonContainer">
            {button ? (
              <div
                id="css-previewButton"
                style={{ background: "transparent", outline: "none", position: "relative" }}
                onMouseEnter={() => setHoveredOnComponent(button)}
                onMouseLeave={() => setHoveredOnComponent(null)}
              >
                <ButtonPage button={button} />
                <span>
                  {hoveredOnComponent === button
                    ? handleComponentOnHover(
                        button,
                        button.htmlText,
                        `<div id="css-previewTitle" 
                              style={{ 
                                background: "transparent", 
                                outline: "none", 
                                position: "relative" }}>
                          <div 
                          dangerouslySetInnerHTML={{ __html: jsxGenerator(button) }}>
                          </div>
                        </div>`,
                        "button"
                      )
                    : ""}
                </span>
              </div>
            ) : (
              <div
                id="css-previewButton"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "calc(12px + 0.5vw)",
                  backgroundColor: darkMode === true ? "#B3B3B3" : "#e2e2e2",
                  color: darkMode === true ? "#black" : "E2E2E2",
                }}
              >
                Submit Buttons
              </div>
            )}
          </div>
        </main>
      </div>
      {renderSaveButtons()}
    </div>
  );
};

export default PreviewPane;

export const PreviewPaneConfig = config;
