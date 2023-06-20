import axios from "axios";

export const cssComponents = (state = [], action) => {
  if (action.type === "SET_COMPONENTS") {
    return action.components;
  }
  return state;
};

export const cssComponentColors = (state = [], action) => {
  if (action.type === "SET_COLORS") {
    return action.colors;
  }
  return state;
};

export const cssFetchComponents = () => {
  return async (dispatch) => {
    const response = await axios.get("/api/css/components");
    dispatch({ type: "SET_COMPONENTS", components: response.data });
  };
};

export const cssSetColorsOnComponents = (search) => {
  return async (dispatch) => {
    const { cssCpg, component } = search;
    const primaryColor = cssCpg[0].hex.value;
    const secondaryColor = cssCpg[1].hex.value;
    const tertiaryColor = cssCpg[2].hex.value;
    const bgColor = cssCpg[3].hex.value;
    const primaryColorContrast = cssCpg[0].contrast.value;
    const secondaryColorContrast = cssCpg[1].contrast.value;
    const tertiaryColorContrast = cssCpg[2].contrast.value;
    const bgColorContrast = cssCpg[3].contrast.value;
    const response = await axios.post("/api/css/components/", {
      component,
      bgColor,
      bgColorContrast,
      primaryColor,
      primaryColorContrast,
      secondaryColor,
      secondaryColorContrast,
      tertiaryColor,
      tertiaryColorContrast,
    });
    dispatch({ type: "SET_COLORS", colors: response.data });
    return response.data;
  };
};

export default { cssComponents, cssComponentColors };
