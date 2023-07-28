import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  cssDeleteColor,
  cssDeleteColorPalette,
  cssFetchColorPalette,
  cssUpdateColorPalette,
  cssUpdateColor,
  cssReorderColorPalette,
  cssLocallyStoredColorPalette,
} from "../store";
import ColorPicker from "./ColorPicker";

import { styled } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  margin: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const getRandomHexCode = () => {
  const characters = "0123456789ABCDEF";
  let hexCode = "";

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    hexCode += characters[randomIndex];
  }

  return hexCode;
};

//reorder functions
// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const ColorGenForm = ({ openColorsInPreview, wholePageBackground, setWholePageBackground }) => {
  const { cssCpg } = useSelector((state) => state);
  const [hex, setHex] = useState("");
  const [mode, setMode] = useState("");
  const [count, setCount] = useState("");
  const [colorPalette, setColorPalette] = useState([]);
  const [expanded, setExpanded] = useState(true);
  const [lockedColors, setLockedColors] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    setColorPalette(cssCpg);
  }, [cssCpg]);

  useEffect(() => {
    const savedColors = JSON.parse(localStorage.getItem("colors"));
    if (savedColors) {
      setColorPalette(savedColors);
      dispatch(cssLocallyStoredColorPalette(savedColors));
      setExpanded(false);
    }
  }, []);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleColorChange = (newHex) => {
    setHex(newHex);
  };

  //looks like it's unused?
  const handleGenColors = (cssCpg) => {
    openColorsInPreview(cssCpg);
  };

  const handleWholePageBackground = async () => {
    await setWholePageBackground(`${hex}`);
    localStorage.setItem("savedWholePageBackground", JSON.stringify(wholePageBackground));
  };

  const cpgModes = [
    "monochrome",
    "primary accent",
    "complementary accent",
    "monochrome-light",
    "analogic",
    "complement",
    "analogic-complement",
    "triad",
    "quad",
    "pastel",
  ];

  const getRandomOption = (options) => {
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
  };
  const randomMode = getRandomOption(cpgModes);
  // const cpgCounts = [2, 3, 4];

  const runCPG = async (ev) => {
    ev.preventDefault();
    // console.log("runcpg ev", hex);

    if (!hex) {
      // console.log("no hex");
      setErrorMessage("red");
      setTimeout(() => {
        setErrorMessage("");
      }, 1500);

      return;
    }

    if (hex && cssCpg.length === 0) {
      try {
        const search = {
          hex,
          mode,
          count,
        };
        // console.log("runCPG func", search);
        dispatch(cssFetchColorPalette(search));
      } catch (error) {
        console.log(error);
      }
      setExpanded(false);
    }

    if (hex && cssCpg.length > 0 && lockedColors.length === 0) {
      try {
        const search = {
          hex,
          mode,
          count,
        };
        // console.log("runCPG func", search);
        dispatch(cssFetchColorPalette(search));
      } catch (error) {
        console.log(error);
      }
      setExpanded(false);
    }

    if (hex && cssCpg.length > 0 && lockedColors.length > 0) {
      try {
        const search = {
          hex,
          mode,
        };
        search.count =
          lockedColors.filter((_color) => typeof _color === "object").length > 0
            ? 4 - lockedColors.filter((_color) => typeof _color === "object").length
            : count;
        search.unlocked = colorPalette.filter((_color) => !lockedColors.includes(_color));
        dispatch(cssUpdateColorPalette(search));
      } catch (error) {
        console.log(error);
      }
      setExpanded(false);
    }
  };

  //new lock func
  const toggleColorLock = (index, color) => {
    setLockedColors((prevLockedColors) => {
      const colorIndex = prevLockedColors.indexOf(color);
      if (colorIndex >= 0) {
        return prevLockedColors.filter((_color) => _color !== color);
      } else {
        return [...prevLockedColors, color];
      }
    });
  };

  const shuffleUnlockedColors = async () => {
    try {
      if (lockedColors.length === 0) {
        let hex = getRandomHexCode();
        const search = {
          hex,
          mode,
          count,
        };
        // console.log("runCPG func", search);
        dispatch(cssFetchColorPalette(search));
      } else {
        const unlocked = cssCpg.filter((_color) => !lockedColors.includes(_color));
        const length = unlocked.length;
        // console.log("shuffle unlocked", lockedColors, length);
        let search = {
          hex: getRandomHexCode(),
          mode: randomMode,
          count: length,
          unlocked: unlocked,
        };
        // console.log("search", search);
        dispatch(cssUpdateColorPalette(search));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const regenColor = async (color) => {
    if (lockedColors.includes(color)) {
      // console.log("This color's locked.");
      return;
    }
    try {
      const colorHex = color.hex.clean;
      const colorIndex = cssCpg.indexOf(color);

      dispatch(
        cssUpdateColor({
          color,
          colorIndex,
          hex: colorHex,
          mode: randomMode,
          count: 1,
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  //reorder functions
  const onDragEnd = async (result) => {
    if (!result.destination) {
      return;
    }
    const reorderedItems = reorder(colorPalette, result.source.index, result.destination.index);
    dispatch(cssReorderColorPalette(reorderedItems));
    setColorPalette(reorderedItems);
  };

  const colorClass = ["primary color", "secondary color", "tertiary color", "background color"];

  return (
    <>
      {/* <div className="button-container" style={{ display: "block", textAlign: "center" }}> */}
      <h3 className="css-header" style={{ display: "block", textAlign: "center" }}>
        Create Palette
        <div className="css-instructions">first your color palette, then a component!</div>
      </h3>
      {/* </div> */}

      <div className="css-button-container" style={{ display: "block", textAlign: "center" }}>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
          style={{
            display: "flex",
          }}
        >
          <ExpandMoreIcon />
          {expanded ? (
            <div
              className="css-instructions"
              style={{ top: "2.5rem", transform: "translateX(-50%) scale(-1, -1)" }}
            >
              hide palette generator
            </div>
          ) : (
            <div className="css-instructions">show palette generator</div>
          )}
        </ExpandMore>
      </div>
      <div className="css-ColorGen">
        <div
          className="css-expandButtonContainer"
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            margin: " 0 auto",
          }}
        >
          <Collapse
            in={expanded}
            style={{
              display: "flex",
              flexWrap: "wrap",
              width: "100%",
            }}
            timeout="auto"
            unmountOnExit
          >
            <div>
              <ColorPicker onColorChange={handleColorChange} />
            </div>
            <div
              className="css-cpg-form-div"
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <form className="css-CPG-form" onSubmit={runCPG}>
                <input
                  value={hex}
                  onChange={(ev) => setHex(ev.target.value)}
                  placeholder="Insert Hex Code"
                  style={{
                    fontSize: "calc(8px + .5vw)",
                    outline: errorMessage ? `2px solid ${errorMessage}` : "",
                  }}
                />
                <select
                  value={mode}
                  onChange={(ev) => setMode(ev.target.value)}
                  placeholder="Select Mode"
                  style={{
                    fontSize: "calc(8px + .5vw)",
                  }}
                >
                  {cpgModes.map((mode) => {
                    return (
                      <option value={mode} key={mode}>
                        {mode}
                      </option>
                    );
                  })}
                </select>
                <button className="css-rainbowBtn" type="submit" onClick={(ev) => runCPG(ev)}>
                  Submit
                </button>
              </form>
              <button className="css-setBackgroundButton" onClick={handleWholePageBackground}>
                set page background
              </button>
            </div>
          </Collapse>
        </div>
        {colorPalette.length > 0 ? (
          <>
            <div
              style={{
                flex: "1 1 100%",
                margin: "auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
                fontSize: "calc(8px + .5vw)",
              }}
            >
              <div
                className="css-pointer-on-hover"
                style={{
                  display: "flex",
                  alignItems: "center",
                  ":hover": {
                    cursor: "pointer",
                  },
                }}
              >
                <div
                  className="css-button-container"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <ShuffleIcon />
                  <span
                    style={{
                      fontSize: "calc(8px + 1vw)",
                    }}
                    onClick={() => shuffleUnlockedColors()}
                  >
                    shuffle
                  </span>
                  <div className="css-instructions">shuffle only unlocked colors</div>
                </div>
              </div>

              <div
                className="css-pointer-on-hover"
                style={{
                  display: "flex",
                  margin: "auto",
                  alignItems: "center",
                  ":hover": {
                    cursor: "pointer",
                  },
                }}
              >
                <div
                  className="css-button-container"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <DeleteOutlineIcon />
                  <span
                    style={{
                      fontSize: "calc(8px + 1vw)",
                    }}
                    onClick={() => {
                      dispatch(cssDeleteColorPalette(cssCpg));
                      setExpanded(true);
                    }}
                  >
                    clear all
                  </span>
                  <div className="css-instructions">clear all colors, even locked ones</div>
                </div>
              </div>
            </div>
            <div id="css-cpg-container">
              {/* reorder stuff beginning */}

              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable" className="css-droppableDiv" key={"1"}>
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      // style={getListStyle(snapshot.isDraggingOver)}
                    >
                      {colorPalette.map((color, index) => {
                        const uniqueKey = `color-${index}`;
                        let isLocked = lockedColors.includes(color) ? (
                          <LockIcon
                            className="css-lock-icon"
                            sx={{
                              fontSize: "calc(8px + 1vw)",
                              color: color.contrast.value,
                            }}
                          />
                        ) : (
                          <LockOpenIcon
                            className="css-lock-icon"
                            sx={{
                              fontSize: "calc(8px + 1vw)",
                              color: color.contrast.value,
                            }}
                          />
                        );
                        return (
                          <div key={uniqueKey}>
                            <div key={`colorClass-${index}`} className="css-colorclass">
                              {colorClass[index]}:
                            </div>
                            <Draggable key={uniqueKey} draggableId={uniqueKey} index={index}>
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  {/* content */}

                                  <div
                                    className="css-cpg-color"
                                    id={uniqueKey}
                                    key={uniqueKey}
                                    style={{
                                      backgroundColor: color.hex.value,
                                    }}
                                  >
                                    <div
                                      className="css-colorname-colorhex"
                                      style={{
                                        color: color.contrast.value,
                                        flex: "2 1 100%",
                                        textAlign: "left",
                                      }}
                                    >
                                      {color.name.value} {color.hex.value}
                                    </div>

                                    <div className="css-pointer-on-hover">
                                      <div className="css-button-container">
                                        <ShuffleIcon
                                          className="css-shuffle-icon"
                                          style={{
                                            color: lockedColors.includes(color)
                                              ? "darkgray"
                                              : color.contrast.value,
                                            marginRight: ".3vw",
                                            marginLeft: ".3vw",
                                            fontSize: "calc(8px + 1vw)",
                                            cursor: lockedColors.includes(color)
                                              ? "auto"
                                              : "pointer",
                                          }}
                                          onClick={() => regenColor(color)}
                                        />
                                        <div className="css-instructions">shuffle color</div>
                                      </div>
                                      <span
                                        style={{ marginRight: ".3vw", marginLeft: ".3vw" }}
                                      ></span>
                                      <div className="css-button-container">
                                        <span
                                          style={{ marginRight: ".5vw", marginLeft: ".5vw" }}
                                          onClick={() => toggleColorLock(index, color)}
                                        >
                                          {isLocked}
                                        </span>
                                        <div className="css-instructions">lock color</div>
                                      </div>
                                    </div>
                                  </div>
                                  {/* content end */}
                                </div>
                              )}
                            </Draggable>
                          </div>
                        );
                      })}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>

              {/* reorder end */}
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default ColorGenForm;
