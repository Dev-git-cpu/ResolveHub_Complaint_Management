import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [complaints, setComplaints] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    resolved: 0
  });

  // Fetch complaints from backend
  const fetchComplaints = async () => {
    try {
      const response = await axios.get("http://localhost:8080/admin/complaints?page=0&size=100");
      const complaintList = response.data.content || [];

      // Sort descending by ID (latest first)
      complaintList.sort((a, b) => b.id - a.id);

      setComplaints(complaintList);

      // Calculate stats
      const total = complaintList.length;
      const pending = complaintList.filter(c => c.status === "PENDING").length;
      const inProgress = complaintList.filter(c => c.status === "IN_PROGRESS").length;
      const resolved = complaintList.filter(c => c.status === "RESOLVED").length;

      setStats({ total, pending, inProgress, resolved });
    } catch (error) {
      console.error(error);
      toast.error("Failed to load complaints");
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-[#0f0f0f] text-gray-100">

      {/* Sidebar */}
      <div className="w-64 bg-[#111] shadow-2xl rounded-2xl">

        <div className="p-6">
          <h1 className="text-2xl font-bold text-emerald-500">
            ResolveHub
          </h1>
          <p className="font-semibold text-gray-300">Admin Panel</p>
        </div>

        <nav className="mt-6 space-y-2 px-4">
          <div className="flex items-center gap-3 px-4 py-3 font-bold bg-emerald-600 text-white rounded-xl cursor-pointer">
            Dashboard
          </div>

          <div
            onClick={() => navigate("/admin/complaints")}
            className="flex items-center gap-3 px-4 py-3 font-semibold text-gray-100 rounded-xl hover:bg-emerald-500 cursor-pointer transition"
          >
            All Complaints
          </div>

          <div
            onClick={() => navigate("/admin/users")}
            className="flex items-center gap-3 px-4 py-3 text-gray-100 rounded-xl font-semibold hover:bg-emerald-500 cursor-pointer transition"
          >
            Users
          </div>
        </nav>

        <div
          onClick={handleLogout}
          className="absolute bottom-6 left-6 text-red-500 cursor-pointer hover:underline"
        >
          Logout
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">

        <h1 className="text-3xl font-bold text-emerald-400">
          Dashboard
        </h1>

        <p className="text-gray-300 mt-1 text-xl">
          Welcome to the admin dashboard
        </p>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-6 mt-8">

          <div className="bg-gray-950 border border-emerald-600 p-6 rounded-xl hover:shadow-md transition">
            <p className="font-semibold text-emerald-400">Total Complaints</p>
            <h2 className="text-3xl font-bold text-emerald-500 mt-2">
              {stats.total}
            </h2>
          </div>

          <div className="bg-gray-950 border border-emerald-600 p-6 rounded-xl hover:shadow-md transition">
            <p className="font-semibold text-yellow-400">PENDING</p>
            <h2 className="text-3xl font-bold text-yellow-500 mt-2">
              {stats.pending}
            </h2>
          </div>

          <div className="bg-gray-950 border border-emerald-600 p-6 rounded-xl hover:shadow-md transition">
            <p className="font-semibold text-blue-400">IN_PROGRESS</p>
            <h2 className="text-3xl font-bold text-blue-500 mt-2">
              {stats.inProgress}
            </h2>
          </div>

          <div className="bg-gray-950 border border-emerald-600 p-6 rounded-xl hover:shadow-md transition">
            <p className="text-sm text-emerald-400">RESOLVED</p>
            <h2 className="text-3xl font-bold text-emerald-500 mt-2">
              {stats.resolved}
            </h2>
          </div>

        </div>

        {/* Quick Access */}
        <div className="mt-10 bg-[#111] p-8 rounded-xl shadow-2xl">

          <h2 className="text-lg font-bold mb-6 text-emerald-400">
            Quick Access
          </h2>

          <div className="grid grid-cols-3 gap-6">

            <div
              onClick={() => navigate("/admin/complaints")}
              className="p-12 rounded-xl border border-emerald-600 shadow-md hover:shadow-xl transition cursor-pointer text-center"
            >
              <h3 className="font-bold text-emerald-500">
                All Complaints
              </h3>
              <p className="font-semibold text-gray-300 mt-2">
                View and manage complaints
              </p>
            </div>

            <div
              onClick={() => navigate("/admin/users")}
              className="p-12 rounded-xl border border-emerald-600 shadow-md hover:shadow-xl transition cursor-pointer text-center"
            >
              <h3 className="font-bold text-emerald-500">
                Users
              </h3>
              <p className="font-semibold text-gray-300 mt-2">
                Manage user accounts
              </p>
            </div>

            <div
              onClick={() => navigate("/admin/complaints")}
              className="p-12 rounded-xl border border-emerald-600 shadow-md hover:shadow-xl transition cursor-pointer text-center"
            >
              <h3 className="font-bold text-emerald-500">
                Pending Items
              </h3>
              <p className="font-semibold text-gray-300 mt-2">
                {stats.pending} items need attention
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;