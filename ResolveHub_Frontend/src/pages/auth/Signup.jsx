import axios from "axios";
import { useState } from "react";
import {  useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import { TailSpin } from "react-loader-spinner";


 const Signup = () => {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loader, setLoader] = useState("")

  const navigate = useNavigate()

  const SignUpHandler = async (e) =>{
    e.preventDefault();

    setLoader(true)

    if(!name || !email || !password){
toast.warning("All fields are required")
return;
    }

    try {
      const data = axios.post(
        "http://localhost:8080/auth/register",
        {name,email,password}
      );
      toast.success("Account created! Please login 🔐")
      navigate("/login",{replace:true})
      
    } catch (error) {
      const message =
        error.response?.data?.message || "Signup failed";
      toast.error(message);
    }
    setLoader(false)


  }
  return (
    <>
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-6">
  <div className="relative w-full max-w-md m-10">

    <div className="absolute inset-0 bg-[#79DB9B]/30 blur-3xl rounded-3xl"></div>

    <div className="relative bg-white rounded-3xl p-10 border border-gray-200 shadow-xl">

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-emerald-600">
          ResolveHub
        </h1>

        <h2 className="text-2xl font-semibold text-[#0F172A] mt-4">
          Create Account
        </h2>

        <p className="text-[#475569] mt-2">
          Create an account to track complaints
        </p>
      </div>

      <form className="space-y-6"
      onSubmit={SignUpHandler}>

        <div>
          <label className="block text-sm text-gray-700 mb-2">
            Full Name
          </label>
          <input
            type="text"
            placeholder="Full name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            className="w-full bg-[#F1F5F9] border border-gray-300 rounded-xl px-4 py-3 text-[#0F172A] focus:border-emerald-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="w-full bg-[#F1F5F9] border border-gray-300 rounded-xl px-4 py-3 text-[#0F172A] focus:border-emerald-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-2">
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
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
              width="500"
              color="#000000"
              ariaLabel="loading"
            />
          ) : (
            "Register"
          )}
        </button>

        <p className="text-center text-[#475569] text-sm mt-6">
          Already have an account?{" "}
          <span onClick={()=> navigate("/login")} className="text-emerald-600 cursor-pointer hover:underline">
            Login
          </span>
        </p>

      </form>
    </div>
  </div>
</div>
    </>
  )
}
export default Signup