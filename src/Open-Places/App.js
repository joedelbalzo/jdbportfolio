import React, { useEffect, useRef } from "react";
import Settings from "./Settings";
import Favorites from "./Favorites";
import HomeNav from "./HomeNav";
import Login from "./Login";
import NearbyPlaces from "./NearbyPlaces";
import About from "./About";
import { useSelector, useDispatch } from "react-redux";
import { placesLoginWithToken } from "../store/index";
import { Routes, Route, Navigate } from "react-router-dom";
import Register from "./Register";

const OpenPlacesApp = () => {
  const { placesAuth } = useSelector((state) => state);
  const prevAuth = useRef(placesAuth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(placesLoginWithToken());
  }, []);

  useEffect(() => {
    if (!prevAuth.current.id && placesAuth.id) {
      console.log("you just logged in");
    }
    if (!prevAuth.current.id && !placesAuth.id) {
      console.log("you just logged out");
    }
  }, [placesAuth]);

  return (
    <div className="OpenPlaces">
      <HomeNav />
      <Routes>
        <Route path="/openplaces" element={placesAuth.id ? <Navigate to="/places" /> : <Login />} />

        <Route path="/places" element={placesAuth.id ? <NearbyPlaces /> : <Login />} />
        <Route path="/home" element={placesAuth.id ? <NearbyPlaces /> : <Login />} />
        <Route path="/settings" element={placesAuth.id ? <Settings /> : <Login />} />
        <Route path="/favorites" element={placesAuth.id ? <Favorites /> : <Login />} />
        <Route path="/about" element={<About />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default OpenPlacesApp;
