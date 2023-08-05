import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cssCreateTemplate, clearCodeFiles } from "../store";
import { useNavigate } from "react-router-dom";
import FavHeart from "./FavHeart";
import DownloadIcon from "@mui/icons-material/Download";
import ClearIcon from "@mui/icons-material/Clear";
import TitlePage from "./Components/TitlePage";
import NavbarPage from "./Components/NavbarPage";
import SideNavPage from "./Components/SideNavPage";
import CardPage from "./Components/CardPage";
import FormPage from "./Components/FormPage";
import ButtonPage from "./Components/ButtonPage";

//for downloading
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { homejs } from "./ForDownloads/Home";
import { appjs } from "./ForDownloads/App";
import { indexjs } from "./ForDownloads";
import { indexhtml } from "./ForDownloads/public/indexhtml";
import { stylescss } from "./ForDownloads/public/stylescss";
import { readme } from "./ForDownloads/README";
import { webpackconfig } from "./ForDownloads/webpack.config";
import { serverjs } from "./ForDownloads/server";

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
  const { cssAuth, cssCodeFile } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  useEffect(() => {
    darkMode === true
      ? localStorage.setItem("theme", "dark")
      : localStorage.setItem("theme", "light");
  }, []);

  const clearComponents = (str) => {
    if (str === "all") {
      dispatch(clearCodeFiles());
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

  const handleComponentOnHover = (comp) => {
    const handleDownload = async () => {
      console.log("component type!", comp.type);
      const element = document.createElement("a");
      const kind = comp.type;
      const file = new Blob([cssCodeFile[kind]], { type: "text/plain" });
      element.href = URL.createObjectURL(file);
      element.download = `my${comp.type[0].toUpperCase() + comp.type.slice(1)}Component.jsx`;
      document.body.appendChild(element);
      element.click();
    };

    const clear = () => {
      clearComponents(comp.type);
    };
    return (
      <span id="css-hoverbox">
        <DownloadIcon onClick={handleDownload}>{`Download code for ${comp.type}`}</DownloadIcon>
        <FavHeart component={comp} />
        <ClearIcon onClick={clear} />
      </span>
    );
  };

  const downloadTemplate = () => {
    console.log("download template");
    const zip = new JSZip();
    const project = zip.folder("main folder to rename");
    project.file("README.md", new Blob([readme()], { type: "text/plain" }));
    project.file("webpack.config.js", new Blob([webpackconfig()], { type: "text/plain" }));
    project.file("server.js", new Blob([serverjs()], { type: "text/plain" }));
    const src = project.folder("src");
    src.file("Title.js", new Blob([cssCodeFile["title"]], { type: "text/plain" }));
    src.file("Navbar.js", new Blob([cssCodeFile["navbar"]], { type: "text/plain" }));
    src.file("SideNav.js", new Blob([cssCodeFile["sideNav"]], { type: "text/plain" }));
    src.file("Card.js", new Blob([cssCodeFile["card"]], { type: "text/plain" }));
    src.file("Form.js", new Blob([cssCodeFile["form"]], { type: "text/plain" }));
    src.file("Button.js", new Blob([cssCodeFile["button"]], { type: "text/plain" }));
    src.file("App.js", new Blob([appjs()], { type: "text/plain" }));
    src.file("Home.js", new Blob([homejs()], { type: "text/plain" }));
    src.file("index.js", new Blob([indexjs()], { type: "text/plain" }));

    const publicfolder = project.folder("public");
    publicfolder.file("index.html", new Blob([indexhtml()], { type: "text/plain" }));
    publicfolder.file("styles.css", new Blob([stylescss()], { type: "text/plain" }));

    zip.generateAsync({ type: "blob" }).then(function (content) {
      // see FileSaver.js
      saveAs(content, `example.zip`);
    });
  };

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
        <button className="css-download-button" onClick={() => downloadTemplate()}>
          Download Template
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

            <span>{hoveredOnComponent === title ? handleComponentOnHover(title) : ""}</span>
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

            <span>{hoveredOnComponent === nav ? handleComponentOnHover(nav) : ""}</span>
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

            <span>{hoveredOnComponent === sideNav ? handleComponentOnHover(sideNav) : ""}</span>
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
                // onMouseEnter={() => setHoveredOnComponent(card)}
                // onMouseLeave={() => setHoveredOnComponent(null)}
              >
                <CardPage card={card} />
                <span>{hoveredOnComponent === card ? handleComponentOnHover(card) : ""}</span>
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
                <span>{hoveredOnComponent === card ? handleComponentOnHover(card) : ""}</span>
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

                <span>{hoveredOnComponent === card ? handleComponentOnHover(card) : ""}</span>
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
              onMouseEnter={() => setHoveredOnComponent(form)}
              onMouseLeave={() => setHoveredOnComponent(null)}
            >
              <FormPage form={form} />
              <span>{hoveredOnComponent === form ? handleComponentOnHover(form) : ""}</span>
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
                <span>{hoveredOnComponent === button ? handleComponentOnHover(button) : ""}</span>
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
