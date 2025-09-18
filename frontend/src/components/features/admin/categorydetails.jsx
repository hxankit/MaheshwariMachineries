import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { FiPlus, FiEye, FiEdit } from "react-icons/fi";

function CategoryDetailsPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const id = state;

  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch category details & products
  const fetchCategoryData = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/categories/category/${id}`,
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

  if (loading)
    return <div className="text-center mt-10 text-gray-500">Loading...</div>;

  if (error)
    return <div className="text-red-500 text-center mt-10">{error}</div>;

  if (!category)
    return (
      <div className="text-center mt-10 text-gray-500">Category not found</div>
    );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Category Info */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6 flex flex-col sm:flex-row sm:justify-between items-center gap-4">
        <div className="flex gap-4 items-center">
          <img
            src={`${import.meta.env.VITE_API_URL}/${category.pic}`}
            alt={category.name}
            className="w-32 h-32 object-cover rounded-md"
          />
          <div>
            <h1 className="text-xl font-bold text-gray-800">{category.name}</h1>
            <p className="text-gray-600 mt-1 text-sm line-clamp-2">{category.desc}</p>
          </div>
        </div>

        {/* Add Product Button */}
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
              className="bg-white rounded-lg shadow hover:shadow-lg transition p-3 flex flex-col"
            >
              <img
                src={`${import.meta.env.VITE_API_URL}/${product.image}`}
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
                <button
                  // onClick={() => navigate("/admin/edit-product", { state: product._id })}
                  className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-1 rounded-md text-xs flex items-center justify-center gap-1"
                >
                  <FiEdit /> Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CategoryDetailsPage;
