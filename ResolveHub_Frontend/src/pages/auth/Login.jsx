import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { TailSpin } from "react-loader-spinner";
import axios from "axios";

const Login = () => {

  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [loader, setLoader] = useState(false)

  const navigate = useNavigate()

  const LoginHandler = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.warning("All fields are required");
      return;
    }

    setLoader(true)

    try {

      const response = await axios.post(
        "http://localhost:8080/auth/login",
        {
          email,
          password
        }
      );

      const data = response.data;

      console.log("Response:", data);

      // ⭐ Correct storage
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.id);
      localStorage.setItem("email", data.email);

      toast.success("Login Successful");

      navigate("/dashboard",{replace:true});

    } catch (error) {

      const message =
        error.response?.data?.message || "Login failed";

      toast.error(message);
      console.log(error);

    }

    setLoader(false)
  };

  return (

    <div className="min-h-screen flex items-center justify-center px-6 bg-[#F8FAFC]">

      <div className="relative w-full max-w-md">

        <div className="absolute inset-0 bg-[#79DB9B]/30 blur-3xl rounded-3xl"></div>

        <div className="relative bg-white rounded-3xl p-10 border border-gray-200 shadow-xl">

          <div className="text-center mb-8">

            <h1 className="text-3xl font-bold text-emerald-600">
              ResolveHub
            </h1>

            <h2 className="text-2xl font-semibold text-[#0F172A] mt-4">
              Welcome Back
            </h2>

            <p className="text-[#475569] mt-2">
              Track and manage your complaints easily
            </p>

          </div>

          <form onSubmit={LoginHandler} className="space-y-6">

            <div>

              <label className="block text-sm text-gray-700 mb-2">
                Email
              </label>

              <input
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
                type="text"
                placeholder="email"
                className="w-full bg-[#F1F5F9] border border-gray-300 rounded-xl px-4 py-3 text-[#0F172A] focus:border-emerald-500 outline-none"
              />

            </div>

            <div>

              <label className="block text-sm text-gray-700 mb-2">
                Password
              </label>

              <input
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
                type="password"
                placeholder="••••••••"
                className="w-full bg-[#F1F5F9] border border-gray-300 rounded-xl px-4 py-3 text-[#0F172A] focus:border-emerald-500 outline-none"
              />

            </div>

            <button
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-xl transition"
            >

              {loader ? (

                <TailSpin
                  height="20"
                  width="20"
                  color="#ffffff"
                />

              ) : "Login"}

            </button>

            <p className="text-center text-[#475569] text-sm mt-6">

              Don’t have an account?{" "}

              <span
                onClick={()=>navigate("/signup")}
                className="text-emerald-600 cursor-pointer hover:underline"
              >
                Register
              </span>

            </p>

          </form>

        </div>

      </div>

    </div>
  );
};

export default Login;