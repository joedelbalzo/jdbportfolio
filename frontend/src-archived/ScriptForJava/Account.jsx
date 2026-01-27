import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { scriptUpdateAuth } from "../store/index";
import { useNavigate, Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Account = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const { scriptAuth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (scriptAuth.id) {
      setFirstName(scriptAuth.firstName ? scriptAuth.firstName : "");
      setLastName(scriptAuth.lastName ? scriptAuth.lastName : "");
      setAddress(scriptAuth.address ? scriptAuth.address : "");
      setEmail(scriptAuth.email ? scriptAuth.email : "");
      setPhone(scriptAuth.phone ? scriptAuth.phone : "");
    }
  }, [scriptAuth]);

  const _update = async (ev) => {
    ev.preventDefault();
    dispatch(scriptUpdateAuth({ firstName, lastName, address, email, phone }));
    navigate("/menu");
  };
  return (
    <div style={{ margin: "auto", maxWidth: "80%" }}>
      {scriptAuth.id ? (
        <div>
          <h1>Enter Account Info Here</h1>
          <form onSubmit={_update}>
            <div style={{ marginBottom: 8 }} />
            <TextField
              label="First Name"
              variant="outlined"
              value={firstName}
              onChange={(ev) => setFirstName(ev.target.value)}
            />
            <div style={{ marginBottom: 8 }} />
            <TextField
              label="Last Name"
              variant="outlined"
              value={lastName}
              onChange={(ev) => setLastName(ev.target.value)}
            />
            <div style={{ marginBottom: 8 }} />
            <TextField
              label="Address"
              variant="outlined"
              value={address}
              onChange={(ev) => setAddress(ev.target.value)}
            />
            <div style={{ marginBottom: 8 }} />
            <TextField
              label="E-mail"
              variant="outlined"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
            />
            <div style={{ marginBottom: 8 }} />
            <TextField
              label="Phone"
              variant="outlined"
              value={phone}
              onChange={(ev) => setPhone(ev.target.value)}
            />

            <Button
              style={{ fontSize: 18 }}
              onClick={_update}
              disabled={
                firstName === scriptAuth.firstName &&
                lastName === scriptAuth.lastName &&
                address === scriptAuth.address &&
                email === scriptAuth.email &&
                phone === scriptAuth.phone
              }
            >
              Update Profile
            </Button>
          </form>
        </div>
      ) : (
        <div style={{ textAlign: "center", fontSize: "calc(12px + 0.5vw)", margin: "10vh auto" }}>
          Can't Update If You're Not Logged In!
          <div>
            <Link to={`/scriptforjava/register`}>Register Here</Link> or{" "}
            <Link to="/scriptforjava/login"> Login </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;
