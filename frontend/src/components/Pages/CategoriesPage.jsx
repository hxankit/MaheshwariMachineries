import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../miniComponents/navabar";

function CategoryPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/categories/category`)
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.category || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 px-4 sm:px-6 py-6">
        <h1 className="text-2xl sm:text-4xl font-bold mb-6 sm:mb-8 text-center text-blue-700">
          Explore Our Machinery Categories
        </h1>

        {loading ? (
          <div className="text-center text-gray-500">Loading categories...</div>
        ) : categories.length === 0 ? (
          <div className="text-center text-gray-500 text-lg mt-10">
            No categories found.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 max-w-6xl mx-auto">
            {categories.map((cat) => (
              <Link
                key={cat._id}
                to={`/${cat.name}/${encodeURIComponent(cat._id)}`}
                className="group bg-white border border-gray-200 rounded-xl sm:rounded-2xl 
                           overflow-hidden shadow-sm hover:shadow-lg 
                           transform transition duration-300 hover:-translate-y-1"
              >
                {/* Image container */}
                <div className="w-full h-36 sm:h-48 overflow-hidden">
                  {cat.pic && (
                    <img
                      src={cat.pic}
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                </div>

                {/* Text content */}
                <div className="p-3 sm:p-4 text-center">
                  <h2 className="text-base sm:text-lg font-semibold text-gray-800 capitalize">
                    {cat.name}
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-500 group-hover:text-blue-600 transition">
                    View Products
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default CategoryPage;
