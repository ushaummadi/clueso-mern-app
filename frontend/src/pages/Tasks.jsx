// src/pages/Tasks.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchTasks } from "../services/api.js";
import { useAuth } from "../context/AuthContext.jsx";
import TaskForm from "../components/TaskForm.jsx";
import TaskList from "../components/TaskList.jsx";

const Tasks = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [priority, setPriority] = useState("all");
  const [loading, setLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadTasks = async () => {
    try {
      setLoading(true);
      console.log("LOAD TASKS with:", { search, status, priority });
      const res = await fetchTasks({ search, status, priority });
      console.log("API returned:", res.data.length, "tasks");
      setTasks(res.data);
    } catch (err) {
      console.error("LOAD TASKS ERROR", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
    // eslint-disable-next-line
  }, [status, priority, search]);

  // use whatever the server returned
  const filtered = tasks || [];
  console.log("TASKS:", tasks.length, "FILTERED:", filtered.length);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#faf7ff] flex">
      {/* LEFT: Sidebar */}
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
            onClick={() => setIsModalOpen(true)}
          >
            + New Task
          </button>
        </div>

        <nav className="mt-6 space-y-1 px-2 text-sm">
          <button
            className="w-full flex items-center gap-2 rounded-xl px-4 py-2 text-slate-600 hover:bg-slate-50"
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </button>
          <button className="w-full flex items-center gap-2 rounded-xl px-4 py-2 bg-[#f3e8ff] text-[#7c3aed] font-medium">
            My Tasks
          </button>
          <button
            className="w-full flex items-center gap-2 rounded-xl px-4 py-2 text-slate-600 hover:bg-slate-50"
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

      {/* RIGHT: Tasks content */}
      <main className="flex-1 px-10 py-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">Tasks</h1>
            <p className="mt-1 text-sm text-slate-600">
              Manage your daily tasks and productivity.
            </p>
          </div>
          <button
            className="rounded-xl bg-[#7c3aed] text-white px-5 py-2.5 text-sm font-medium shadow-sm hover:bg-[#6d28d9]"
            onClick={() => setIsModalOpen(true)}
          >
            + Create Task
          </button>
        </div>

        {/* Filters row */}
        <div className="mt-6 rounded-2xl bg-white shadow-sm px-6 py-4 flex flex-wrap gap-3 items-center justify-between">
          {/* Search */}
          <div className="flex-1 min-w-[260px] max-w-xl flex items-center gap-2 border border-slate-200 rounded-xl bg-slate-50 px-3 py-2">
            <span className="text-slate-400 text-sm">🔍</span>
           <input
  type="text"
  placeholder="Search tasks..."
  className="flex-1 bg-transparent text-sm outline-none text-slate-900 placeholder:text-slate-400"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>

          </div>

          {/* Status + Priority */}
          <div className="flex gap-3">
            <div className="w-40">
              <select
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7c3aed]/40"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
>

                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>

            <div className="w-40">
              <select
  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7c3aed]/40"
  value={priority}
  onChange={(e) => setPriority(e.target.value)}
>

                <option value="all">All Priorities</option>
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
            </div>
          </div>
        </div>
        {/* Content area */}
        <div className="mt-6 rounded-2xl bg-white shadow-sm px-6 py-10">
          {loading ? (
            <p className="text-sm text-slate-500">Loading tasks...</p>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <p className="text-sm text-slate-500">
                No tasks found matching your filters.
              </p>
              <button
                className="mt-3 text-sm font-medium text-[#7c3aed]"
                onClick={() => setIsModalOpen(true)}
              >
                Create a new task
              </button>
            </div>
          ) : (
            <div className="max-h-96 overflow-y-auto pr-1">
              <TaskList tasks={filtered} onChange={loadTasks} />
            </div>
          )}
        </div>
      </main>

      {/* MODAL: create form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-2xl rounded-2xl bg-white shadow-xl p-8 relative">
            <button
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 text-xl"
              onClick={() => setIsModalOpen(false)}
            >
              ×
            </button>

            <h2 className="text-xl font-semibold text-slate-900">
              Create New Task
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Add a new task to your list. Fill in the details below.
            </p>

            <TaskForm
              onCreated={() => {
                setIsModalOpen(false);
                loadTasks();
              }}
              onCancel={() => setIsModalOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;
