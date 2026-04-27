// Profile.jsx

import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  UserRound,
  Mail,
  LockKeyhole,
  ArrowLeft,
  Pencil,
  Trash2,
  ShieldCheck,
} from "lucide-react";

function Profile() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const user = state?.user;

  const deleteUser = async () => {
    const ok = window.confirm(
      "Delete your account?"
    );

    if (!ok) return;

    await axios.delete(
      `http://localhost:5000/api/user-delete/${user._id}`
    );

    alert("Deleted Successfully");
    navigate("/");
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-linear-to-br from-[#fff8e1] via-[#fef3c7] to-[#fde68a] flex items-center justify-center px-4">
        <div className="bg-white/40 backdrop-blur-2xl rounded-[34px] p-10 shadow-xl text-center max-w-md w-full">
          <ShieldCheck
            size={45}
            className="mx-auto text-red-500 mb-4"
          />

          <h1 className="text-3xl font-bold mb-3">
            No User Data
          </h1>

          <p className="text-gray-600 mb-6">
            Please register first
          </p>

          <button
            onClick={() =>
              navigate("/")
            }
            className="px-6 py-3 rounded-2xl bg-linear-to-r from-yellow-400 to-amber-500 font-semibold"
          >
            Go Register
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-linear-to-br from-[#fff8e1] via-[#fef3c7] to-[#fde68a] flex items-center justify-center px-4 relative overflow-hidden">

      {/* Glow */}
      <div className="absolute w-80 h-80 bg-yellow-300/30 rounded-full blur-3xl top-0 left-0"></div>
      <div className="absolute w-72 h-72 bg-amber-400/25 rounded-full blur-3xl bottom-0 right-0"></div>

      <div className="relative z-10 w-full max-w-md bg-white/35 backdrop-blur-3xl border border-white/50 rounded-[34px] p-10 shadow-xl">

        <div className="absolute inset-0 rounded-[34px] bg-linear-to-br from-white/40 via-transparent to-yellow-200/20 pointer-events-none"></div>

        <div className="relative z-10">

          {/* Top */}
          <div className="flex justify-between items-center mb-5">
            <button
              onClick={() =>
                navigate("/")
              }
              className="flex items-center gap-2 text-amber-700 font-semibold"
            >
              <ArrowLeft size={18} />
              Back
            </button>

            <div className="flex gap-2">
              <button
                onClick={() =>
                  navigate(
                    `/edit/${user._id}`
                  )
                }
                className="p-2 rounded-xl bg-blue-500/10"
              >
                <Pencil
                  size={18}
                  className="text-blue-700"
                />
              </button>

              <button
                onClick={deleteUser}
                className="p-2 rounded-xl bg-red-500/10"
              >
                <Trash2
                  size={18}
                  className="text-red-600"
                />
              </button>
            </div>
          </div>

          {/* Icon */}
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 rounded-full bg-yellow-500/15 flex items-center justify-center">
              <UserRound
                size={40}
                className="text-amber-700"
              />
            </div>
          </div>

          <h1 className="text-5xl font-bold text-center mb-3">
            My Profile
          </h1>

          <p className="text-center text-gray-600 mb-8">
            Welcome back
          </p>

          {/* Name */}
          <div className="mb-4 bg-white/40 rounded-2xl px-4 py-4 flex gap-3">
            <UserRound
              size={20}
              className="text-amber-700"
            />

            <div>
              <p className="text-xs text-gray-500">
                Full Name
              </p>
              <p className="font-semibold">
                {user.name}
              </p>
            </div>
          </div>

          {/* Email */}
          <div className="mb-4 bg-white/40 rounded-2xl px-4 py-4 flex gap-3">
            <Mail
              size={20}
              className="text-amber-700"
            />

            <div>
              <p className="text-xs text-gray-500">
                Email
              </p>
              <p className="font-semibold">
                {user.email}
              </p>
            </div>
          </div>

          {/* Password */}
          <div className="mb-6 bg-white/40 rounded-2xl px-4 py-4 flex gap-3">
            <LockKeyhole
              size={20}
              className="text-amber-700"
            />

            <div>
              <p className="text-xs text-gray-500">
                Password
              </p>
              <p className="font-semibold">
                {"•".repeat(
                  user.password
                    ?.length || 8
                )}
              </p>
            </div>
          </div>

          <button
            onClick={() =>
              navigate("/")
            }
            className="w-full py-3 rounded-2xl font-bold tracking-[3px] bg-linear-to-r from-yellow-400 to-amber-500"
          >
            HOME
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;