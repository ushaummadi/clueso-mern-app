import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow px-4 py-2 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Link to="/dashboard" className="font-semibold">
          Task Dashboard
        </Link>
        {user && (
          <Link to="/profile" className="text-sm text-slate-700">
            Profile
          </Link>
        )}
      </div>
      {user && (
        <div className="flex items-center gap-3 text-sm">
          <span>{user.name}</span>
          <button
            onClick={logout}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
