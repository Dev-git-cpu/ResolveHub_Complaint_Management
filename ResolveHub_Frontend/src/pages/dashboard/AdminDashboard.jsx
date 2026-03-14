import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {

  const navigate = useNavigate();

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

        <nav className="mt-6 space-y-2 px-4">

          <div className="flex items-center gap-3 px-4 py-3 font-bold bg-emerald-500 text-white rounded-xl cursor-pointer">
            Dashboard
          </div>

          <div
            onClick={() => navigate("/admin/complaints")}
            className="flex items-center gap-3 px-4 py-3 font-semibold text-gray-700 rounded-xl hover:bg-emerald-100 cursor-pointer transition"
          >
            All Complaints
          </div>

          <div
            onClick={() => navigate("/admin/users")}
            className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-xl font-semibold hover:bg-emerald-100 cursor-pointer transition"
          >
            Users
          </div>

        </nav>

        <div className="absolute bottom-6 left-6 text-red-500 cursor-pointer hover:underline">
          Logout
        </div>

      </div>


      {/* Main Content */}
      <div className="flex-1 p-10">

        <h1 className="text-3xl font-bold text-gray-800">
          Dashboard
        </h1>

        <p className="text-gray-500 mt-1 text-xl">
          Welcome to the admin dashboard
        </p>


        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-6 mt-8">

          <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl hover:shadow-md transition">
            <p className="font-semibold text-blue-600">Total Complaints</p>
            <h2 className="text-3xl font-bold text-blue-700 mt-2">
              1,234
            </h2>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-xl hover:shadow-md transition">
            <p className="font-semibold text-yellow-600">PENDING</p>
            <h2 className="text-3xl font-bold text-yellow-700 mt-2">
              42
            </h2>
          </div>

          <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl hover:shadow-md transition">
            <p className="font-semibold text-blue-600">IN_PROGRESS</p>
            <h2 className="text-3xl font-bold text-blue-700 mt-2">
              156
            </h2>
          </div>

          <div className="bg-green-50 border border-green-200 p-6 rounded-xl hover:shadow-md transition">
            <p className="text-sm text-emerald-600">RESOLVED</p>
            <h2 className="text-3xl font-bold text-emerald-700 mt-2">
              1,036
            </h2>
          </div>

        </div>


        {/* Quick Access */}
        <div className="mt-10 bg-white p-8 rounded-xl shadow-2xl">

          <h2 className="text-lg font-bold mb-6">
            Quick Access
          </h2>

          <div className="grid grid-cols-3 gap-6">

            <div
              onClick={() => navigate("/admin/complaints")}
              className="p-12 rounded-xl border border-gray-300 shadow-md hover:shadow-xl transition cursor-pointer text-center"
            >
              <h3 className="font-bold">
                All Complaints
              </h3>
              <p className="font-semibold text-gray-500 mt-2">
                View and manage complaints
              </p>
            </div>

            <div
              onClick={() => navigate("/admin/users")}
              className="p-12 rounded-xl border border-gray-300 shadow-md hover:shadow-xl transition cursor-pointer text-center"
            >
              <h3 className="font-bold">
                Users
              </h3>
              <p className="font-semibold text-gray-500 mt-2">
                Manage user accounts
              </p>
            </div>

            <div className="p-12 rounded-xl border border-gray-300 shadow-md hover:shadow-xl transition cursor-pointer text-center">
              <h3 className="font-bold">
                Pending Items
              </h3>
              <p className="font-semibold text-gray-500 mt-2">
                42 items need attention
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;