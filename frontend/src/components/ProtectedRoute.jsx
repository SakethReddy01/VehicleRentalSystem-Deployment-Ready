import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ role, children }) {
  let user = null;
  try { user = JSON.parse(localStorage.getItem("user") || "null"); } catch { /* Invalid saved login; treat as signed out. */ }
  if (!user) return <Navigate to="/login" replace />;
  if (role && user.role !== role) return <Navigate to={user.role === "ADMIN" ? "/admin" : "/customer"} replace />;
  return children;
}

export default ProtectedRoute;
