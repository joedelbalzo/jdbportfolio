// react imports
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
// mui imports
import { Button, TextField } from "@mui/material";

// store imports
import { placesAttemptLogin } from "../../store/index";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [passwordError, setPasswordError] = useState("");
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const onChange = (ev) => {
    setCredentials({ ...credentials, [ev.target.name]: ev.target.value });
  };

  const _login = async (ev) => {
    ev.preventDefault();
    try {
      await dispatch(placesAttemptLogin(credentials));
      navigate("places");
    } catch (err) {
      setPasswordError("Incorrect username or password.");
    }
  };

  return (
    <div id="places-loginPage">
      <h2>Login</h2>
      <form onSubmit={_login}>
        <TextField
          fullWidth
          margin="normal"
          label="Username"
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
          fullWidth
          margin="normal"
          label="Password"
          name="password"
          type="password"
          autoComplete="current-password"
          variant="outlined"
          value={credentials.password}
          onChange={onChange}
        />
        {passwordError && <p style={{ color: "red", fontSize: ".8rem" }}>{passwordError}</p>}
        <Button type="submit" variant="contained" color="primary" style={{ marginTop: "1rem" }}>
          Login
        </Button>
        <Button component={Link} to="/openplaces/register" variant="text" style={{ marginTop: "1rem", marginLeft: "1rem" }}>
          Create New User
        </Button>
      </form>
    </div>
  );
};

export default Login;
