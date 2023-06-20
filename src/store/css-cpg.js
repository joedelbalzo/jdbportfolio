import axios from "axios";

function getRandomNumber(count) {
  if (count === 0) {
    return 0;
  }
  const randomDecimal = Math.random();
  const randomNumber = Math.floor(randomDecimal * 5);
  return randomNumber;
}
const trimColorPalette = (updatedColorPalette) => {
  const output = [];
  let objCount = 0;
  for (let item of updatedColorPalette) {
    if (typeof item == "number") {
      output.push(item);
    }
    if (typeof item == "object") {
      if (objCount !== 4) {
        output.push(item);
        objCount++;
      } else {
        break;
      }
    }
  }
  return output;
};

const cssCpg = (state = [], action) => {
  if (action.type === "SET_COLORPALETTE") {
    return action.cpg;
  }
  if (action.type === "SET_LOCALLYSAVED_COLORPALETTE") {
    return action.colors;
  }
  if (action.type === "REORDER_COLORPALETTE") {
    return [...action.colors];
  }
  if (action.type === "UPDATE_COLORPALETTE") {
    const deletedColorIds = action.remove.map((color) => color.hex.clean);
    state = state.filter((color) => !deletedColorIds.includes(color.hex.clean));
    if (!action.colors.length) {
      return trimColorPalette([...state, action.colors]);
    } else if ([...state, ...action.colors].length > 4) {
      return trimColorPalette([...state, ...action.colors]);
    } else {
      return [...state, ...action.colors];
    }
  }
  if (action.type === "UPDATE_COLOR") {
    state.splice(action.index, 1, action.color);
    return [...state];
  }

  if (action.type === "DELETE_COLORS") {
    const deletedColorIds = action.colors.map((color) => color.hex.clean);
    return state.filter((color) => !deletedColorIds.includes(color.hex.clean));
  }
  return state;
};

export const cssFetchColorPalette = (search) => {
  return async (dispatch) => {
    const { hex, mode } = search;
    const response = await axios.post("/api/css/cpg", { hex, mode });
    dispatch({ type: "SET_COLORPALETTE", cpg: response.data });
  };
};

export const cssLocallyStoredColorPalette = (savedColors) => {
  return async (dispatch) => {
    dispatch({ type: "SET_LOCALLYSAVED_COLORPALETTE", colors: savedColors });
  };
};

export const cssReorderColorPalette = (reorderedItems) => {
  return async (dispatch) => {
    dispatch({ type: "REORDER_COLORPALETTE", colors: reorderedItems });
  };
};

export const cssUpdateColorPalette = (search) => {
  return async (dispatch) => {
    const { hex, mode, count } = search;
    const colorsToRemove = search.unlocked;
    const response = await axios.put("/api/css/cpg", { hex, mode, count });
    if (!response.data.colors) {
      dispatch({ type: "UPDATE_COLORPALETTE", remove: colorsToRemove, colors: response.data });
    }
    dispatch({ type: "UPDATE_COLORPALETTE", remove: colorsToRemove, colors: response.data.colors });
  };
};

export const cssUpdateColor = (search) => {
  return async (dispatch) => {
    const { color, colorIndex, hex, mode, count } = search;
    const colorToRemove = color;
    const response = await axios.put("/api/css/cpg", { hex, mode, count });
    dispatch({
      type: "UPDATE_COLOR",
      index: colorIndex,
      remove: colorToRemove,
      color: response.data,
    });
  };
};

export const cssDeleteColor = (color) => {
  return async (dispatch) => {
    dispatch({ type: "DELETE_COLOR", color });
  };
};

export const cssDeleteColorPalette = (colors) => {
  return async (dispatch) => {
    dispatch({ type: "DELETE_COLORS", colors });
  };
};

export default cssCpg;
