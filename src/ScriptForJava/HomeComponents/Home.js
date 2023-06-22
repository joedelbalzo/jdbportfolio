import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import SubNavHome from "./SubNavHome";

const Home = () => {
  const { scriptAuth, scriptReviews } = useSelector((state) => state);
  const dispatch = useDispatch();
  return (
    <>
      <SubNavHome />

      {!scriptAuth.id ? (
        <div id="scriptforjava-homepage">
          <div>
            <h2
              style={{ textDecoration: "none", color: "inherit", fontSize: "calc(14px + 0.5vw)" }}
            >
              Welcome! Please log in to place an order, but feel free to browse!
            </h2>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Button
                variant="outlined"
                style={{ width: "calc(200px + 2vw)", margin: "auto", marginBottom: "1rem" }}
              >
                <Link
                  to={`/scriptforjava/register`}
                  style={{ fontSize: "calc(14px + 0.5vw)", fontWeight: "500" }}
                >
                  Register Here
                </Link>
              </Button>
              <Button variant="outlined" style={{ width: "calc(200px + 2vw)", margin: "auto" }}>
                <Link
                  to="/scriptforjava/login"
                  style={{ fontSize: "calc(14px + 0.5vw)", fontWeight: "500" }}
                >
                  Login
                </Link>
              </Button>
            </div>
          </div>

          <div id="scriptforjava-homepageImage" />
        </div>
      ) : (
        <div id="scriptforjava-homepage">
          <h1>Welcome, {scriptAuth.username}!</h1>
          <div>
            {scriptAuth.adminStatus === true ? (
              <div>
                <Link to="/admin">Admin Tools</Link>
              </div>
            ) : (
              <div>
                Please browse amongst our delicious selection of drinks or our fashionable merch.
                <br />
                <Link to="/reviews">Create And See Your Reviews</Link>
                <br />
                <Link to="/reviews/all">Read Our Reviews({scriptReviews.length})</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
