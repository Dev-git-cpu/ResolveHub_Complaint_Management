import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {

  const navigate = useNavigate();

  const categories = [
    "FAILED_TRANSACTION",
    "WRONG_TRANSFER",
    "PENDING_TRANSACTION",
    "ACCOUNT_ISSUE",
    "OTHER"
  ];

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [complaints, setComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  const userId = localStorage.getItem("userId");

  // FETCH COMPLAINTS
  const fetchComplaints = async () => {

    if (!userId) {
      toast.error("User not logged in");
      navigate("/",{replace:true});
      return;
    }

    try {

      const res = await axios.get(
        `http://localhost:8080/complaints/user/${userId}`
      );

      setComplaints(res.data);

    } catch (error) {

      console.error(error);
      toast.error("Failed to load complaints");

    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  // SUBMIT COMPLAINT
  const ComplaintHandler = async () => {

    if (!title || !category || !description) {
      toast.warning("All fields are required");
      return;
    }

    try {

      const response = await axios.post(
        `http://localhost:8080/complaints/${userId}`,
        {
          title,
          category,
          description
        }
      );

      console.log(response.data);

      toast.success("Complaint Submitted");

      fetchComplaints();

      setTitle("");
      setCategory("");
      setDescription("");

    } catch (error) {

      console.error(error);
      toast.error("Failed to submit complaint");

    }
  };

  // LOGOUT
  const handleLogout = () => {

    localStorage.clear();
    navigate("/");

  };

  const resolvedCount =
    complaints.filter((c) => c.status === "RESOLVED").length;

  return (
    <div className="min-h-screen bg-[#F8FAFC]">

      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-6 bg-white border-b border-gray-200">
        <h1 className="text-3xl font-bold text-emerald-600">
          ResolveHub
        </h1>

        <div className="flex gap-4">
          <button className="px-4 py-2 bg-emerald-100 rounded-lg text-[#0F172A] cursor-pointer">
            Profile
          </button>

          <button
            onClick={handleLogout}
            className="text-red-500 font-medium cursor-pointer"
          >
            Logout
          </button>
        </div>
      </nav>


      {/* Main Content */}
      <div className="grid md:grid-cols-3 gap-8 px-10 py-10">

        {/* Complaint Form */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">

          <h2 className="text-2xl font-semibold text-[#0F172A] mb-2">
            File a New Complaint
          </h2>

          <p className="text-[#475569] mb-6">
            Please provide details about your complaint. We'll review and respond promptly.
          </p>

          <div className="space-y-4">

            <div>
              <label className="text-sm text-[#0F172A]">Complaint Title</label>
              <input
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
                type="text"
                placeholder="Brief title of your complaint..."
                className="w-full mt-2 bg-[#F1F5F9] border border-gray-300 rounded-lg px-4 py-2"
              />
            </div>

            <div>
              <label className="text-sm text-[#0F172A]">Category</label>
              <select
                value={category}
                onChange={(e)=>setCategory(e.target.value)}
                className="w-full mt-2 bg-[#F1F5F9] border border-gray-300 rounded-lg px-4 py-2"
              >
                <option value="">Select a category</option>

                {categories.map((cat)=>(
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}

              </select>
            </div>

            <div>
              <label className="text-sm text-[#0F172A]">Description</label>
              <textarea
                value={description}
                onChange={(e)=>setDescription(e.target.value)}
                rows="4"
                placeholder="Provide detailed information about your complaint..."
                className="w-full mt-2 bg-[#F1F5F9] border border-gray-300 rounded-lg px-4 py-2"
              ></textarea>
            </div>

            <button
              onClick={ComplaintHandler}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-xl font-medium"
            >
              Submit Complaint
            </button>

          </div>
        </div>


        {/* Complaint Table */}
        <div className="md:col-span-2 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">

          <h2 className="text-2xl font-semibold text-[#0F172A] mb-2">
            My Complaints
          </h2>

          <p className="text-[#475569] mb-6">
            Track and manage all your submitted complaints
          </p>

          <input
            type="text"
            placeholder="Search complaints..."
            className="w-full bg-[#F1F5F9] border border-gray-300 rounded-lg px-4 py-2 mb-6"
          />

          <table className="w-full text-left">

            <thead className="text-[#0F172A] border-b">
              <tr>
                <th className="py-2">ID</th>
                <th className="py-2">Title</th>
                <th className="py-2">Category</th>
                <th className="py-2">Status</th>
                <th className="py-2">Date</th>
                <th className="py-2">Action</th>
              </tr>
            </thead>

            <tbody className="text-[#475569]">

              {complaints.map((c)=>(
                <tr key={c.id} className="border-b">

                  <td className="py-3 text-emerald-600 font-medium">
                    {c.id}
                  </td>

                  <td>{c.title}</td>

                  <td>{c.category}</td>

                  <td>
                    <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                      {c.status}
                    </span>
                  </td>

                  <td>
                    {new Date(c.createdAt).toLocaleDateString()}
                  </td>

                  <td>
                    <button
                      onClick={()=>setSelectedComplaint(c)}
                      className="text-emerald-600 font-medium cursor-pointer"
                    >
                      View
                    </button>
                  </td>

                </tr>
              ))}

            </tbody>

          </table>

          <div className="flex justify-between mt-6 text-[#475569] text-sm">
            <span>Total: {complaints.length}</span>
            <span className="text-emerald-600">
              Resolved: {resolvedCount}
            </span>
          </div>

        </div>

      </div>


      {/* Complaint Modal */}
      {selectedComplaint && (

        <div className="fixed inset-0  bg-emerald-50 bg-opacity-30 flex items-center justify-center ">

          <div className="border border-emerald-500 bg-white p-10 rounded-xl w-96 shadow-2xl">

            <h2 className="text-xl font-bold mb-4">
              Complaint Details
            </h2>

            <p><b>Title:</b> {selectedComplaint.title}</p>

            <p><b>Category:</b> {selectedComplaint.category}</p>

            <p><b>Status:</b> {selectedComplaint.status}</p>

            <p className="mt-3">
              <b>Description:</b>
            </p>

            <p className="text-gray-600">
              {selectedComplaint.description}
            </p>

            <button
              onClick={()=>setSelectedComplaint(null)}
              className="mt-4 bg-emerald-500 text-white px-4 py-2 rounded cursor-pointer"
            >
              Close
            </button>

          </div>

        </div>

      )}

    </div>
  );
};

export default Dashboard;