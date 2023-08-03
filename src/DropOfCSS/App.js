import React, { useEffect, useRef, useState } from "react";
import Home from "./Home";
import Nav from "./Nav";
import Login from "./Login";
import Profile from "./Profile";
import ColorGenForm from "./ColorGenForm";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route, useNavigate } from "react-router-dom";
import { cssLoginWithToken, cssFetchComponents, cssFetchColorPalette } from "../store";
import UserCreate from "./UserCreate";

const CssApp = () => {
  const { cssAuth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const prevAuth = useRef(cssAuth);

  useEffect(() => {
    dispatch(cssLoginWithToken());
  }, []);

  useEffect(() => {
    if (!prevAuth.current.id && cssAuth.id) {
      console.log(`${cssAuth.username} is logged in`);
      dispatch(cssFetchComponents());
    }
    if (prevAuth.current.id && !cssAuth.id) {
      console.log("logged out");
    }
  }, [cssAuth]);

  useEffect(() => {
    prevAuth.current = cssAuth;
  });

  return (
    <div className="DropOfCss">
      <Nav />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          {!cssAuth.id && (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<UserCreate />} />
            </>
          )}
          {cssAuth.id && (
            <>
              <Route path="/profile" element={<Profile />} />
            </>
          )}
        </Routes>
      </div>
    </div>
  );
};

export default CssApp;
