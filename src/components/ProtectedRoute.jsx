import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ROLE_ROUTES = {
  admin: "/admin",
  teacher: "/teacher",
  student: "/student",
};

function ProtectedRoute({ children, role }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.status !== "approved") {
    return (
      <div className="auth-message auth-message--pending">
        Your account is not yet approved. Please wait for admin approval.
      </div>
    );
  }

  if (role && user.role !== role) {
    return <Navigate to={ROLE_ROUTES[user.role] || "/login"} replace />;
  }

  return children;
}

export default ProtectedRoute;
