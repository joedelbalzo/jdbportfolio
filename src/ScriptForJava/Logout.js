import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { scriptLogout } from "../store/index";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";

const Logout = () => {
  const { scriptAuth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const _logout = (user) => {
    dispatch(scriptLogout(user));
    navigate("/");
  };

  return (
    <div style={{ margin: "auto", maxWidth: "80%", fontSize: "1.4rem", padding: "1rem" }}>
      {scriptAuth.id ? (
        <div>
          <h1>Logout</h1>
          <div>
            Are you sure you want to log out?
            <Button variant="contained" onClick={(user) => _logout(user)}>
              Logout
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <h1>You're Not Logged In!</h1>
          <div>
            <Link to={`/scriptforjava/register`}>Register Here</Link> or{" "}
            <Link to="/scriptforjava/login"> Login </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Logout;
