import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  if (!token) {
    // Not logged in
    return <Navigate to="/login" replace />;
  }

  if (role && userRole !== role) {
    // Role mismatch
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;