import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiMoreVertical } from "react-icons/fi";

function ViewCategory() {
  const navigate = useNavigate();
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openMenuId, setOpenMenuId] = useState(null);
  const dropdownRef = useRef(null);

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/categories/category`, {
        withCredentials: true,
      });
      setFilteredCategories(res.data.category || []);
    } catch (err) {
      setError("Failed to fetch categories");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const HandleEdit = (id) => {
    setOpenMenuId(null);
    navigate(`catergory`, { state: id });
  };

  const HandleDelete = async (id) => {
    setOpenMenuId(null);
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_URL}/categories/category/${id}/delete`,
        { withCredentials: true }
      );
      if (res.data.success) {
        setFilteredCategories((prev) => prev.filter((cat) => cat._id !== id));
      } else {
        alert("❌ Failed to delete category");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Error deleting category");
    }
  };

  const toggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  if (loading)
    return <div className="text-center mt-10 text-gray-500">Loading categories...</div>;
  if (error) return <div className="text-red-500 text-center mt-10">{error}</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Categories</h1>
        <button
          onClick={() => navigate("/admin/add-category")}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow-sm transition-all"
        >
          Add Category
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((cat) => (
          <div
            key={cat._id}
            className="bg-white rounded-lg shadow-md p-4 relative border hover:shadow-lg transition cursor-pointer"
            onClick={() => navigate(`catergory`, { state: cat._id })} // click card navigates
          >
            <img
              src={`${import.meta.env.VITE_API_URL}/${cat.pic}`}
              alt={cat.name}
              className="w-full h-40 object-cover rounded-md mb-3"
            />
            <h2 className="text-lg font-semibold text-gray-900">{cat.name}</h2>
            <p className="text-gray-600 text-sm mt-1">{cat.desc}</p>

            {/* Dropdown */}
            <div
              className="absolute top-3 right-3"
              ref={dropdownRef}
              onClick={(e) => e.stopPropagation()} // prevent card click when clicking dropdown
            >
              <button
                onClick={() => toggleMenu(cat._id)}
                className="p-2 rounded-full hover:bg-gray-100 transition-all"
              >
                <FiMoreVertical className="text-gray-600" size={18} />
              </button>

              {openMenuId === cat._id && (
                <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700 text-sm"
                    onClick={() => setOpenMenuId(null)}
                  >
                    Edit
                  </button>
                  
                  <button
                    onClick={() => HandleDelete(cat._id)}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600 text-sm"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredCategories.length === 0 && (
        <p className="text-gray-500 mt-4 text-center">No categories found.</p>
      )}
    </div>
  );
}

export default ViewCategory;
