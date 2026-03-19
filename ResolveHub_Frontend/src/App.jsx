import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Dashboard from "./pages/dashboard/Dashboard";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import AdminComplaints from "./pages/dashboard/AdminComplaints";
import AdminUserComplaints from "./pages/dashboard/AdminUserComplaints";
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<LandingPage />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/dashboard" element={<PrivateRoute> <Dashboard /></PrivateRoute>} />

        <Route path="/admin" element={<PrivateRoute role="ADMIN"><AdminDashboard /></PrivateRoute>} />

        <Route path="/admin/complaints" element={<PrivateRoute role="ADMIN"><AdminComplaints /></PrivateRoute>} />

        <Route path="/admin/users" element={<PrivateRoute role="ADMIN"><AdminUserComplaints /></PrivateRoute>} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;