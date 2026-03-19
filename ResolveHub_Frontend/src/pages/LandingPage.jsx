import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">

      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-6 
        bg-[#0f0f0f]/80 backdrop-blur-md border-b border-white/10">

        <h1 className="text-2xl font-bold text-emerald-400">
          ResolveHub
        </h1>

        <div className="flex gap-4">
          <button
            onClick={() => navigate("/signup")}
            className="px-5 py-2 rounded-lg border border-white/20 text-gray-300 
            hover:border-emerald-400 hover:text-emerald-400 transition"
          >
            Sign Up
          </button>

          <button
            onClick={() => navigate("/login")}
            className="px-5 py-2 rounded-lg bg-emerald-500 text-black 
            hover:bg-emerald-400 transition font-medium"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="text-center py-28 px-6">

        <h1 className="text-5xl md:text-6xl font-bold text-white">
          Resolve Issues <span className="text-emerald-400">Faster</span>
        </h1>

        <p className="text-gray-400 text-lg max-w-2xl mx-auto mt-6">
          A modern complaint management system designed to streamline issue resolution.
          File, track, and manage complaints easily with our simple platform.
        </p>

        <div className="flex justify-center gap-4 mt-10 flex-wrap">

          <button
            onClick={() => navigate("/login")}
            className="bg-emerald-500 text-black px-8 py-3 rounded-xl 
            hover:bg-emerald-400 font-medium transition shadow-lg shadow-emerald-500/20"
          >
            Start Free Trial
          </button>

          <button
            onClick={() => navigate("/signup")}
            className="px-8 py-3 rounded-xl border border-white/20 text-gray-300 
            hover:border-emerald-400 hover:text-emerald-400 transition"
          >
            Sign Up
          </button>

        </div>
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-4 gap-8 px-16 pb-28">

        {[ 
          {
            title: "Easy Filing",
            desc: "Submit complaints quickly using a simple form.",
          },
          {
            title: "Real-time Tracking",
            desc: "Track the status of your complaints anytime.",
          },
          {
            title: "Admin Dashboard",
            desc: "Admins can manage complaints and users easily.",
          },
          {
            title: "Fast Resolution",
            desc: "Efficient workflow helps resolve issues faster.",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-white/5 border border-white/10 p-6 rounded-2xl 
            backdrop-blur-md hover:-translate-y-2 hover:border-emerald-400/40 
            transition duration-300"
          >
            <h3 className="text-lg font-semibold text-white">
              {item.title}
            </h3>
            <p className="text-gray-400 mt-2">
              {item.desc}
            </p>
          </div>
        ))}

      </section>

      {/* CTA Section */}
      <section className="px-16 pb-28">

        <div className="bg-white/5 border border-white/10 rounded-3xl text-center py-16">

          <h2 className="text-3xl font-bold text-white">
            Ready to get started?
          </h2>

          <p className="text-gray-400 mt-4">
            Join users managing complaints efficiently with ResolveHub
          </p>

          <button
            onClick={() => navigate("/signup")}
            className="mt-8 bg-emerald-500 text-black px-8 py-3 rounded-xl 
            hover:bg-emerald-400 font-medium transition shadow-lg shadow-emerald-500/20"
          >
            Create Your Account
          </button>

        </div>

      </section>

      {/* Footer */}
      <footer className="bg-[#0f0f0f] border-t border-white/10 py-10">

        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">

          <h2 className="text-xl font-bold text-emerald-400">
            ResolveHub
          </h2>

          <p className="text-gray-500 text-sm">
            © 2026 ResolveHub. All rights reserved.
          </p>

          <div className="flex gap-6 text-sm text-gray-400">
            <span className="hover:text-emerald-400 cursor-pointer">Privacy</span>
            <span className="hover:text-emerald-400 cursor-pointer">Terms</span>
            <span className="hover:text-emerald-400 cursor-pointer">Contact</span>
          </div>

        </div>

      </footer>

    </div>
  );
};

export default LandingPage;