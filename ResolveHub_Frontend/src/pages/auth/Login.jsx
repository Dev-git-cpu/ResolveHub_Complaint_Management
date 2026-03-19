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
          localStorage.setItem("role", data.role);


if (data.role === "ADMIN") {
      navigate("/admin", { replace: true });
    } else {
      navigate("/dashboard", { replace: true });
    }
    toast.success("Login Successful")
      // navigate("/dashboard",{replace:true});
      console.log("Backend Role: ", data.role);
      

    } catch (error) {

      const message =
        error.response?.data?.message || "Login failed";

      toast.error(message);
      console.log(error);

    }

    setLoader(false)
  };

  return (

    <div className="min-h-screen flex items-center justify-center px-6 bg-black">

      <div className="relative w-full max-w-md">

        <div className="absolute inset-0 bg-emerald-500/20 blur-3xl rounded-3xl"></div>

        <div className="relative bg-[#0b0b0b] rounded-3xl p-10 border border-emerald-500/10 shadow-xl">

          <div className="text-center mb-8">

            <h1 className="text-3xl font-bold text-emerald-500">
              ResolveHub
            </h1>

            <h2 className="text-2xl font-semibold text-white mt-4">
              Welcome Back
            </h2>

            <p className="text-gray-400 mt-2">
              Track and manage your complaints easily
            </p>

          </div>

          <form onSubmit={LoginHandler} className="space-y-6">

            <div>

              <label className="block text-sm text-gray-300 mb-2">
                Email
              </label>

              <input
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
                type="text"
                placeholder="email"
                className="w-full bg-[#111] border border-emerald-500/10 rounded-xl px-4 py-3 text-white focus:border-emerald-500 outline-none"
              />

            </div>

            <div>

              <label className="block text-sm text-gray-300 mb-2">
                Password
              </label>

              <input
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
                type="password"
                placeholder="••••••••"
                className="w-full bg-[#111] border border-emerald-500/10 rounded-xl px-4 py-3 text-white focus:border-emerald-500 outline-none"
              />

            </div>

            <button
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-black font-semibold py-3 rounded-xl transition"
            >

              {loader ? (

                <TailSpin
                  height="20"
                  width="500"
                  color="#ffffff"
                />

              ) : "Login"}

            </button>

            <p className="text-center text-gray-400 text-sm mt-6">

              Don’t have an account?{" "}

              <span
                onClick={()=>navigate("/signup")}
                className="text-emerald-500 cursor-pointer hover:underline"
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