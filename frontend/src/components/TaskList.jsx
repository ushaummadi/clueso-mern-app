import { deleteTaskApi, updateTaskApi } from "../services/api.js";

const TaskList = ({ tasks, onChange }) => {
  const handleDelete = async (id) => {
    await deleteTaskApi(id);
    onChange();
  };

  const handleStatusChange = async (task, status) => {
    await updateTaskApi(task._id, { status });
    onChange();
  };

  if (!tasks.length) return <p className="text-sm text-slate-500">No tasks.</p>;

  return (
    <ul className="space-y-2">
      {tasks.map((task) => (
     <li
  key={task._id}
  className="bg-white border border-slate-200 rounded-xl px-4 py-3 flex items-start justify-between gap-3 shadow-sm hover:border-[#7c3aed]/70 hover:bg-slate-50 transition"
>
  <div>
    <p className="font-medium text-xs md:text-sm text-slate-900">
      {task.title}
    </p>
    {task.description && (
      <p className="text-[11px] md:text-xs text-slate-500 mt-1">
        {task.description}
      </p>
    )}
  </div>
  <div className="flex items-center gap-2">
    <select
      value={task.status}
      onChange={(e) => handleStatusChange(task, e.target.value)}
      className="border border-slate-300 bg-white rounded-md px-2 py-1 text-[11px] text-slate-800"
    >
      <option value="pending">Pending</option>
      <option value="in-progress">In progress</option>
      <option value="done">Done</option>
    </select>
    <button
      onClick={() => handleDelete(task._id)}
      className="text-[11px] text-rose-500 hover:text-rose-600"
    >
      Delete
    </button>
  </div>
</li>

      ))}
    </ul>
  );
};

export default TaskList;
