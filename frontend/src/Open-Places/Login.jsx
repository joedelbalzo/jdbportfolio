// react imports
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
// mui imports
import { Button, TextField } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

//component imports

//store imports
import { placesAttemptLogin } from "../store/index";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const [passwordError, setPasswordError] = useState(false);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const onChange = (ev) => {
    setCredentials({ ...credentials, [ev.target.name]: ev.target.value });
  };

  const login = (ev) => {
    ev.preventDefault();
    try {
      dispatch(placesAttemptLogin(credentials));
      console.log("dispatching");
      navigate("/openplaces/home");
      console.log("should have navigated by now.");
    } catch (err) {
      console.log("incorrect");
      console.log(err);
    }
  };

  return (
    <div id="places-loginPage">
      <h2>Login</h2>
      <form onSubmit={login}>
        <TextField
          size="large"
          sx={{ fontSize: "2rem", paddingBottom: "1rem" }}
          label="username"
          name="username"
          autoComplete="username"
          variant="outlined"
          value={credentials.username}
          onChange={onChange}
          inputProps={{
            autoCapitalize: "none",
          }}
        />

        <TextField
          size="large"
          sx={{ fontSize: "2rem", paddingBottom: "1rem" }}
          id="filled-password-input"
          autoComplete="current-password"
          label="password"
          name="password"
          type="password"
          variant="outlined"
          value={credentials.password}
          onChange={onChange}
        />

        {passwordError && <p style={{ color: "red", fontSize: ".8rem" }}>{passwordError}</p>}

        <Button
          type="submit"
          onClick={login}
          style={{
            fontSize: "1.8rem",
            padding: "1rem",
          }}
        >
          Login
        </Button>

        <Button
          type="submit"
          style={{
            fontSize: "1.4rem",
            padding: "1rem",
          }}
        >
          <Link to={"/register"} style={{ textDecoration: "none", textTransform: "capitalize" }}>
            Create New User
          </Link>
        </Button>
      </form>
    </div>
  );
};

export default Login;
