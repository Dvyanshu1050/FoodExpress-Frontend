import { Link } from "react-router-dom";
import {
  FaBell,
  FaUserCircle,
  FaHome,
  FaSearch,
} from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

const AdminNavbar = () => {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-40 flex h-20 items-center justify-between border-b border-gray-200 bg-white/95 px-8 backdrop-blur-sm">
      {/* Left */}
      <div className="flex items-center gap-6">
        <Link
          to="/"
          className="flex items-center gap-2 rounded-xl bg-orange-500 px-4 py-2 font-medium text-white shadow transition-all duration-200 hover:bg-orange-600 hover:shadow-lg"
        >
          <FaHome />
          Home
        </Link>

        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Restaurant Dashboard
          </h1>

          <p className="text-sm text-gray-500">
            Welcome back 👋
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="hidden lg:flex">
        <div className="flex items-center rounded-xl border border-gray-200 bg-gray-50 px-4 py-2 transition focus-within:border-orange-500 focus-within:bg-white">
          <FaSearch className="mr-3 text-gray-400" />

          <input
            type="text"
            placeholder="Search products..."
            className="w-80 bg-transparent outline-none"
          />
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-6">
        {/* Notification */}
        <button className="relative rounded-xl p-3 text-gray-600 transition hover:bg-orange-50 hover:text-orange-500">
          <FaBell className="text-xl" />

          <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-500"></span>
        </button>

        {/* Profile */}
        <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2">
          <FaUserCircle className="text-4xl text-orange-500" />

          <div className="leading-tight">
            <p className="font-semibold text-slate-800">
              {user?.name || "Admin"}
            </p>

            <p className="text-sm capitalize text-gray-500">
              {user?.role || "Administrator"}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;