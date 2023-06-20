import axios from "axios";

const cssAuth = (state = {}, action) => {
  if (action.type === "SET_AUTH") {
    return action.auth;
  }
  if (action.type === "CREATE_AUTH") {
    return [...state, action.auth];
  }
  if (action.type === "DELETE_AUTH") {
    return state.filter((auth) => auth.id !== action.auth.id);
  }
  return state;
};

export const cssLogout = () => {
  window.localStorage.removeItem("token");
  return { type: "SET_AUTH", auth: {} };
};

export const cssLoginWithToken = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const response = await axios.get("/api/css/auth", {
        headers: {
          authorization: token,
        },
      });
      dispatch({ type: "SET_AUTH", auth: response.data });
    }
  };
};

export const cssAttemptLogin = (credentials) => {
  return async (dispatch) => {
    const response = await axios.post("/api/css/auth", credentials);
    window.localStorage.setItem("token", response.data);
    dispatch(loginWithToken());
  };
};

export const cssRegister = (credentials) => {
  return async (dispatch) => {
    const response = await axios.post("/api/css/auth/register", credentials);
    window.localStorage.setItem("token", response.data);
    dispatch(loginWithToken());
  };
};

export const cssUpdateAuth = (auth) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    const response = await axios.put("/api/css/auth", auth, {
      headers: {
        authorization: token,
      },
    });
    dispatch({ type: "SET_AUTH", auth: response.data });
  };
};

export const cssDreateUser = (auth) => {
  return async (dispatch) => {
    const response = await axios.post("/api/css/auth", auth);
    dispatch({ type: "CREATE_AUTH", auth: response.data });
  };
};

export const cssDeleteUser = (auth) => {
  return async (dispatch) => {
    await axios.delete(`/api/css/auth/${auth.id}`);
    dispatch({ type: "DELETE_AUTH", auth });
  };
};

export default cssAuth;
