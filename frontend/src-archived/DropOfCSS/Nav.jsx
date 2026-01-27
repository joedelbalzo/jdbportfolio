import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import colorWheelImage from "./images/colorwheel320.png";
import { cssLogout } from "../store";

const Nav = () => {
  const { cssAuth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    dispatch(cssLogout());
    navigate("/dropofcss/");
    window.location.reload();
  };

  return (
    <>
      <nav>
        <img src={colorWheelImage} />
        <div id="css-navSiteTitle">
          <h1>
            <Link
              to="/dropofcss/"
              style={{ color: "white", textDecoration: "none" }}
              className="css-main-title"
            >
              Drop of CSS
            </Link>
          </h1>
          <h5 style={{ padding: 0, color: "white" }} className="css-main-subtitle">
            JSX Color Palette and Component Builder
          </h5>
        </div>

        <div id="css-navlinks" style={{ justifyContent: "flex-end", marginRight: "2rem" }}>
          <div>
            {cssAuth.id && (
              <div>
                <Link
                  to="/dropofcss/"
                  style={{
                    fontSize: "calc(14px + 0.5vw)",
                    color: "white",
                    textDecoration: "none",
                    margin: ".5rem",
                  }}
                >
                  Home
                </Link>
                <Link
                  to="/dropofcss/profile"
                  style={{
                    color: "white",
                    fontSize: "calc(14px + 0.5vw)",
                    textDecoration: "none",
                    margin: ".5rem",
                  }}
                >
                  Profile
                </Link>
                <Link
                  style={{
                    color: "white",
                    fontSize: "calc(14px + 0.5vw)",
                    textDecoration: "none",
                    margin: ".5rem",
                  }}
                  onClick={handleLogout}
                >
                  Logout
                </Link>
              </div>
            )}
          </div>
          <div>
            {!cssAuth.id && (
              <div>
                <Link
                  to="/dropofcss/"
                  style={{
                    fontSize: "calc(14px + 0.5vw)",
                    color: "white",
                    textDecoration: "none",
                    margin: ".5rem",
                  }}
                >
                  Home
                </Link>
                <Link
                  style={{
                    color: "white",
                    fontSize: "calc(14px + 0.5vw)",
                    textDecoration: "none",
                    margin: ".5rem 2rem",
                  }}
                  to="/dropofcss/login"
                >
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
