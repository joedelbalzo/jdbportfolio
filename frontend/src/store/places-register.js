import axios from "axios";
import { placesLoginWithToken } from "./places-auth";

const placesRegister = (credentials) => {
  return async (dispatch) => {
    const response = await axios.post("/api/openplaces/auth/register", credentials);
    const token = response.data.token;
    window.localStorage.setItem("token", token);
    dispatch(placesLoginWithToken());
  };
};

export default placesRegister;
