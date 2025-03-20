import React from "react";
import { Navigate } from "react-router-dom";

const SecureLogin = ({ child }) => {
  const user = JSON.parse(localStorage.getItem("user")); // Retrieve user info from localStorage or other storage

  // Check if user exists and has the admin role
  if (user) {
    return <Navigate to="/" replace />; // Redirect to login if not authenticated or not an admin
  }

  // Render the child component (AdminPanel in this case)
  return <>{child}</>;
};

export default SecureLogin;
