import { FaBell, FaUserCircle } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

const AdminNavbar = () => {
  const { user } = useAuth();

  return (
    <header className="flex items-center justify-between bg-white px-8 py-4 shadow-md">
      {/* Left */}
      <div>
        <h1 className="text-2xl font-bold text-orange-500">
          Restaurant Dashboard
        </h1>
      </div>

      {/* Center */}
      <div className="hidden md:block">
        <input
          type="text"
          placeholder="Search..."
          className="w-80 rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-orange-500"
        />
      </div>

      {/* Right */}
      <div className="flex items-center gap-6">
        <button className="relative text-2xl text-gray-600 hover:text-orange-500">
          <FaBell />
          <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-red-500"></span>
        </button>

        <div className="flex items-center gap-2">
          <FaUserCircle className="text-3xl text-orange-500" />

          <div>
            <p className="font-semibold">
              {user?.name || "Admin"}
            </p>

            <p className="text-sm text-gray-500">
              {user?.role || "admin"}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;