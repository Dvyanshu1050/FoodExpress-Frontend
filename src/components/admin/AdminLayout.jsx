import Sidebar from "./Sidebar";
import AdminNavbar from "./AdminNavbar";

const AdminLayout = ({ children }) => {
  return (
    <div className="bg-gray-100">
      {/* Fixed Sidebar */}
      <div className="fixed left-0 top-0 h-screen w-64">
        <Sidebar />
      </div>

      {/* Right Side */}
      <div className="ml-64">
        {/* Fixed Navbar */}
        <div className="fixed left-64 right-0 top-0 z-40 h-20">
          <AdminNavbar />
        </div>

        {/* Scrollable Content */}
        <main className="mt-20 min-h-screen p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;