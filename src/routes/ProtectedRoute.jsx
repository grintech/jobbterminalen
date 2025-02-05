import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../store/authContext";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { user, loading } = useAuthContext();

  if (loading) {
    return <div>Loading...</div>; // Add a loading spinner or fallback UI if needed
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
