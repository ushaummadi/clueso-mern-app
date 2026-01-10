// src/components/TaskForm.jsx
import { useState } from "react";
import { createTask } from "../services/api";

const TaskForm = ({ onCreated, onCancel }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!title.trim()) {
      return setError("Title is required");
    }

    try {
      const res = await createTask({ title, description, priority });
      if (typeof onCreated === "function") onCreated(res.data);
      setTitle("");
      setDescription("");
      setPriority("medium");
    } catch (err) {
      console.error(
        "Create task error:",
        err.response?.status,
        err.response?.data || err.message
      );
      setError(
        err.response?.data?.message ||
          "Failed to create task. Please try again."
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 mt-6">
      {error && <p className="text-xs text-rose-500">{error}</p>}

      {/* Title */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-slate-800">
          Title
        </label>
        <input
          type="text"
          placeholder="e.g. Complete quarterly report"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-lg border border-violet-300 px-3 py-2.5 text-sm
                     bg-white text-slate-900 placeholder:text-slate-400
                     outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
        />
      </div>

      {/* Description */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-slate-800">
          Description
        </label>
        <textarea
          rows={4}
          placeholder="Add more details about this task..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm
                     bg-white text-slate-900 placeholder:text-slate-400
                     outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
        />
      </div>

      {/* Priority */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-slate-800">
          Priority
        </label>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-48 rounded-lg border border-slate-200 px-3 py-2 text-sm
                     bg-white text-slate-900
                     outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={() => typeof onCancel === "function" && onCancel()}
          className="px-5 py-2 rounded-lg border border-slate-300 text-sm text-slate-700 hover:bg-slate-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-5 py-2 rounded-lg bg-violet-600 text-sm font-semibold text-white hover:bg-violet-500"
        >
          Create Task
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
