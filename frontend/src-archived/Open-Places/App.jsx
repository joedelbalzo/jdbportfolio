// OpenPlacesApp.jsx
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { placesLoginWithToken } from "../store";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthRoute from "./Auth/AuthRoute";
import HomeNav from "./HomeNav";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import NearbyPlaces from "./Pages/NearbyPlaces";
import Settings from "./Pages/Settings";
import Favorites from "./Pages/Favorites";
import About from "./Pages/About";
import PortfolioFooters from "../PortfolioFooters";
import { FadeComponent } from "../FadeComponent";

const OpenPlacesApp = () => {
  const placesAuth = useSelector((state) => state.placesAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(placesLoginWithToken());
  }, [dispatch]);

  console.log(placesAuth?.id);

  return (
    <FadeComponent>
      <div className="OpenPlaces">
        <HomeNav />
        <Routes>
          {/* Redirect root to /places */}
          <Route path="/" element={<Navigate to="places" />} />

          {/* Authenticated Routes */}
          <Route
            path="places"
            element={
              <AuthRoute>
                <NearbyPlaces />
              </AuthRoute>
            }
          />
          <Route
            path="home"
            element={
              <AuthRoute>
                <NearbyPlaces />
              </AuthRoute>
            }
          />
          <Route
            path="settings"
            element={
              <AuthRoute>
                <Settings />
              </AuthRoute>
            }
          />
          <Route
            path="favorites"
            element={
              <AuthRoute>
                <Favorites />
              </AuthRoute>
            }
          />

          {/* Public Routes */}
          <Route path="about" element={<About />} />
          <Route path="login" element={placesAuth?.id ? <Navigate to="places" /> : <Login />} />
          <Route path="register" element={placesAuth?.id ? <Navigate to="places" /> : <Register />} />

          {/* Catch-all Route */}
          <Route path="*" element={<Navigate to="places" />} />
        </Routes>
        <PortfolioFooters />
      </div>
    </FadeComponent>
  );
};

export default OpenPlacesApp;
