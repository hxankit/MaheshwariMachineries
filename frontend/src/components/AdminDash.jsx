import { Link } from 'react-router-dom';
import { FaPlus, FaTrash, FaList, FaTags } from 'react-icons/fa';

function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-3xl font-bold text-orange-400 mb-8">Admin Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8">
          {/* Add Product */}
          <Link
            to="/admin/add-product"
            className="bg-gray-800 hover:bg-gray-700 p-6 rounded-lg shadow-md transition-all group"
          >
            <FaPlus className="text-3xl text-orange-400 mb-2 mx-auto group-hover:scale-110 transition" />
            <h2 className="text-lg font-semibold">Add Product</h2>
            <p className="text-sm text-gray-400">Create a new product entry</p>
          </Link>

          {/* Delete Product */}
          <Link
            to="/admin/delete-product"
            className="bg-gray-800 hover:bg-gray-700 p-6 rounded-lg shadow-md transition-all group"
          >
            <FaTrash className="text-3xl text-red-500 mb-2 mx-auto group-hover:scale-110 transition" />
            <h2 className="text-lg font-semibold">Delete Product</h2>
            <p className="text-sm text-gray-400">Remove an existing product</p>
          </Link>

          {/* Add Category */}
          <Link
            to="/admin/add-category"
            className="bg-gray-800 hover:bg-gray-700 p-6 rounded-lg shadow-md transition-all group"
          >
            <FaTags className="text-3xl text-green-400 mb-2 mx-auto group-hover:scale-110 transition" />
            <h2 className="text-lg font-semibold">Add Category</h2>
            <p className="text-sm text-gray-400">Create a new product category</p>
          </Link>

          {/* Manage Categories */}
          <Link
            to="/admin/categories"
            className="bg-gray-800 hover:bg-gray-700 p-6 rounded-lg shadow-md transition-all group"
          >
            <FaList className="text-3xl text-blue-400 mb-2 mx-auto group-hover:scale-110 transition" />
            <h2 className="text-lg font-semibold">View Categories</h2>
            <p className="text-sm text-gray-400">Manage all existing categories</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
