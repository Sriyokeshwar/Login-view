// Register.jsx

import "./App.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/user-create",
        form
      );

      console.log(response.data);
      alert("User Created Successfully!");

      setForm({
        name: "",
        email: "",
        password: "",
      });

      navigate("/users"); // auto move
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to create user");
    }
  };

  return (
    <div className="min-h-screen w-full bg-linear-to-br from-stone-400 via-amber-400 to-gray-400 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-[#f8f7f4] rounded-3xl shadow-2xl border border-gray-200 p-10"
      >
        <p className="text-xs font-semibold tracking-[4px] text-yellow-700 uppercase text-center mb-4">
          New Account
        </p>

        <h1 className="text-5xl font-bold text-gray-900 text-center mb-3">
          Create Profile
        </h1>

        <p className="text-gray-500 text-center mb-8">
          Fill in your details to get started
        </p>

        <div className="mb-5">
          <label className="block text-xs font-semibold tracking-[3px] uppercase text-gray-700 mb-2">
            Name
          </label>

          <input
            type="text"
            id="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-yellow-300"
          />
        </div>

        <div className="mb-5">
          <label className="block text-xs font-semibold tracking-[3px] uppercase text-gray-700 mb-2">
            Email Address
          </label>

          <input
            type="email"
            id="email"
            placeholder="name@example.com"
            value={form.email}
            onChange={handleChange}
            className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-yellow-300"
          />
        </div>

        <div className="mb-8">
          <label className="block text-xs font-semibold tracking-[3px] uppercase text-gray-700 mb-2">
            Password
          </label>

          <input
            type="password"
            id="password"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
            className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-yellow-300"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold tracking-[3px] py-3 rounded-xl shadow-md transition duration-300"
        >
          SUBMIT
        </button>
      </form>
    </div>
  );
}

export default Register;