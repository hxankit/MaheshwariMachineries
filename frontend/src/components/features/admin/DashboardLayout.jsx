import { Link, Outlet } from "react-router-dom";
import { FaPlus, FaTrash, FaList, FaTags, FaHome, FaUsers } from "react-icons/fa";

function AdminLayout() {
  return (
    <div className="min-h-screen flex bg-gray-900 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 p-6 flex flex-col">
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
      </aside>

      {/* Main Content Area (Dynamic with Outlet) */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
