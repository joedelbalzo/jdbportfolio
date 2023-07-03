import axios from "axios";
import { useNavigate } from "react-router-dom";

const scriptAuth = (state = {}, action) => {
  if (action.type === "SET_AUTH") {
    return action.auth;
  }
  return state;
};

export const scriptUpdateAuth = (auth) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    const response = await axios.put(`/api/script/auth/${token}`, auth);
    dispatch({ type: "SET_AUTH", auth: response.data });
  };
};

export const scriptLogout = () => {
  return (dispatch) => {
    window.localStorage.removeItem("token");
    dispatch({ type: "SET_AUTH", auth: {} });
  };
};

export const scriptLoginWithToken = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const response = await axios.get("/api/script/auth", {
        headers: {
          authorization: token,
        },
      });
      dispatch({ type: "SET_AUTH", auth: response.data });
    }
  };
};

export const scriptAttemptLogin = (credentials) => {
  return async (dispatch) => {
    // console.log("credentials....", credentials);
    const response = await axios.post("/api/script/auth", credentials);
    window.localStorage.setItem("token", response.data.token);
    dispatch(scriptLoginWithToken());
  };
};

export default scriptAuth;
