// src/routes/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const ProtectedRoute = ({ children }) => {
  const { user, authLoading } = useAuth();

  if (authLoading) return null; // or a loader component

  return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
