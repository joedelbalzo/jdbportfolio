import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { scriptRegister } from "../store/index";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const _register = async (ev) => {
    ev.preventDefault();
    const credentials = {
      username,
      password,
    };

    try {
      dispatch(scriptRegister(credentials));
      navigate("/scriptforjava/home");
    } catch (ex) {
      console.log(ex);
    }
  };
  return (
    <div id="scriptforjava-login" style={{ paddingTop: "1rem", backgroundColor: "#f5f5f5" }}>
      <h1 style={{ color: "#004C60" }}>Register</h1>
      <form onSubmit={_register}>
        <TextField
          placeholder="username"
          value={username}
          onChange={(ev) => setUsername(ev.target.value)}
        />
        <div style={{ marginBottom: 1 }} />
        <TextField
          placeholder="password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <Button type="submit" onClick={_register} style={{ fontSize: "1.2rem" }}>
          Register
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
    </div>
  );
};

export default Register;
