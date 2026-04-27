// Edit.jsx - Golden Liquid Glass Theme

import "./App.css";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";

function Edit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showPassword, setShowPassword] = useState(false);

  const [agree, setAgree] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchUserById = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/users/${id}`
        );

        const userData = {
          name: res.data.name,
          email: res.data.email,
          password: res.data.password,
        };

        setForm(userData);
        setErrors(validate(userData));

      } catch (error) {
        console.log(error);
      }
    };

    fetchUserById();
  }, [id]);

  const validate = (data) => {
    let newErrors = {};

    if (!data.name) {
      newErrors.name = "Name is mandatory";
    } else if (data.name.length < 3) {
      newErrors.name = "Minimum 3 letters";
    }

    if (!data.email) {
      newErrors.email = "Email is mandatory";
    }

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    try {
      await axios.put(
        `http://localhost:5000/api/user-update/${id}`,
        form
      );

      alert("User Updated Successfully!");
      navigate("/users");

    } catch (error) {
      alert("Failed to update user");
    }
  };

  const isValid =
    Object.keys(errors).length === 0 &&
    form.name &&
    form.email &&
    form.password &&
    agree;

  return (
    <div className="min-h-screen w-full bg-linear-to-br from-[#fff8e1] via-[#fef3c7] to-[#fde68a] flex items-center justify-center px-4 relative overflow-hidden">

      {/* Liquid Background */}
      <div className="absolute w-80 h-80 bg-yellow-300/30 rounded-full blur-3xl top-0 left-0"></div>
      <div className="absolute w-72 h-72 bg-amber-400/25 rounded-full blur-3xl bottom-10 right-0"></div>
      <div className="absolute w-72 h-72 bg-white/40 rounded-full blur-3xl top-1/2 left-1/2 -translate-x-1/2"></div>

      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-md 
        bg-white/35 backdrop-blur-3xl 
        border border-white/50 
        rounded-[34px] p-10
        shadow-[0_8px_40px_rgba(255,190,0,0.22)]"
      >
        {/* Shine */}
        <div className="absolute inset-0 rounded-[34px] bg-linear-to-br from-white/40 via-transparent to-yellow-200/20 pointer-events-none"></div>

        <div className="relative z-10">
          <p className="text-xs font-semibold tracking-[5px] text-amber-700 uppercase text-center mb-4">
            Premium Account
          </p>

          <h1 className="text-5xl font-bold text-gray-900 text-center mb-3">
            Edit Profile
          </h1>

          <p className="text-gray-600 text-center mb-8">
            Update your profile elegantly
          </p>

          {/* Name */}
          <div className="mb-4">
            <input
              type="text"
              id="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Name"
              className="w-full bg-white/45 border border-white/70 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-yellow-400"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-2">
                {errors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="mb-4">
            <input
              type="email"
              id="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full bg-white/45 border border-white/70 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-yellow-400"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-2">
                {errors.email}
              </p>
            )}
          </div>

          {/* Password */}
        <div className="mb-2">
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              className="w-full bg-white/45 backdrop-blur-xl border border-white/70 rounded-2xl px-4 py-3 pr-12 outline-none focus:ring-2 focus:ring-yellow-400 placeholder:text-gray-500"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          
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
              className="accent-yellow-500"
            />
            <label className="text-sm text-gray-700">
              I agree to update my data
            </label>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={!isValid}
            className={`w-full py-3 rounded-2xl font-bold tracking-[3px] transition-all duration-300
            ${
              isValid
                ? "bg-linear-to-r from-yellow-400 via-amber-300 to-yellow-500 text-black hover:scale-[1.02]"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            UPDATE
          </button>
        </div>
      </form>
    </div>
  );
}

export default Edit;