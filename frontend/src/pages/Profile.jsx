// src/pages/Profile.jsx
import { useEffect, useState } from "react";
import AppLayout from "../layouts/AppLayout.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { fetchProfile } from "../services/api.js";

const Profile = () => {
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // load from backend on mount
  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetchProfile(); // GET /api/user/profile
        if (setUser) setUser(res.data);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to load profile"
        );
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return (
      <AppLayout
        title="Profile"
        subtitle="Manage your account settings and preferences."
      >
        <div className="rounded-2xl bg-white shadow-sm p-8">
          <p className="text-sm text-slate-500">Loading profile...</p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout
      title="Profile"
      subtitle="Manage your account settings and preferences."
    >
      <div className="rounded-2xl bg-white shadow-sm p-8">
        {/* Top banner */}
        <div className="rounded-2xl bg-gradient-to-r from-[#f3e8ff] to-[#e0e7ff] p-6 flex items-center gap-6 mb-8">
          <div className="h-20 w-20 rounded-full bg-[#7c3aed] flex items-center justify-center text-white text-3xl font-semibold shadow-lg">
            {(user?.name || user?.email || "U").slice(0, 2).toUpperCase()}
          </div>
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              {user?.email}
            </h2>
            <div className="mt-2 flex flex-wrap gap-2 text-xs">
              <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700">
                Free Plan
              </span>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-emerald-700">
                Active
              </span>
            </div>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-slate-900 mb-2">
          Account Information
        </h3>
        <p className="text-sm text-slate-500 mb-4">
          Personal details and application settings.
        </p>

        {error && (
          <p className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-3 py-2">
            {error}
          </p>
        )}

        <div className="rounded-2xl border border-slate-100 p-6 space-y-4">
          {/* Username - plain text */}
          <div className="flex items-start gap-4">
            <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center">
              <span className="text-slate-500">👤</span>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-900">Username</p>
              <p className="text-sm text-slate-600">
                {user?.name || user?.email}
              </p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start gap-4">
            <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center">
              <span className="text-slate-500">📧</span>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-900">Email</p>
              <p className="text-sm text-slate-600">{user?.email}</p>
            </div>
          </div>

          {/* Member Since (static text; adjust if you store this in DB) */}
          <div className="flex items-start gap-4">
            <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center">
              <span className="text-slate-500">📅</span>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-900">
                Member Since
              </p>
              <p className="text-sm text-slate-600">January 10, 2026</p>
            </div>
          </div>

          {/* Account ID (static) */}
          <div className="flex items-start gap-4">
            <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center">
              <span className="text-slate-500">🆔</span>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-900">
                Account ID
              </p>
              <p className="text-sm text-slate-600">USER-2</p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Profile;
