import { useNavigate } from "react-router-dom";
import { useState } from "react";

const AdminComplaints = () => {

  const navigate = useNavigate();
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  const complaints = [
    {
      id: 1,
      name: "John Doe",
      title: "Service delay on platform",
      description: "The service request I submitted 3 days ago is still not processed.",
      category: "Service Quality",
      status: "IN_PROGRESS",
      date: "Feb 20, 2024"
    },
    {
      id: 2,
      name: "Jane Smith",
      title: "Billing discrepancy",
      description: "My last invoice shows extra charges which were not explained.",
      category: "Billing Issue",
      status: "PENDING",
      date: "Feb 18, 2024"
    },
    {
      id: 3,
      name: "Robert Johnson",
      title: "Application crash issue",
      description: "Application crashes whenever I upload a document.",
      category: "Technical Issue",
      status: "RESOLVED",
      date: "Feb 15, 2024"
    }
  ];

  const statusStyle = (status) => {

    if (status === "PENDING")
      return "bg-yellow-100 text-yellow-700";

    if (status === "RESOLVED")
      return "bg-green-100 text-green-700";

    return "bg-blue-100 text-blue-700";
  };

  return (

    <div className="flex min-h-screen bg-[#f6f8fb]">

      {/* Sidebar */}

      <div className="w-64 bg-emerald-50 shadow-2xl rounded-2xl">

        <div className="p-6">
          <h1 className="text-2xl font-bold text-emerald-600">
            ResolveHub
          </h1>
          <p className="font-semibold text-gray-500">Admin Panel</p>
        </div>

        <div className="px-4 space-y-2 mt-6">

          <div
            onClick={() => navigate("/admin")}
            className="px-4 py-3 rounded-lg cursor-pointer font-semibold hover:bg-emerald-100"
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
            className="px-4 py-3 rounded-lg cursor-pointer font-semibold hover:bg-emerald-100"
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

        <h1 className="text-3xl font-bold text-gray-800">
          All Complaints
        </h1>


        {/* Status Cards */}

        <div className="grid grid-cols-3 gap-6 mt-6">

          <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-xl hover:shadow-md transition">
            <p className="text-yellow-600 font-semibold">PENDING</p>
            <h2 className="text-3xl font-bold text-yellow-700 mt-2">2</h2>
          </div>

          <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl hover:shadow-md transition">
            <p className="text-blue-600 font-semibold">IN_PROGRESS</p>
            <h2 className="text-3xl font-bold text-blue-700 mt-2">3</h2>
          </div>

          <div className="bg-green-50 border border-green-200 p-6 rounded-xl hover:shadow-md transition">
            <p className="text-green-600 font-semibold">RESOLVED</p>
            <h2 className="text-3xl font-bold text-green-700 mt-2">1</h2>
          </div>

        </div>


        {/* Search */}

        <div className="mt-6">
          <input
            type="text"
            placeholder="Search by ID, title, or user name..."
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-400 hover:shadow-md transition"
          />
        </div>


        {/* Table */}

        <div className="border bg-white rounded-xl border-gray-300 mt-8 overflow-hidden shadow-xl">

          <table className="w-full">

            <thead className="bg-emerald-50 text-gray-600 text-sm">
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
                  className="border border-gray-300 hover:bg-gray-50 transition"
                >

                  <td className="px-6 py-4 font-medium text-green-600">
                    {c.id}
                  </td>

                  <td className="px-6 py-4">{c.name}</td>

                  <td className="px-6 py-4">{c.title}</td>

                  <td className="px-6 py-4 text-gray-600">
                    {c.category}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${statusStyle(c.status)}`}
                    >
                      {c.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    {c.date}
                  </td>

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

                    <select className="border border-gray-400 bg-gray-100 rounded-lg px-3 py-1 text-sm focus:outline-none">
                      <option>PENDING</option>
                      <option>IN_PROGRESS</option>
                      <option>RESOLVED</option>
                    </select>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>


      {/* DESCRIPTION MODAL */}

      {selectedComplaint && (

        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">

          <div className="bg-white p-8 rounded-xl w-125 shadow-xl">

            <h2 className="text-2xl font-bold mb-4">
              Complaint Details
            </h2>

            <p className="mb-2"><b>ID:</b> {selectedComplaint.id}</p>
            <p className="mb-2"><b>User:</b> {selectedComplaint.name}</p>
            <p className="mb-2"><b>Title:</b> {selectedComplaint.title}</p>
            <p className="mb-2"><b>Category:</b> {selectedComplaint.category}</p>
            <p className="mb-2"><b>Status:</b> {selectedComplaint.status}</p>

            <p className="mt-4 font-semibold">Description:</p>
            <p className="text-gray-600 mt-1">
              {selectedComplaint.description}
            </p>

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
  );
};

export default AdminComplaints;