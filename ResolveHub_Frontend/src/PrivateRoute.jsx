import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  
  const userId = localStorage.getItem("userId");

  console.log("PrivateRoute userId:", userId);

  return userId ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;