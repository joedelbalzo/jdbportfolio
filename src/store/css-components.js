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
    const { cpg, component } = search;
    const primaryColor = cpg[0].hex.value;
    const secondaryColor = cpg[1].hex.value;
    const tertiaryColor = cpg[2].hex.value;
    const bgColor = cpg[3].hex.value;
    const primaryColorContrast = cpg[0].contrast.value;
    const secondaryColorContrast = cpg[1].contrast.value;
    const tertiaryColorContrast = cpg[2].contrast.value;
    const bgColorContrast = cpg[3].contrast.value;
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
