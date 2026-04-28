import "./App.css";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  Eye,
  EyeOff,
  UserRound,
  Mail,
  LockKeyhole,
  ArrowLeft,
  PencilLine,
  BadgeCheck,
} from "lucide-react";

function AdminEdit() {
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
      } else if (
        !/[!@#$%^&*(),.?":{}|<>]/.test(data.password)
      ) {
        newErrors.password = "Need one Symbol";
      } else if (data.password.length < 8) {
        newErrors.password = "Minimum 8 characters";
      }
    }

    return newErrors;
  };

  useEffect(() => {
    const fetchUser = async () => {
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
        alert("Failed to fetch user");
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    const { id, value } = e.target;

    const updatedForm = {
      ...form,
      [id]: value,
    };

    setForm(updatedForm);
    setErrors(validate(updatedForm));
  };

  // Edit.jsx
// ONLY change handleSubmit function

const handleSubmit = async (e) => {
  e.preventDefault();

  const validationErrors = validate(form);
  setErrors(validationErrors);

  if (Object.keys(validationErrors).length > 0) return;

  try {
    const res = await axios.put(
      `http://localhost:5000/api/user-update/${id}`,
      form
    );

    alert("User Updated Successfully!");

    navigate("/users", {
      state: {
        user: res.data.user,
      },
    });

  } catch (error) {
    console.log(error);

    alert(
      error.response?.data?.message ||
      "Failed to update user"
    );
  }
};  

  const isValid =
    Object.keys(errors).length === 0 &&
    form.name &&
    form.email &&
    form.password &&
    agree;

  return (
    <div className="min-h-screen w-full bg-linear-to-br from-[#eef2ff] via-[#dbeafe] to-[#c7d2fe] flex items-center justify-center px-4 relative overflow-hidden">

  {/* Glow */}
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

      {/* Back */}
      <div className="mb-4">
        <button
          type="button"
          onClick={() =>
            navigate("/users", {
              state: {
                user: {
                  _id: id,
                  name: form.name,
                  email: form.email,
                  password: form.password,
                },
              },
            })
          }
          className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-900 transition"
        >
          <ArrowLeft size={18} />
          Back
        </button>
      </div>

      {/* Icon */}
      <div className="flex justify-center mb-5">
        <div className="w-20 h-20 rounded-full bg-blue-500/15 border border-white/40 flex items-center justify-center shadow-md">
          <PencilLine size={36} className="text-blue-700" />
        </div>
      </div>

      {/* Heading */}
      <p className="text-xs font-semibold tracking-[5px] text-blue-700 uppercase text-center mb-3">
        Admin Control
      </p>

      <h1 className="text-5xl font-bold text-center text-gray-900 mb-3">
        Edit User
      </h1>

      <p className="text-center text-gray-600 mb-8">
        Modify user details securely
      </p>

      {/* Name */}
      <div className="mb-4 relative">
        <UserRound className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-700" />
        <input
          type="text"
          id="name"
          value={form.name}
          onChange={handleChange}
          className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/45 border border-blue-400 outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {errors.name && <p className="text-red-500 text-sm mb-3">{errors.name}</p>}

      {/* Email */}
      <div className="mb-4 relative">
        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-700" />
        <input
          type="email"
          id="email"
          value={form.email}
          onChange={handleChange}
          className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/45 border border-blue-400 outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {errors.email && <p className="text-red-500 text-sm mb-3">{errors.email}</p>}

      {/* Password */}
      <div className="mb-4 relative">
        <LockKeyhole className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-700" />

        <input
          type={showPassword ? "text" : "password"}
          id="password"
          value={form.password}
          onChange={handleChange}
          className="w-full pl-11 pr-12 py-3 rounded-2xl bg-white/45 border border-blue-400 outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-700"
        >
          {showPassword ? <EyeOff /> : <Eye />}
        </button>
      </div>

      {errors.password && <p className="text-red-500 text-sm mb-3">{errors.password}</p>}

      {/* Rules */}
      <div className="mb-5 rounded-2xl bg-white/25 border border-blue-400 px-4 py-4 text-sm text-gray-700">
        <p>• One Capital Letter</p>
        <p>• One Number</p>
        <p>• One Symbol</p>
        <p>• Minimum 8 Characters</p>
      </div>

      {/* Checkbox */}
      <div className="flex items-center gap-3 mb-6">
        <input
          type="checkbox"
          checked={agree}
          onChange={() => setAgree(!agree)}
          className="accent-blue-500 w-4 h-4"
        />
        <label>I agree to update data</label>
      </div>

      {/* Button */}
      <button
        type="submit"
        disabled={!isValid}
        className={`w-full py-3 rounded-2xl font-bold tracking-[3px] ${
          isValid
            ? "bg-linear-to-r from-blue-500 via-indigo-500 to-blue-700 text-white"
            : "bg-gray-300 text-gray-500"
        }`}
      >
        UPDATE
      </button>
    </div>
  </form>
</div>
  );
}

export default AdminEdit;