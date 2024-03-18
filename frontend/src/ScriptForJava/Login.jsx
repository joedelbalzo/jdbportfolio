import React, { useState } from "react";
import { scriptAttemptLogin } from "../store/index";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const onChange = (ev) => {
    setCredentials({ ...credentials, [ev.target.name]: ev.target.value });
  };

  const login = (ev) => {
    ev.preventDefault();
    try {
      dispatch(scriptAttemptLogin(credentials));
      navigate("/scriptforjava/home");
    } catch (err) {
      setErrorMessage("username or password is incorrect");
      console.log("login error", err);
    }
  };
  return (
    <div id="scriptforjava-login" style={{ paddingTop: "1rem", backgroundColor: "#f5f5f5" }}>
      <h1 style={{ color: "#004C60" }}>Login</h1>
      <form>
        <TextField
          label="username"
          value={credentials.username}
          name="username"
          onChange={onChange}
          inputProps={{
            autoCapitalize: "none",
          }}
        />
        <div style={{ marginBottom: 1 }} />
        <TextField
          id="filled-password-input"
          label="password"
          name="password"
          type="password"
          value={credentials.password}
          onChange={onChange}
        />

        <div
          style={{
            margin: "0 auto",
            color: "darkred",
            fontSize: "calc(4px + 0.5vw)",
            fontStyle: "italic",
            minHeight: "2vh",
          }}
        >
          {errorMessage ? errorMessage : <div style={{ minHeight: "(4px + 0.5vw)" }}></div>}
        </div>
        <Button type="submit" onClick={login} style={{ fontSize: "1.2rem" }}>
          Login
        </Button>
        {/* <Button type="submit" style={{ fontSize: "1.2rem" }}>
          <a
            href={`https://github.com/login/oauth/authorize?client_id=${window.client_id}`}
            style={{ textDecoration: "none" }}
          >
            Login with Github
          </a>
        </Button> */}
      </form>
      <div style={{ fontSize: "calc(12px + 0.5vw)" }}>
        <Link to={"/scriptforjava/register"}>Create an Account</Link>
      </div>
    </div>
  );
};

export default Login;
