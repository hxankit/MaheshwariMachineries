import { Link, Outlet, useNavigate } from "react-router-dom";
import { FaPlus, FaTrash, FaList, FaTags, FaHome, FaUsers, FaSignOutAlt } from "react-icons/fa";
import axios from "axios";

function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(`/api/admin/logout`, {}, { withCredentials: true });
      
      // Clear all localStorage items related to session
      localStorage.clear();

      // Redirect to login
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
      alert("❌ Logout failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-900 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 p-6 flex flex-col justify-between">
        <div>
          <h1 className="text-1xl font-bold text-orange-400 mb-8">Maheshwari Machinaries</h1>

          <nav className="flex flex-col space-y-4">
            <Link
              to="/admin"
              className="flex items-center gap-3 text-gray-300 hover:text-orange-400 transition"
            >
              <FaHome /> Dashboard
            </Link>

            <Link
              to="/admin/categries"
              className="flex items-center gap-3 text-gray-300 hover:text-orange-400 transition"
            >
              <FaList /> View Categories
            </Link>

            <Link
              to="/admin/contacts"
              className="flex items-center gap-3 text-gray-300 hover:text-orange-400 transition"
            >
              <FaUsers /> Contacts Data
            </Link>
          </nav>
        </div>

        {/* Logout Button at the bottom */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 text-gray-300 hover:text-red-500 transition font-semibold mt-8"
        >
          <FaSignOutAlt /> Logout
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
