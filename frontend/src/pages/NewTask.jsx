import { useNavigate } from "react-router-dom";
import TaskForm from "../components/TaskForm.jsx";

const NewTask = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#faf7ff] flex items-center justify-center px-4">
      <div className="w-full max-w-3xl rounded-2xl bg-white shadow-sm p-10">
        <h1 className="text-3xl font-semibold text-slate-900">
          Create New Task
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Add a new task to your list.
        </p>

        <div className="mt-6">
          <TaskForm
            onTaskAdded={() => {
              // after creating, go back to tasks list
              navigate("/tasks");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default NewTask;
