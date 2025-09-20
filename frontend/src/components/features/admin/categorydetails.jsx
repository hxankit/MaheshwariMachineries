import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { FiPlus, FiEye, FiEdit, FiX, FiMoreVertical } from "react-icons/fi";

function CategoryDetailsPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const id = state;

  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Edit modal states
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [formData, setFormData] = useState({ title: "", price: "", desc: "" });

  // Fetch category & products
  const fetchCategoryData = async () => {
    try {
      const res = await axios.get(
        `/api/categories/category/${id}`,
        { withCredentials: true }
      );
      setCategory(res.data.category);
      setProducts(res.data.products || []);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch category details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryData();
  }, [id]);
  // Open edit modal and fetch product data
const handleEdit = async (productId) => {
  try {
    const res = await axios.get(
      `/api/categories/product/${productId}/productDetails`,
      { withCredentials: true }
    );
    const product = res.data.data; // ✅ use data
    setEditProduct(product);
    setFormData({
      title: product.title,
      price: product.price,
      desc: product.desc,
    });
    setIsEditOpen(true);
  } catch (err) {
    console.error(err);
    alert("Failed to fetch product details");
  }
};

  // Handle input changes in edit form
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const [openMenuId, setOpenMenuId] = useState(null); // for dropdown toggle

  // Delete product
  const handleDelete = async (productId) => {
    const confirm = window.confirm("Are you sure you want to delete this product?");
    if (!confirm) return;

    try {
      await axios.delete(
        `/api/products/product/${productId}/delete`,
        { withCredentials: true }
      );
      alert("✅ Product deleted successfully");
      fetchCategoryData(); // refresh list
    } catch (err) {
      console.error(err);
      alert("❌ Failed to delete product");
    }
  };

  // Submit edited product
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `/api/products/product/edit`,
        {...formData,productId:editProduct._id},
        { withCredentials: true }
      );
      alert("✅ Product updated successfully");
      setIsEditOpen(false);
      fetchCategoryData(); // refresh products
    } catch (err) {
      console.error(err);
      alert("❌ Failed to update product");
    }
  };

  if (loading)
    return <div className="text-center mt-10 text-gray-500">Loading...</div>;
  if (error) return <div className="text-red-500 text-center mt-10">{error}</div>;
  if (!category)
    return <div className="text-center mt-10 text-gray-500">Category not found</div>;

  
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Category Info */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6 flex flex-col sm:flex-row sm:justify-between items-center gap-4">
        <div className="flex gap-4 items-center">
          <img
            src={category.pic}
            alt={category.name}
            className="w-32 h-32 object-cover rounded-md"
          />
          <div>
            <h1 className="text-xl font-bold text-gray-800">{category.name}</h1>
            <p className="text-gray-600 mt-1 text-sm line-clamp-2">{category.desc}</p>
          </div>
        </div>

        <button
          onClick={() =>
            navigate("/admin/categories/product/create", { state: category._id })
          }
          className="mt-2 sm:mt-0 bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-lg shadow-md flex items-center gap-2 text-sm sm:text-base font-semibold transition duration-200 ease-in-out"
        >
          <FiPlus className="text-white" /> Add Product
        </button>
      </div>

       {/* Products Grid */}
      <h2 className="text-lg font-semibold text-gray-800 mb-3">Products</h2>
      {products.length === 0 ? (
        <p className="text-gray-500 text-sm">No products in this category.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition p-3 flex flex-col relative"
            >
              {/* Three-dot menu */}
              <div className="absolute top-2 right-2">
                <button
                  onClick={() => setOpenMenuId(openMenuId === product._id ? null : product._id)}
                  className="p-1 hover:bg-gray-200 rounded-full"
                >
                  <FiMoreVertical />
                </button>
                {openMenuId === product._id && (
                  <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-md z-50">
                    <button
                      onClick={() => handleEdit(product._id)}
                      className="w-full text-left px-3 py-2  text-blue-600 hover:bg-gray-100 flex items-center gap-2"
                    >
                      <FiEdit /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="w-full text-left px-3 py-2 hover:bg-gray-100 flex items-center gap-2 text-red-600"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>

              <img
                src={product.image}
                alt={product.title}
                className="w-full h-32 object-cover rounded-md mb-2"
              />
              <h3 className="text-md font-semibold text-gray-900 truncate">{product.title}</h3>
              <p className="text-orange-600 font-semibold mt-1 text-sm">₹{product.price}</p>
              <p className="text-gray-600 text-xs mt-1 line-clamp-2">{product.desc}</p>

              <div className="mt-auto flex gap-2 pt-2">
                <button
                  onClick={() => navigate(`/product/${product._id}`)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-1 rounded-md text-xs flex items-center justify-center gap-1"
                >
                  <FiEye /> View
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Edit Product Modal */}
      {isEditOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 text-black flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative overflow-y-auto max-h-[90vh]">
      <button
        onClick={() => setIsEditOpen(false)}
        className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
      >
        <FiX size={20} />
      </button>
      <h2 className="text-lg font-bold mb-4">Edit Product</h2>
      <form onSubmit={handleUpdate} className="space-y-3">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Product Title"
          className="w-full border border-gray-300 rounded px-3 py-2"
          required
        />
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full border border-gray-300 rounded px-3 py-2"
          required
        />
        <textarea
          name="desc"
          value={formData.desc}
          onChange={handleChange}
          placeholder="Description"
          className="w-full border border-gray-300 rounded px-3 py-2"
          rows={3}
        />
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded font-semibold transition"
        >
          Update Product
        </button>
      </form>
    </div>
  </div>
)}

    </div>
  );
}

export default CategoryDetailsPage;
