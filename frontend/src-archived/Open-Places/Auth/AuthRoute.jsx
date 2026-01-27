import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AuthRoute = ({ children }) => {
  const { placesAuth } = useSelector((state) => state);
  return placesAuth.id ? children : <Navigate to="/login" />;
};

export default AuthRoute;
