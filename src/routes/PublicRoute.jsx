// src/routes/PublicRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const user = localStorage.getItem("user"); // or use your context/auth state

  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicRoute;
