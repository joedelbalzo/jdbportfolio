import React, { useState } from "react";
import { SketchPicker, ChromePicker } from "react-color";
import reactCSS from "reactcss";
import { useMediaQuery } from "@mui/material";

const ColorPicker = ({ onColorChange }) => {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [color, setColor] = useState("#2C8294");

  const handleChange = async (newColor) => {
    setColor(newColor.hex);
    onColorChange(newColor.hex.replace("#", ""));
  };

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };
  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const styles = reactCSS({
    default: {
      color: {
        boxSizing: "border-box",
        width: "100%",
        height: "16px",
        borderRadius: "2px",
        background: `${color ? color : "#2C8294"}`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
      swatch: {
        boxSizing: "border-box",
        width: "100%",
        padding: "5px",
        background: "#fff",
        borderRadius: "1px",
        boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
        display: "inline-block",
        cursor: "pointer",
      },
      popover: {
        position: "absolute",
        zIndex: "2",
      },
      cover: {
        position: "fixed",
        top: "0px",
        right: "0px",
        bottom: "0px",
        left: "0px",
      },
    },
  });

  const isLargeScreen = useMediaQuery(
    "(min-width: 200px) and (max-width: 550px), (min-width: 850px)"
  );

  return (
    <>
      {isLargeScreen ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "1rem",
          }}
        >
          <SketchPicker
            width={"85%"}
            presetColors={[
              "#4D4D4D",
              "#999999",
              "#FFFFFF",
              "#F44E3B",
              "#FE9200",
              "#FCDC00",
              "#DBDF00",
              "#A4DD00",
              "#68CCCA",
              "#73D8FF",
              "#AEA1FF",
              "#FDA1FF",
              "#333333",
              "#808080",
              "#cccccc",
              "#D33115",
              "#E27300",
              "#FCC400",
              "#B0BC00",
              "#68BC00",
              "#16A5A5",
              "#009CE0",
              "#7B64FF",
              "#FA28FF",
              "#000000",
              "#666666",
              "#B3B3B3",
              "#9F0500",
              "#C45100",
              "#FB9E00",
              "#808900",
              "#194D33",
              "#0C797D",
              "#0062B1",
              "#653294",
              "#AB149E",
            ]}
            color={color}
            disableAlpha={false}
            onChange={handleChange}
          />
        </div>
      ) : (
        <div>
          <div style={styles.swatch} onClick={handleClick}>
            <div style={styles.color}>
              <span
                style={{
                  fontSize: "calc(6px + .5vw)",
                  color: "whitesmoke",
                  margin: "auto",
                  fontStyle: "italic",
                  fontStretch: "expanded",
                }}
              >
                select a color
              </span>
            </div>
          </div>
          {displayColorPicker ? (
            <div style={styles.popover}>
              <div style={styles.cover} onClick={handleClose} />
              <SketchPicker color={color} onChange={handleChange} />
            </div>
          ) : null}
        </div>
      )}
    </>
  );
};

export default ColorPicker;
