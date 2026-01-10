import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/api.js";
import { useAuth } from "../context/AuthContext.jsx";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      return setError("Email and password are required");
    }

    try {
      const res = await loginUser(form);
      login(res.data.token, res.data.user);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#f4f2ff] via-[#f9f7ff] to-white">
      <div className="w-full max-w-md space-y-6 px-4">
        {/* icon + title */}
        <div className="flex flex-col items-center gap-3">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-[#8b5cf6] to-[#6366f1] flex items-center justify-center shadow-md">
            <span className="text-white text-xl font-semibold">✓</span>
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              TaskMaster
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Manage your projects with elegance and focus.
            </p>
          </div>
        </div>

        {/* tabs */}
        <div className="bg-white rounded-full border border-slate-200 p-1 flex text-sm shadow-sm">
          <button
            type="button"
            className="flex-1 rounded-full bg-white text-slate-900 font-medium py-1.5 shadow-sm"
          >
            Login
          </button>
          <Link
            to="/register"
            className="flex-1 rounded-full text-center text-slate-500 py-1.5 hover:bg-slate-50"
          >
            Register
          </Link>
        </div>

        {/* card */}
        <div className="bg-white rounded-3xl shadow-[0_18px_60px_rgba(15,23,42,0.08)] border border-slate-100 px-6 py-7">
          <h2 className="text-xl font-semibold mb-1">Welcome back</h2>
          <p className="text-sm text-slate-500 mb-5">
            Enter your credentials to access your tasks.
          </p>

          {error && (
            <p className="text-xs text-rose-500 bg-rose-50 border border-rose-100 rounded-md px-3 py-2 mb-4">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5 text-sm">
              <label className="block text-slate-700">Email</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="johndoe@example.com"
                className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#8b5cf6] focus:border-transparent bg-slate-50/60"
              />
            </div>

            <div className="space-y-1.5 text-sm">
              <label className="block text-slate-700">Password</label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#8b5cf6] focus:border-transparent bg-slate-50/60"
              />
            </div>

            <button
              type="submit"
              className="mt-2 w-full rounded-xl bg-gradient-to-r from-[#8b5cf6] to-[#6366f1] text-white text-sm font-medium py-2.5 shadow-[0_12px_30px_rgba(129,140,248,0.55)] hover:brightness-110 transition"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
