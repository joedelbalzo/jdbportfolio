import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cssFetchComponents, cssSetColorsOnComponents } from "../store";

const Components = ({ openInPreview, darkMode }) => {
  const { cssComponents, cssCpg } = useSelector((state) => state);
  const [activeType, setActiveType] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleTypeClick = (type) => {
    setActiveType(type === activeType ? null : type);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(cssFetchComponents());
  }, []);

  if (!cssComponents) {
    return null;
  }

  useEffect(() => {
    // console.log("Components useEffect", cssCpg);
  }, [cssCpg]);

  const handleOpenInPreview = async (component) => {
    try {
      if (!cssCpg.length > 0) {
        setErrorMessage("please pick a color palette first!");
        setTimeout(() => {
          setErrorMessage("");
        }, 1500);
      }
      if (component) {
        // console.log("colors on components clicked", cssCpg, component);
        const colorsOnComponents = await dispatch(
          cssSetColorsOnComponents({
            component,
            cssCpg,
          })
        );
        openInPreview(colorsOnComponents);

        if (component.type === "navbar") {
          localStorage.setItem("savedNavbar", JSON.stringify(colorsOnComponents));
        }
        if (component.type === "form") {
          localStorage.setItem("savedForm", JSON.stringify(colorsOnComponents));
        }
        if (component.type === "title") {
          localStorage.setItem("savedTitle", JSON.stringify(colorsOnComponents));
        }
        if (component.type === "sideNav") {
          localStorage.setItem("savedSideNav", JSON.stringify(colorsOnComponents));
        }
        if (component.type === "card") {
          localStorage.setItem("savedCard", JSON.stringify(colorsOnComponents));
        }
        if (component.type === "button") {
          localStorage.setItem("savedButton", JSON.stringify(colorsOnComponents));
        }
        localStorage.setItem("colors", JSON.stringify(cssCpg));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const componentTypes = [...new Set(cssComponents.map((component) => component.type))];

  return (
    <>
      <h3
        className="css-header"
        style={{ display: "block", textAlign: "center", color: darkMode === true ? "#F0FAFA" : "" }}
      >
        Select Components
        <div className="css-instructions">next, add components to your template!</div>
      </h3>
      <div
        className="css-componentlist"
        style={{
          border: darkMode === true ? "1px solid #F0FAFA" : "",
        }}
      >
        <div className="css-componentContainer">
          <div className="css-componentTypes">
            {componentTypes.map((type) => (
              <div
                className="css-componentTypes"
                style={{
                  color: darkMode === true ? "#F0FAFA" : "",
                }}
                key={type}
                onClick={() => handleTypeClick(type)}
              >
                <span>{type}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="css-componentContainer">
          <div
            className="css-componentNamesContainer"
            style={{
              color: darkMode === true ? "#F0FAFA" : "",
              backgroundColor:
                cssCpg.length > 0
                  ? `rgba(${cssCpg[3].rgb.r}, ${cssCpg[3].rgb.g}, ${cssCpg[3].rgb.b}, 0.2)`
                  : "",
            }}
          >
            {componentTypes.map((type) => (
              <div
                className={`css-componentNames ${type === activeType ? "active" : ""}`}
                key={type}
                style={{ marginTop: 6, color: darkMode === true ? "#F0FAFA" : "" }}
              >
                <ul>
                  {cssComponents
                    .filter((component) => component.type === type)
                    .map((component) => (
                      <li key={component.id} onClick={() => handleOpenInPreview(component)}>
                        {component.name}
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div
        style={{
          margin: "0 auto",
          color: "darkred",
          fontSize: "calc(5px + 2vw)",
          fontStyle: "italic",
          minHeight: "2vh",
          textAlign: "center",
        }}
      >
        {errorMessage ? errorMessage : <div style={{ minHeight: "(4px + 0.5vw)" }}></div>}
      </div>
    </>
  );
};

export default Components;
