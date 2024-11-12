import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { placesRegister } from "../../store/index";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [registrationError, setRegistrationError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChange = (ev) => {
    setCredentials({ ...credentials, [ev.target.name]: ev.target.value });
  };

  const _register = async (ev) => {
    ev.preventDefault();
    try {
      await dispatch(placesRegister(credentials));
      navigate("places");
    } catch (ex) {
      setRegistrationError("Registration failed. Please try again.");
    }
  };

  return (
    <div id="places-registerPage">
      <h2>Register</h2>
      <form onSubmit={_register}>
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
          autoComplete="new-password"
          variant="outlined"
          value={credentials.password}
          onChange={onChange}
        />
        {registrationError && <p style={{ color: "red", fontSize: ".8rem" }}>{registrationError}</p>}
        <Button type="submit" variant="contained" color="primary" style={{ marginTop: "1rem" }}>
          Register
        </Button>
      </form>
    </div>
  );
};

export default Register;
