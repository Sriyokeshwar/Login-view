// Register.jsx + Edit.jsx same validation logic

import "./App.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const navigate = useNavigate();

  const [agree, setAgree] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const validate = (data) => {
    let newErrors = {};

    // Name Validation
    if (!data.name) {
      newErrors.name = "Name is mandatory";
    } else if (data.name.length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }

    // Email Validation
    if (!data.email) {
      newErrors.email = "Email is mandatory";
    }

    // Password Validation
    if (!data.password) {
      newErrors.password = "Password is mandatory";
    } else {
      if (!/[A-Z]/.test(data.password)) {
        newErrors.password = "Need one Capital letter";
      } else if (!/[0-9]/.test(data.password)) {
        newErrors.password = "Need one Number";
      } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(data.password)) {
        newErrors.password = "Need one Symbol";
      } else if (data.password.length < 8) {
        newErrors.password = "Minimum 8 characters";
      }
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
    setErrors(validate(updatedForm));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validate(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    try {
      await axios.post(
        "http://localhost:5000/api/user-create",
        form
      );

      alert("User Created Successfully!");
      navigate("/users");

    } catch (error) {
      alert("Failed to create user");
    }
  };

  const isValid =
    Object.keys(errors).length === 0 &&
    form.name &&
    form.email &&
    form.password &&
    agree;

  // Golden Liquid Glass Theme
// Replace only return() UI in Register.jsx / Edit.jsx

return (
  <div className="min-h-screen w-full bg-gradient-to-br from-[#fff8e1] via-[#fef3c7] to-[#fde68a] flex items-center justify-center px-4 relative overflow-hidden">

    {/* Liquid Gold Blur Orbs */}
    <div className="absolute w-80 h-80 bg-yellow-300/30 rounded-full blur-3xl top-0 left-0 animate-pulse"></div>
    <div className="absolute w-72 h-72 bg-amber-400/25 rounded-full blur-3xl bottom-10 right-0 animate-pulse"></div>
    <div className="absolute w-72 h-72 bg-white/40 rounded-full blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>

    <form
      onSubmit={handleSubmit}
      className="relative z-10 w-full max-w-md 
      bg-white/35 backdrop-blur-3xl 
      border border-white/50
      rounded-[34px]
      p-10
      shadow-[0_8px_40px_rgba(255,190,0,0.22)]"
    >
      {/* Shine Layer */}
      <div className="absolute inset-0 rounded-[34px] bg-gradient-to-br from-white/40 via-transparent to-yellow-200/20 pointer-events-none"></div>

      <div className="relative z-10">
        <p className="text-xs font-semibold tracking-[5px] text-amber-700 uppercase text-center mb-4">
          Premium Account
        </p>

        <h1 className="text-5xl font-bold text-gray-900 text-center mb-3">
          Create Profile
        </h1>

        <p className="text-gray-600 text-center mb-8">
          Elegant golden liquid glass UI
        </p>

        {/* Name */}
        <div className="mb-4">
          <input
            type="text"
            id="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="w-full bg-white/45 backdrop-blur-xl border border-white/70 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-yellow-400 placeholder:text-gray-500"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-2">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div className="mb-4">
          <input
            type="email"
            id="email"
            placeholder="name@example.com"
            value={form.email}
            onChange={handleChange}
            className="w-full bg-white/45 backdrop-blur-xl border border-white/70 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-yellow-400 placeholder:text-gray-500"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-2">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-2">
          <input
            type="password"
            id="password"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
            className="w-full bg-white/45 backdrop-blur-xl border border-white/70 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-yellow-400 placeholder:text-gray-500"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-2">{errors.password}</p>
          )}
        </div>

        {/* Rules */}
        <div className="text-sm text-gray-700 mb-4 leading-7">
          <p>Password must contain:</p>
          <p>• One Capital Letter</p>
          <p>• One Number</p>
          <p>• One Symbol</p>
          <p>• Minimum 8 Characters</p>
        </div>

        {/* Checkbox */}
        <div className="flex items-center gap-2 mb-6">
          <input
            type="checkbox"
            checked={agree}
            onChange={() => setAgree(!agree)}
            className="accent-yellow-500 w-4 h-4"
          />
          <label className="text-sm text-gray-700">
            I agree to store my data
          </label>
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={!isValid}
          className={`w-full py-3 rounded-2xl font-bold tracking-[3px] transition-all duration-300
          ${
            isValid
              ? "bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 text-black shadow-lg hover:scale-[1.02]"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          SUBMIT
        </button>
      </div>
    </form>
  </div>
);
}

export default Register;