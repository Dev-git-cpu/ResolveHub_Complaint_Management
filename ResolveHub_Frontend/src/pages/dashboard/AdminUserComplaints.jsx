import { useNavigate } from "react-router-dom"

const AdminUserComplaints = () => {

  const navigate = useNavigate();

  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "USER",
      createdAt: "20 Feb 2024"
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "USER",
      createdAt: "18 Feb 2024"
    },
    {
      id: 3,
      name: "Admin",
      email: "admin@resolvehub.com",
      role: "ADMIN",
      createdAt: "10 Feb 2024"
    }
  ];

  const totalUsers = users.length;
  const admins = users.filter(u => u.role === "ADMIN").length;
  const normalUsers = users.filter(u => u.role === "USER").length;

  const roleStyle = (role) => {

    if (role === "ADMIN")
      return "bg-purple-100 text-purple-700";

    return "bg-emerald-100 text-emerald-700";
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

        <nav className="mt-6 space-y-2 px-4">

          <div
            onClick={() => navigate("/admin")}
            className="flex items-center gap-3 px-4 py-3 font-semibold rounded-xl cursor-pointer"
          >
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
            className="flex items-center gap-3 px-4 py-3 rounded-xl font-semibold bg-emerald-500 text-white cursor-pointer transition"
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
          All Users
        </h1>


        {/* Stats Cards */}

        <div className="grid grid-cols-3 gap-6 mt-6">

          <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl hover:shadow-md transition">
            <p className="text-blue-600 font-semibold">Total Users</p>
            <h2 className="text-3xl font-bold text-blue-700 mt-2">
              {totalUsers}
            </h2>
          </div>

          <div className="bg-purple-50 border border-purple-200 p-6 rounded-xl hover:shadow-md transition">
            <p className="text-purple-600 font-semibold">Admins</p>
            <h2 className="text-3xl font-bold text-purple-700 mt-2">
              {admins}
            </h2>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-xl hover:shadow-md transition">
            <p className="text-emerald-600 font-semibold">Users</p>
            <h2 className="text-3xl font-bold text-emerald-700 mt-2">
              {normalUsers}
            </h2>
          </div>

        </div>


        {/* Search */}

        <div className="mt-6">
          <input
            type="text"
            placeholder="Search by name or email..."
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-400 hover:shadow-md transition"
          />
        </div>


        {/* Users Table */}

        <div className="border bg-white rounded-xl border-gray-300 mt-8 overflow-hidden shadow-xl">

          <table className="w-full">

            <thead className="bg-emerald-50 text-gray-600 text-sm">

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

                <tr
                  key={user.id}
                  className="border border-gray-300 hover:bg-gray-50 transition"
                >

                  <td className="px-6 py-4 font-medium text-green-600">
                    {user.id}
                  </td>

                  <td className="px-6 py-4">
                    {user.name}
                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    {user.email}
                  </td>

                  <td className="px-6 py-4">

                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${roleStyle(user.role)}`}>
                      {user.role}
                    </span>

                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    {user.createdAt}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  )
}

export default AdminUserComplaints