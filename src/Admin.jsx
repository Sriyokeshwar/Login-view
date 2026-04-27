// Admin.jsx

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Eye,
  EyeOff,
  ShieldCheck,
  UserCog,
  ArrowLeft,
} from "lucide-react";

function Admin() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [showPassword, setShowPassword] =
    useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      name === "admin" &&
      pass === "admin123"
    ) {
      alert("Admin Login Success");
      navigate("/users");
    } else {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="min-h-screen w-full bg-linear-to-br from-[#eef2ff] via-[#dbeafe] to-[#c7d2fe] flex items-center justify-center px-4 relative overflow-hidden">

      {/* Glow */}
      <div className="absolute w-80 h-80 bg-blue-400/20 rounded-full blur-3xl top-0 left-0"></div>
      <div className="absolute w-72 h-72 bg-indigo-400/20 rounded-full blur-3xl bottom-0 right-0"></div>

      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-md bg-white/35 backdrop-blur-3xl border border-white/50 rounded-[34px] p-10 shadow-[0_8px_40px_rgba(59,130,246,0.18)]"
      >
        <div className="absolute inset-0 rounded-[34px] bg-linear-to-br from-white/40 via-transparent to-blue-200/20 pointer-events-none"></div>

        <div className="relative z-10">

          <div className="mb-3">
            <Link
              to="/"
              className="flex items-center gap-2 text-sm font-semibold text-blue-700"
            >
              <ArrowLeft size={18} />
              User Register
            </Link>
          </div>

          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-blue-500/15 flex items-center justify-center">
              <ShieldCheck
                size={30}
                className="text-blue-700"
              />
            </div>
          </div>

          <p className="text-xs font-semibold tracking-[5px] text-blue-700 uppercase text-center mb-4">
            Secure Access
          </p>

          <h1 className="text-5xl font-bold text-center mb-3">
            Admin Panel
          </h1>

          <p className="text-center text-gray-600 mb-8">
            Authorized management login
          </p>

          <div className="mb-4 relative">
            <UserCog
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-700"
            />

            <input
              placeholder="Admin Username"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              className="w-full pl-11 pr-4 py-3 rounded-2xl border bg-white/45"
            />
          </div>

          <div className="mb-6 relative">
            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="Password"
              value={pass}
              onChange={(e) =>
                setPass(e.target.value)
              }
              className="w-full px-4 py-3 rounded-2xl border bg-white/45 pr-12"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>
          </div>

          <button className="w-full py-3 rounded-2xl font-bold tracking-[3px] text-white bg-linear-to-r from-blue-500 via-indigo-500 to-blue-700">
            LOGIN
          </button>
        </div>
      </form>
    </div>
  );
}

export default Admin;