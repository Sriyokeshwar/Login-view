  import "./App.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {
  Eye,
  EyeOff,
  UserRound,
  ShieldCheck,
  Mail,
  LockKeyhole,
} from "lucide-react";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [agree, setAgree] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  // ✅ FIXED VALIDATION
  const validate = (data, agreeState = agree) => {
    let newErrors = {};

    if (!data.email) {
      newErrors.email = "Email is mandatory";
    }

    if (!data.password) {
      newErrors.password = "Password is mandatory";
    }

    if (!agreeState) {
      newErrors.agree = "You must agree to continue";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;

    const updatedForm = {
      ...form,
      [id]: value,
    };

    setForm(updatedForm);
    setErrors(validate(updatedForm, agree)); // ✅ fixed
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate(form, agree); // ✅ fixed
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    try {
      const res = await axios.post(
        "http://localhost:5000/api/login",
        form
      );

      alert(res.data.message);

      navigate("/profile", {
        state: { user: res.data.user },
      });

    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Login failed"
      );
    }
  };

  const isValid =
    Object.keys(errors).length === 0 &&
    form.email &&
    form.password &&
    agree;

  return (
    <div className="min-h-screen w-full bg-linear-to-br from-[#fff8e1] via-[#fef3c7] to-[#fde68a] flex items-center justify-center px-4 relative overflow-hidden">

      {/* Glow Effects */}
      <div className="absolute w-96 h-96 bg-yellow-300/30 rounded-full blur-3xl top-0 left-0 animate-pulse"></div>
      <div className="absolute w-80 h-80 bg-amber-400/20 rounded-full blur-3xl bottom-0 right-0 animate-pulse"></div>
      <div className="absolute w-72 h-72 bg-white/30 rounded-full blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>

      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-md bg-white/35 backdrop-blur-3xl border border-white/50 rounded-[36px] p-10 shadow-[0_8px_45px_rgba(255,190,0,0.22)]"
      >

        {/* Shine */}
        <div className="absolute inset-0 rounded-[36px] bg-linear-to-br from-white/40 via-transparent to-yellow-200/20 pointer-events-none"></div>

        <div className="relative z-10">

          {/* Admin Button */}
          <div className="mb-4 flex justify-end">
            <button
              type="button"
              onClick={() => navigate("/admin")}
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-900 transition"
            >
              <ShieldCheck size={18} />
              Admin
            </button>
          </div>

          {/* Icon */}
          <div className="flex justify-center mb-5">
            <div className="w-20 h-20 rounded-full bg-yellow-500/15 border border-white/40 flex items-center justify-center shadow-md">
              <UserRound size={36} className="text-amber-700" />
            </div>
          </div>

          {/* Heading */}
          <p className="text-xs font-semibold tracking-[5px] text-amber-700 uppercase text-center mb-3">
            Welcome Back
          </p>

          <h1 className="text-5xl font-bold text-center text-gray-900 mb-3">
            Login Account
          </h1>

          <p className="text-center text-gray-600 mb-8">
            Access your profile securely
          </p>

          {/* Email */}
          <div className="mb-4 relative">
            <Mail
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-700"
            />

            <input
              type="email"
              id="email"
              placeholder="name@example.com"
              value={form.email}
              onChange={handleChange}
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/45 border border-orange-300 outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {errors.email && (
            <p className="text-red-500 text-sm mb-3">
              {errors.email}
            </p>
          )}

          {/* Password */}
          <div className="mb-4 relative">
            <LockKeyhole
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-700"
            />

            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full pl-11 pr-12 py-3 rounded-2xl bg-white/45 border border-orange-300 outline-none focus:ring-2 focus:ring-yellow-400"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-amber-700 transition"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {errors.password && (
            <p className="text-red-500 text-sm mb-3">
              {errors.password}
            </p>
          )}

          {/* ✅ FIXED CHECKBOX */}
          <div className="flex items-center gap-3 mb-4">
            <input
              type="checkbox"
              checked={agree}
              onChange={() => {
                const newAgree = !agree;
                setAgree(newAgree);
                setErrors(validate(form, newAgree)); // 🔥 fix
              }}
              className="accent-yellow-500 w-4 h-4"
            />

            <label className="text-sm text-gray-700">
              I agree to store my data
            </label>
          </div>

          {errors.agree && (
            <p className="text-red-500 text-sm mb-3">
              {errors.agree}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={!isValid}
            className={`w-full py-3 rounded-2xl font-bold tracking-[3px] transition-all duration-300 ${
              isValid
                ? "bg-linear-to-r from-yellow-400 via-amber-300 to-yellow-500 text-black shadow-lg hover:scale-[1.02]"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            LOGIN
          </button>

          {/* Bottom Link */}
          <p className="text-center mt-6 text-sm">
            New user?{" "}
            <Link
              to="/register"
              className="text-blue-700 font-semibold"
            >
              Create one
            </Link>
          </p>

        </div>
      </form>
    </div>
  );
}

export default Login;