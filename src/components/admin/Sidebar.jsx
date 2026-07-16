import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBoxOpen,
  FaPlus,
  FaShoppingCart,
  FaUsers,
  FaSignOutAlt,
} from "react-icons/fa";

const Sidebar = () => {
  const menuItems = [
    {
      title: "Dashboard",
      path: "/admin",
      icon: <FaTachometerAlt />,
    },
    {
      title: "Products",
      path: "/admin/products",
      icon: <FaBoxOpen />,
    },
    {
      title: "Add Product",
      path: "/admin/add-product",
      icon: <FaPlus />,
    },
    {
      title: "Orders",
      path: "/admin/orders",
      icon: <FaShoppingCart />,
    },
    {
      title: "Users",
      path: "/admin/users",
      icon: <FaUsers />,
    },
  ];

  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white shadow-xl">
      {/* Logo */}
      <div className="border-b border-slate-700 p-6">
        <h1 className="text-2xl font-bold text-center text-orange-400">
          🍔 Food Admin
        </h1>
      </div>

      {/* Menu */}
      <nav className="mt-6 flex flex-col gap-2 px-3">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/admin"}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-4 py-3 transition-all duration-200 ${
                isActive
                  ? "bg-orange-500 text-white"
                  : "text-gray-300 hover:bg-slate-800 hover:text-white"
              }`
            }
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.title}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="absolute bottom-0 w-64 border-t border-slate-700 p-4">
        <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-red-400 transition hover:bg-red-500 hover:text-white">
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;