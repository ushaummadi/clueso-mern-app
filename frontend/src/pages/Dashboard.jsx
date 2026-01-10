// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchTasks } from "../services/api.js";
import { useAuth } from "../context/AuthContext.jsx";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadTasks = async () => {
    try {
      setLoading(true);
      // no filters here – get all tasks for user
      const res = await fetchTasks({});
      setTasks(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === "done").length;
  const pendingTasks = tasks.filter((t) => t.status === "pending").length;
  const highPriorityTasks = tasks.filter((t) => (t.priority || "medium") === "high").length;

  const recentTasks = [...tasks]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
    });

  return (
    <div className="min-h-screen bg-[#faf7ff] flex">
      {/* LEFT: Sidebar (same as Tasks) */}
      <aside className="w-72 bg-white border-r border-slate-100 flex flex-col">
        {/* Logo */}
        <div className="px-6 py-6 flex items-center gap-2">
          <div className="h-9 w-9 rounded-2xl bg-[#7c3aed] flex items-center justify-center text-white text-xl">
            ✓
          </div>
          <span className="font-semibold text-lg text-slate-900">
            TaskMaster
          </span>
        </div>

        {/* New Task button */}
        <div className="px-4">
          <button
            className="w-full rounded-xl bg-[#7c3aed] text-white py-3 text-sm font-medium shadow-sm hover:bg-[#6d28d9]"
            onClick={() => navigate("/tasks")}
          >
            + New Task
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-6 space-y-1 px-2 text-sm">
          <button className="w-full flex items-center gap-2 rounded-xl px-4 py-2 bg-[#f3e8ff] text-[#7c3aed] font-medium">
            Dashboard
          </button>
          <button
            className="w-full flex items-center gap-2 rounded-xl px-4 py-2 text-slate-600 hover:bg-slate-50"
            onClick={() => navigate("/tasks")}
          >
            My Tasks
          </button>
          <button
            className="w-full flex items-center gap-2 rounded-xl px-4 py-2 text-slate-600 hover:bg-slate-50"
            onClick={() => navigate("/profile")}
          >
            Profile
          </button>
        </nav>

        {/* User + logout */}
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

      {/* RIGHT: Dashboard content */}
      <main className="flex-1 px-10 py-8">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">
              Dashboard
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Manage your daily tasks and productivity.
            </p>
          </div>
        </div>

        {/* Summary cards */}
        <div className="mt-6 grid gap-5 md:grid-cols-4">
          <div className="rounded-2xl bg-white shadow-sm px-5 py-4">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
              Total Tasks
            </p>
            <p className="mt-3 text-3xl font-semibold text-slate-900">
              {totalTasks}
            </p>
          </div>

          <div className="rounded-2xl bg-white shadow-sm px-5 py-4">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
              Completed
            </p>
            <p className="mt-3 text-3xl font-semibold text-slate-900">
              {completedTasks}
            </p>
          </div>

          <div className="rounded-2xl bg-white shadow-sm px-5 py-4">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
              Pending
            </p>
            <p className="mt-3 text-3xl font-semibold text-slate-900">
              {pendingTasks}
            </p>
          </div>

          <div className="rounded-2xl bg-white shadow-sm px-5 py-4">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
              High Priority
            </p>
            <p className="mt-3 text-3xl font-semibold text-slate-900">
              {highPriorityTasks}
            </p>
          </div>
        </div>

        {/* Main grid: Recent Tasks + Quick Actions */}
        <div className="mt-8 grid gap-6 lg:grid-cols-[2fr,1fr]">
          {/* Recent Tasks */}
          <section className="rounded-2xl bg-white shadow-sm px-6 py-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-900">
                Recent Tasks
              </h2>
              <button
                className="text-xs font-medium text-[#7c3aed]"
                onClick={() => navigate("/tasks")}
              >
                View All
              </button>
            </div>

            {loading ? (
              <p className="text-sm text-slate-500">Loading tasks...</p>
            ) : recentTasks.length === 0 ? (
              <p className="text-sm text-slate-500">
                No tasks yet. Create your first task to get started.
              </p>
            ) : (
              <div className="space-y-3">
                {recentTasks.map((t) => (
                  <div
                    key={t._id}
                    className="flex items-center justify-between rounded-2xl bg-[#fbf7ff] px-4 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                      <div>
                        <p className="text-sm font-medium text-slate-900">
                          {t.title}
                        </p>
                        {t.description && (
                          <p className="text-xs text-slate-500">
                            {t.description}
                          </p>
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-slate-500">
                      {formatDate(t.createdAt)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Quick Actions */}
          <section className="rounded-2xl bg-[#f3e8ff] shadow-sm px-6 py-5">
            <h2 className="text-lg font-semibold text-slate-900 mb-2">
              Quick Actions
            </h2>
            <p className="text-xs text-slate-600 mb-5">
              Get things done faster with these shortcuts.
            </p>

            <div className="space-y-3">
              <button
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#7c3aed] text-white py-3 text-sm font-medium shadow-sm hover:bg-[#6d28d9]"
                onClick={() => navigate("/tasks")}
              >
                Go to Tasks
              </button>
              <button
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-white text-sm font-medium text-slate-800 border border-slate-200 hover:bg-slate-50"
                onClick={() => navigate("/profile")}
              >
                View Profile
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
