import axios from "axios";
const placesAuth = (state = {}, action) => {
  if (action.type === "SET_AUTH") {
    return action.auth;
  }
  return state;
};

export const placesLogout = () => {
  window.localStorage.removeItem("token");
  return { type: "SET_AUTH", auth: {} };
};

export const placesLoginWithToken = () => {
  try {
    return async (dispatch) => {
      const token = window.localStorage.getItem("token");
      if (token) {
        const response = await axios.get("/api/openplaces/auth", {
          headers: {
            authorization: token,
          },
        });
        dispatch({ type: "SET_AUTH", auth: response.data });
      }
    };
  } catch (ex) {
    if (ex.response && ex.response.status === 401) {
      window.localStorage.removeItem("token");
    }
  }
};

export const placesUpdateAuth = (auth) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    const response = await axios.put("/api/openplaces/auth", auth, {
      headers: {
        authorization: token,
      },
    });
    dispatch({ type: "SET_AUTH", auth: response.data });
  };
};

export const placesAttemptLogin = (credentials) => {
  return async (dispatch) => {
    const response = await axios.post("/api/openplaces/auth", credentials);
    window.localStorage.setItem("token", response.data);
    dispatch(placesLoginWithToken());
  };
};

export const placesRegister = (credentials) => {
  return async (dispatch) => {
    const response = await axios.post("/api/openplaces/auth/register", credentials);
    window.localStorage.setItem("token", response.data);
    dispatch(placesLoginWithToken());
  };
};

export const placesEditUserSettings = (auth) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    const response = await axios.put(`api/openplaces/auth/`, auth, {
      headers: {
        authorization: token,
      },
    });
    dispatch({ type: "SET_AUTH", auth: response.data });
  };
};

export default placesAuth;
