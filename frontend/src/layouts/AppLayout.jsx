// src/layouts/AppLayout.jsx
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const AppLayout = ({ children, title, subtitle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const isActive = (path) =>
    location.pathname === path ? "bg-[#f3e8ff] text-[#7c3aed]" : "text-slate-600";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#faf7ff] flex">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-slate-100 flex flex-col">
        <div className="px-6 py-6 flex items-center gap-2">
          <div className="h-9 w-9 rounded-2xl bg-[#7c3aed] flex items-center justify-center text-white text-xl">
            ✓
          </div>
          <span className="font-semibold text-lg text-slate-900">
            TaskMaster
          </span>
        </div>

        <div className="px-4">
          <button
            className="w-full rounded-xl bg-[#7c3aed] text-white py-3 text-sm font-medium shadow-sm hover:bg-[#6d28d9]"
            onClick={() => navigate("/tasks/new")}
          >
            + New Task
          </button>
        </div>

        <nav className="mt-6 space-y-1 px-2 text-sm">
          <button
            className={`w-full flex items-center gap-2 rounded-xl px-4 py-2 hover:bg-slate-50 ${isActive(
              "/dashboard"
            )}`}
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </button>
          <button
            className={`w-full flex items-center gap-2 rounded-xl px-4 py-2 hover:bg-slate-50 ${isActive(
              "/tasks"
            )}`}
            onClick={() => navigate("/tasks")}
          >
            My Tasks
          </button>
          <button
            className={`w-full flex items-center gap-2 rounded-xl px-4 py-2 hover:bg-slate-50 ${isActive(
              "/profile"
            )}`}
            onClick={() => navigate("/profile")}
          >
            Profile
          </button>
        </nav>

        <div className="mt-auto px-4 pb-6 space-y-3">
          <div className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3">
            <div className="h-8 w-8 rounded-full bg-[#ede9fe] flex items-center justify-center text-[#7c3aed] font-semibold">
              {(user?.name || user?.email || "U")[0].toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-medium text-slate-900">
                {user?.email}
              </p>
              <p className="text-xs text-slate-500">Free Plan</p>
            </div>
          </div>
          <button
            className="w-full rounded-xl border border-slate-200 py-2.5 text-sm text-slate-700 hover:bg-slate-50"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 px-10 py-8">
        {title && (
          <div className="mb-6">
            <h1 className="text-3xl font-semibold text-slate-900">{title}</h1>
            {subtitle && (
              <p className="mt-1 text-sm text-slate-600">{subtitle}</p>
            )}
          </div>
        )}
        {children}
      </main>
    </div>
  );
};

export default AppLayout;
