import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function CategoryPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories") // ✅ This returns category names
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 p-6">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-orange-600">
        Explore Our Machinery Categories
      </h1>

      {loading ? (
        <div className="text-center text-gray-500">Loading categories...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {categories.map((cat, index) => (
            <Link
              key={index}
              to={`/category/${encodeURIComponent(cat)}`}
              className="group bg-white hover:bg-orange-50 border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-lg transform transition duration-300 hover:-translate-y-1"
            >
              <div className="text-center space-y-4">
                <div className="text-2xl font-semibold text-gray-800 capitalize">
                  {cat}
                </div>
                <div className="text-sm text-gray-500 group-hover:text-orange-600 transition">
                  View Products
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default CategoryPage;
