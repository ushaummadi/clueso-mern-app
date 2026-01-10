// src/pages/Register.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/api.js";
import { useAuth } from "../context/AuthContext.jsx";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.email || !form.password) {
      return setError("All fields are required");
    }

    try {
      const res = await registerUser(form);
      login(res.data.token, res.data.user);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#faf5ff] to-[#f5f3ff] flex items-center justify-center px-4">
      <div className="w-full max-w-md flex flex-col items-center">
        {/* Logo + Title */}
        <div className="flex flex-col items-center mb-8">
          <div className="h-12 w-12 rounded-2xl bg-[#7c3aed] flex items-center justify-center text-white text-2xl shadow-lg">
            ✓
          </div>
          <h1 className="mt-4 text-3xl font-semibold text-slate-900">
            TaskMaster
          </h1>
          <p className="mt-1 text-sm text-slate-500 text-center">
            Manage your projects with elegance and ease.
          </p>
        </div>

        {/* Tabs (Login / Register) */}
        <div className="w-full max-w-lg bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm border border-white mb-4">
          <div className="grid grid-cols-2 text-sm font-medium text-slate-600">
            <Link
              to="/login"
              className="py-2.5 text-center rounded-l-2xl hover:bg-slate-50"
            >
              Login
            </Link>
            <button
              type="button"
              className="py-2.5 text-center rounded-r-2xl bg-white shadow-sm text-slate-900"
            >
              Register
            </button>
          </div>
        </div>

        {/* Main card */}
        <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl border border-slate-100 p-8">
          <h2 className="text-2xl font-semibold text-slate-900">
            Create an account
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Enter a username, email and password to get started.
          </p>

          {error && (
            <p className="mt-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-3 py-2">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {/* Username */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-slate-700"
              >
                Username
              </label>
              <input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="johndoe"
                className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7c3aed]/40"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7c3aed]/40"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="********"
                className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7c3aed]/40"
              />
            </div>

            <button
              type="submit"
              className="mt-2 w-full rounded-xl bg-[#7c3aed] text-white py-2.5 text-sm font-medium shadow-md hover:bg-[#6d28d9]"
            >
              Sign Up
            </button>
          </form>

          <p className="mt-4 text-sm text-slate-600 text-center">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-[#7c3aed] hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
