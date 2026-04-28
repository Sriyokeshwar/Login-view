import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Eye,
  EyeOff,
  ShieldCheck,
  UserCog,
  ArrowLeft,
  LockKeyhole,
  BadgeCheck,
} from "lucide-react";

function Admin() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name === "admin" && pass === "admin123") {
      alert("Admin Login Success");
      navigate("/users");
    } else {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="min-h-screen w-full bg-linear-to-br from-[#eef2ff] via-[#dbeafe] to-[#c7d2fe] flex items-center justify-center px-4 relative overflow-hidden">

      {/* Glow Effects */}
      <div className="absolute w-96 h-96 bg-blue-400/20 rounded-full blur-3xl top-0 left-0 animate-pulse"></div>
      <div className="absolute w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl bottom-0 right-0 animate-pulse"></div>
      <div className="absolute w-72 h-72 bg-white/30 rounded-full blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>

      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-md bg-white/35 backdrop-blur-3xl border border-white/50 rounded-[36px] p-10 shadow-[0_8px_45px_rgba(59,130,246,0.22)]"
      >
        {/* Shine */}
        <div className="absolute inset-0 rounded-[36px] bg-linear-to-br from-white/40 via-transparent to-blue-200/20 pointer-events-none"></div>

        <div className="relative z-10">

          {/* Back Link */}
          <div className="mb-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-900 transition"
            >
              <ArrowLeft size={18} />
              User Login
            </Link>
          </div>

          {/* Icon */}
          <div className="flex justify-center mb-5">
            <div className="w-20 h-20 rounded-full bg-blue-500/15 border border-white/40 flex items-center justify-center shadow-md">
              <ShieldCheck size={36} className="text-blue-700" />
            </div>
          </div>

          {/* Heading */}
          <p className="text-xs font-semibold tracking-[5px] text-blue-700 uppercase text-center mb-3">
            Secure Access
          </p>

          <h1 className="text-5xl font-bold text-center text-gray-900 mb-3">
            Admin Panel
          </h1>

          <p className="text-center text-gray-600 mb-8">
            Premium dashboard login portal
          </p>

          {/* Username */}
          <div className="mb-4 relative">
            <UserCog
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-700"
            />

            <input
              type="text"
              placeholder="Admin Username"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/45 border border-blue-400  outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-500"
            />
          </div>

          {/* Password */}
          <div className="mb-4 relative">
            <LockKeyhole
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-700"
            />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              className="w-full pl-11 pr-12 py-3 rounded-2xl bg-white/45 border border-blue-400 outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-500"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-700 transition"
            >
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>
          </div>

          {/* Hint Box */}
          <div className="mb-6 rounded-2xl bg-white/25 border border-blue-400  px-4 py-3 text-sm text-gray-700 flex gap-2">
            <BadgeCheck size={16} className="mt-0.5 text-blue-700" />
            <span>Authorized users only. Secure credentials required.</span>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-2xl font-bold tracking-[3px] text-white bg-linear-to-r from-blue-500 via-indigo-500 to-blue-700 shadow-lg hover:scale-[1.02] transition-all duration-300"
          >
            LOGIN
          </button>
        </div>
      </form>
    </div>
  );
}

export default Admin;