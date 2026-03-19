import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AdminUserComplaints = () => {

  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  // Fetch users from backend
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/admin/users"); 
      setUsers(response.data || []); 
    } catch (error) {
      console.error(error);
      toast.error("Failed to load users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const totalUsers = users.length;
  const admins = users.filter(u => u.role === "ADMIN").length;
  const normalUsers = users.filter(u => u.role === "USER").length;

  const roleStyle = (role) => {
    if (role === "ADMIN") return "bg-purple-700 text-white";
    return "bg-emerald-600 text-white";
  };

  return (
    <div className="flex min-h-screen bg-[#0f0f0f] text-gray-100">

      {/* Sidebar */}
      <div className="w-64 bg-[#111] shadow-2xl rounded-2xl">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-emerald-500">ResolveHub</h1>
          <p className="font-semibold text-gray-300">Admin Panel</p>
        </div>

        <nav className="mt-6 space-y-2 px-4">
          <div onClick={() => navigate("/admin")} className="flex items-center gap-3 px-4 py-3 font-semibold rounded-xl cursor-pointer hover:bg-emerald-600 transition">Dashboard</div>
          <div onClick={() => navigate("/admin/complaints")} className="flex items-center gap-3 px-4 py-3 font-semibold text-gray-300 rounded-xl hover:bg-emerald-600 cursor-pointer transition">All Complaints</div>
          <div onClick={() => navigate("/admin/users")} className="flex items-center gap-3 px-4 py-3 rounded-xl font-semibold bg-emerald-500 text-white cursor-pointer transition">Users</div>
        </nav>

        <div className="absolute bottom-6 left-6 text-red-500 cursor-pointer hover:underline">Logout</div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">
        <h1 className="text-3xl font-bold text-emerald-400">All Users</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-6 mt-6">
          <div className="bg-gray-950 border border-emerald-600 p-6 rounded-xl hover:shadow-md transition">
            <p className="text-emerald-400 font-semibold">Total Users</p>
            <h2 className="text-3xl font-bold text-emerald-500 mt-2">{totalUsers}</h2>
          </div>
          <div className="bg-gray-950 border border-purple-700 p-6 rounded-xl hover:shadow-md transition">
            <p className="text-purple-400 font-semibold">Admins</p>
            <h2 className="text-3xl font-bold text-purple-500 mt-2">{admins}</h2>
          </div>
          <div className="bg-gray-950 border border-emerald-600 p-6 rounded-xl hover:shadow-md transition">
            <p className="text-emerald-400 font-semibold">Users</p>
            <h2 className="text-3xl font-bold text-emerald-500 mt-2">{normalUsers}</h2>
          </div>
        </div>

        {/* Search */}
        <div className="mt-6">
          <input 
            type="text" 
            placeholder="Search by name or email..." 
            className="w-full border border-emerald-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-gray-950 text-white hover:shadow-md transition" 
          />
        </div>

        {/* Users Table */}
        <div className="border bg-[#111] rounded-xl border-emerald-600 mt-8 overflow-hidden shadow-xl">
          <table className="w-full">
            <thead className="bg-emerald-600 text-white text-sm">
              <tr>
                <th className="text-left px-6 py-4">ID</th>
                <th className="text-left px-6 py-4">Name</th>
                <th className="text-left px-6 py-4">Email</th>
                <th className="text-left px-6 py-4">Role</th>
                <th className="text-left px-6 py-4">Joined</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border border-gray-700 hover:bg-gray-800 transition">
                  <td className="px-6 py-4 font-medium text-emerald-500">{user.id}</td>
                  <td className="px-6 py-4">{user.name}</td>
                  <td className="px-6 py-4 text-gray-300">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${roleStyle(user.role)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-300">{user.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default AdminUserComplaints;