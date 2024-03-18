import axios from "axios";
import { scriptLoginWithToken } from "./script-auth";

export const scriptRegister = (credentials) => {
  return async (dispatch) => {
    const response = await axios.post("/api/script/auth/register", credentials);
    const token = response.data.token;
    window.localStorage.setItem("token", token);
    dispatch(scriptLoginWithToken());
  };
};

export default scriptRegister;
