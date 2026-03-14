import { Navigate, useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-[#F8FAFC]">

      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-6 bg-white border-b border-gray-200">
        <h1 className="text-2xl font-bold text-emerald-600">
          ResolveHub
        </h1>

        <div className="flex gap-4">
          <button onClick={()=> navigate("/signup")} className="px-5 py-2 rounded-lg border border-gray-300 text-[#0F172A] hover:bg-gray-100">
            Sign Up
          </button>

          <button onClick={()=> navigate("/login")} className="px-5 py-2 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600">
            Get Started
          </button>
        </div>
      </nav>


      {/* Hero Section */}
      <section className="text-center py-28 px-6">

        <h1 className="text-6xl font-bold text-[#0F172A]">
          Resolve Issues <span className="text-emerald-600">Faster</span>
        </h1>

        <p className="text-[#475569] text-lg max-w-2xl mx-auto mt-6">
          A modern complaint management system designed to streamline issue resolution.
          File, track, and manage complaints easily with our simple platform.
        </p>

        <div className="flex justify-center gap-4 mt-10">
          <button onClick={()=>navigate("/login")} className="bg-emerald-500 text-white px-8 py-3 rounded-xl hover:bg-emerald-600 font-medium">
            Start Free Trial
          </button>

          <button onClick={()=>navigate("/signup")} className="px-8 py-3 rounded-xl border border-gray-300 text-[#0F172A] hover:bg-gray-100">
            Sign Up
          </button>
        </div>

      </section>


      {/* Features */}
      <section className="grid md:grid-cols-4 gap-8 px-16 pb-28">

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xl">
          <h3 className="text-lg font-semibold text-[#0F172A]">
            Easy Filing
          </h3>
          <p className="text-[#475569] mt-2">
            Submit complaints quickly using a simple form.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xl">
          <h3 className="text-lg font-semibold text-[#0F172A]">
            Real-time Tracking
          </h3>
          <p className="text-[#475569] mt-2">
            Track the status of your complaints anytime.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xl">
          <h3 className="text-lg font-semibold text-[#0F172A]">
            Admin Dashboard
          </h3>
          <p className="text-[#475569] mt-2">
            Admins can manage complaints and users easily.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xl">
          <h3 className="text-lg font-semibold text-[#0F172A]">
            Fast Resolution
          </h3>
          <p className="text-[#475569] mt-2">
            Efficient workflow helps resolve issues faster.
          </p>
        </div>

      </section>


      {/* CTA Section */}
      <section className="px-16 pb-28">

        <div className="bg-emerald-50 border border-emerald-200 rounded-3xl text-center py-16">

          <h2 className="text-3xl font-bold text-[#0F172A]">
            Ready to get started?
          </h2>

          <p className="text-[#475569] mt-4">
            Join users managing complaints efficiently with ResolveHub
          </p>

          <button onClick={()=>navigate("/signup")} className="mt-8 bg-emerald-500 text-white px-8 py-3 rounded-xl hover:bg-emerald-600 font-medium">
            Create Your Account
          </button>

        </div>

      </section>


      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-10">

        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">

          <h2 className="text-xl font-bold text-emerald-600">
            ResolveHub
          </h2>

          <p className="text-[#475569] text-sm">
            © 2026 ResolveHub. All rights reserved.
          </p>

          <div className="flex gap-6 text-sm text-[#475569]">
            <span className="hover:text-emerald-600 cursor-pointer">Privacy</span>
            <span className="hover:text-emerald-600 cursor-pointer">Terms</span>
            <span className="hover:text-emerald-600 cursor-pointer">Contact</span>
          </div>

        </div>

      </footer>

    </div>
  );
};

export default LandingPage;

