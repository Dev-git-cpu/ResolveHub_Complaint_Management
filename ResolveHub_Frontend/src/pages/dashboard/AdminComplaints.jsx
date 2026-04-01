import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosInstance";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;

const AdminComplaints = () => {

  const navigate = useNavigate();

  const [complaints,setComplaints] = useState([])
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  const fetchComplaints = async () => {
    try {
      const response = await axiosInstance.get("/admin/complaints", { withCredentials: true });
      const complaintsList = response.data.content || [];
      complaintsList.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setComplaints(complaintsList);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load complaints");
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  // STATUS UPDATE API
  const updateStatus = async (complaintId, newStatus) => {
    try {
      const complaint = complaints.find(c => c.id === complaintId);
      await axiosInstance.put(
        `${API_URL}/admin/complaints/${complaintId}`,
        {
          status: newStatus,
          title: complaint.title,
          description: complaint.description
        },
        { withCredentials: true }
      );
      toast.success("Complaint Updated");

      // UI update without reload
      setComplaints((prev)=>
        prev.map((c)=>
          c.id === complaintId
            ? { ...c, status: newStatus }
            : c
        )
      );

    } catch (error) {
      console.log(error);
      toast.error("Status update failed");
    }
  };

  const statusStyle = (status) => {
    if (status === "PENDING") return "bg-yellow-600 text-white";
    if (status === "RESOLVED") return "bg-emerald-600 text-white";
    return "bg-blue-600 text-white";
  };

  return (
    <div className="flex min-h-screen bg-[#0f0f0f] text-gray-100">

      {/* Sidebar */}
      <div className="w-64 bg-[#111] shadow-2xl rounded-2xl">

        <div className="p-6">
          <h1 className="text-2xl font-bold text-emerald-500">ResolveHub</h1>
          <p className="font-semibold text-gray-300">Admin Panel</p>
        </div>

        <div className="px-4 space-y-2 mt-6">
          <div
            onClick={() => navigate("/admin")}
            className="px-4 py-3 rounded-lg cursor-pointer font-semibold hover:bg-emerald-600 transition"
          >
            Dashboard
          </div>

          <div
            onClick={() => navigate("/admin/complaints")}
            className="px-4 py-3 rounded-lg font-bold bg-emerald-500 text-white cursor-pointer"
          >
            All Complaints
          </div>

          <div
            onClick={() => navigate("/admin/users")}
            className="px-4 py-3 rounded-lg cursor-pointer font-semibold hover:bg-emerald-600 transition"
          >
            Users
          </div>

          <div className="absolute bottom-6 left-6 text-red-500 cursor-pointer hover:underline">
            Logout
          </div>
        </div>

      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">

        <h1 className="text-3xl font-bold text-emerald-400">
          All Complaints
        </h1>

        {/* Status Cards */}
        <div className="grid grid-cols-3 gap-6 mt-6">

          <div className="bg-gray-950 border border-emerald-600 p-6 rounded-xl hover:shadow-md transition">
            <p className="text-yellow-400 font-semibold">PENDING</p>
            <h2 className="text-3xl font-bold text-yellow-500 mt-2">
              {complaints.filter(c=>c.status === "PENDING").length}
            </h2>
          </div>

          <div className="bg-gray-950 border border-emerald-600 p-6 rounded-xl hover:shadow-md transition">
            <p className="text-blue-400 font-semibold">IN_PROGRESS</p>
            <h2 className="text-3xl font-bold text-blue-500 mt-2">
              {complaints.filter(c=>c.status === "IN_PROGRESS").length}
            </h2>
          </div>

          <div className="bg-gray-950 border border-emerald-600 p-6 rounded-xl hover:shadow-md transition">
            <p className="text-emerald-400 font-semibold">RESOLVED</p>
            <h2 className="text-3xl font-bold text-emerald-500 mt-2">
              {complaints.filter(c=>c.status === "RESOLVED").length}
            </h2>
          </div>

        </div>

        {/* Search */}
        <div className="mt-6">
          <input
            type="text"
            placeholder="Search by ID, title, or user name..."
            className="w-full border border-emerald-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-gray-950 text-white hover:shadow-md transition"
          />
        </div>

        {/* Table */}
        <div className="border bg-[#111] rounded-xl border-emerald-600 mt-8 overflow-hidden shadow-xl">

          <table className="w-full">
            <thead className="bg-emerald-600 text-white text-sm">
              <tr>
                <th className="text-left px-6 py-4">ID</th>
                <th className="text-left px-6 py-4">User Name</th>
                <th className="text-left px-6 py-4">Title</th>
                <th className="text-left px-6 py-4">Category</th>
                <th className="text-left px-6 py-4">Status</th>
                <th className="text-left px-6 py-4">Date</th>
                <th className="text-left px-6 py-4">View</th>
                <th className="text-left px-6 py-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {complaints.map((c) => (
                <tr
                  key={c.id}
                  className="border border-gray-700 hover:bg-gray-800 transition"
                >

                  <td className="px-6 py-4 font-medium text-emerald-500">{c.id}</td>
                  <td className="px-6 py-4">{c.name}</td>
                  <td className="px-6 py-4">{c.title}</td>
                  <td className="px-6 py-4 text-gray-300">{c.category}</td>

                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusStyle(c.status)}`}>
                      {c.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-gray-300">{c.date}</td>

                  {/* VIEW BUTTON */}
                  <td className="px-6 py-4">
                    <button
                      onClick={() => setSelectedComplaint(c)}
                      className="bg-emerald-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-emerald-600"
                    >
                      View
                    </button>
                  </td>

                  {/* STATUS UPDATE */}
                  <td className="px-6 py-4">
                    <select
                      value={c.status}
                      onChange={(e)=>updateStatus(c.id,e.target.value)}
                      className="border border-emerald-600 bg-gray-800 rounded-lg px-3 py-1 text-sm text-white focus:outline-none"
                    >
                      <option value="SUBMITTED">SUBMITTED</option>
                       <option value="IN_PROGRESS">IN_PROGRESS</option>
                        <option value="RESOLVED">RESOLVED</option>
                      <option value="PENDING">PENDING</option>
                    </select>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* DESCRIPTION MODAL */}
        {selectedComplaint && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-[#111] p-8 rounded-xl w-125 shadow-xl text-white">
              <h2 className="text-2xl font-bold mb-4 text-emerald-400">Complaint Details</h2>
              <p className="mb-2"><b>ID:</b> {selectedComplaint.id}</p>
              <p className="mb-2"><b>User:</b> {selectedComplaint.name}</p>
              <p className="mb-2"><b>Title:</b> {selectedComplaint.title}</p>
              <p className="mb-2"><b>Category:</b> {selectedComplaint.category}</p>
              <p className="mb-2"><b>Status:</b> {selectedComplaint.status}</p>

              <p className="mt-4 font-semibold">Description:</p>
              <p className="text-gray-300 mt-1">{selectedComplaint.description}</p>

              <button
                onClick={() => setSelectedComplaint(null)}
                className="mt-6 bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600"
              >
                Close
              </button>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};

export default AdminComplaints;