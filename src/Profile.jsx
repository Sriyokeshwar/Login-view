import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react"; 
import axios from "axios";
import {
  UserRound,
  Mail,
  Eye,
  EyeOff,
  LockKeyhole,
  ArrowLeft,
  Pencil,
  Trash2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

function Profile() {
  const [showPassword, setShowPassword] = useState(false);  
  const { state } = useLocation();
  const navigate = useNavigate();

  const user = state?.user;

  const deleteUser = async () => {
    const ok = window.confirm("Delete your account?");
    if (!ok) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/user-delete/${user._id}`
      );

      alert("Deleted Successfully");
      navigate("/"); // ✅ fixed
    } catch (error) {
      alert("Failed to delete account");
    }
  };

  // ❗ No user case
  if (!user) {
    return (
      <div className="min-h-screen bg-linear-to-br from-[#fff8e1] via-[#fef3c7] to-[#fde68a] flex items-center justify-center px-4">
        <div className="bg-white/40 backdrop-blur-2xl rounded-[34px] p-10 shadow-xl text-center max-w-md w-full border border-white/50">

          <ShieldCheck size={45} className="mx-auto text-red-500 mb-4" />

          <h1 className="text-3xl font-bold mb-3 text-gray-900">
            No User Data
          </h1>

          <p className="text-gray-600 mb-6">
            Please login first
          </p>

          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 rounded-2xl bg-linear-to-r from-yellow-400 to-amber-500 font-semibold hover:scale-105 transition"
          >
            Go Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-linear-to-br from-[#fff8e1] via-[#fef3c7] to-[#fde68a] flex items-center justify-center px-4 relative overflow-hidden">

      {/* Glow */}
      <div className="absolute w-80 h-80 bg-yellow-300/30 rounded-full blur-3xl top-0 left-0 animate-pulse"></div>
      <div className="absolute w-72 h-72 bg-amber-400/25 rounded-full blur-3xl bottom-0 right-0 animate-pulse"></div>
      <div className="absolute w-72 h-72 bg-white/30 rounded-full blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>

      <div className="relative z-10 w-full max-w-md bg-white/35 backdrop-blur-3xl border border-white/50 rounded-[34px] p-10 shadow-[0_8px_45px_rgba(255,190,0,0.22)]">

        {/* Shine */}
        <div className="absolute inset-0 rounded-[34px] bg-linear-to-br from-white/40 via-transparent to-yellow-200/20 pointer-events-none"></div>

        <div className="relative z-10">

          {/* Top */}
          <div className="flex justify-between items-center mb-5">
            <button
              onClick={() => navigate("/")} // ✅ fixed
              className="flex items-center gap-2 text-amber-700 font-semibold hover:text-amber-900 transition"
            >
              <ArrowLeft size={18} />
              Back
            </button>

            <div className="flex gap-2">
              <button
                onClick={() => navigate(`/edit/${user._id}`)}
                className="p-2 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 transition"
              >
                <Pencil size={18} className="text-blue-700" />
              </button>

              <button
                onClick={deleteUser}
                className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 transition"
              >
                <Trash2 size={18} className="text-red-600" />
              </button>
            </div>
          </div>

          {/* Icon */}
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 rounded-full bg-yellow-500/15 border border-white/40 flex items-center justify-center shadow-md">
              <UserRound size={40} className="text-amber-700" />
            </div>
          </div>

          <p className="text-xs font-semibold tracking-[5px] text-amber-700 uppercase text-center mb-3">
            Premium Account
          </p>

          <h1 className="text-5xl font-bold text-center mb-3 text-gray-900">
            My Profile
          </h1>

          <p className="text-center text-gray-600 mb-8">
            Welcome back
          </p>

          {/* Name */}
          <div className="mb-4 bg-white/40 rounded-2xl px-4 py-4 flex gap-3 border border-white/40">
            <UserRound size={20} className="text-amber-700" />
            <div>
              <p className="text-xs text-gray-500">Full Name</p>
              <p className="font-semibold text-gray-900">{user.name}</p>
            </div>
          </div>

          {/* Email */}
          <div className="mb-4 bg-white/40 rounded-2xl px-4 py-4 flex gap-3 border border-white/40">
            <Mail size={20} className="text-amber-700" />
            <div>
              <p className="text-xs text-gray-500">Email Address</p>
              <p className="font-semibold text-gray-900">{user.email}</p>
            </div>
          </div>

          {/* Password */}
          <div className="mb-5 bg-white/40 rounded-2xl px-4 py-4 flex items-center gap-3 border border-white/40">

            {/* Left Icon */}
            <LockKeyhole size={20} className="text-amber-700" />

            {/* Content */}
            <div className="flex-1">
              <p className="text-xs text-gray-500">Password</p>
              <p className="font-semibold text-gray-900">
                {showPassword
                  ? user.password
                  : "•".repeat(user.password?.length || 8)}
              </p>
            </div>

            {/* Eye Button (aligned right) */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-500 hover:text-amber-700 transition"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>

          </div>
          {/* Info Box */}
          <div className="mb-6 rounded-2xl bg-white/25 border border-white/40 px-4 py-3 text-sm text-gray-700 flex gap-2">
            <Sparkles size={16} className="mt-0.5 text-amber-700" />
            <span>
              Manage your profile securely and elegantly.
            </span>
          </div>

          {/* Home */}
          <button
            onClick={() => navigate("/")} // ✅ fixed
            className="w-full py-3 rounded-2xl font-bold tracking-[3px] bg-linear-to-r from-yellow-400 to-amber-500 hover:scale-[1.02] transition"
          >
            HOME
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;