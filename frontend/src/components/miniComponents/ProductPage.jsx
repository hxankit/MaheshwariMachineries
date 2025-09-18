import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import NavBar from "./navabar";

function ProductsPage() {
  const { categoryname, categoryid } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (categoryid) {
      fetch(
        `${import.meta.env.VITE_API_URL}/categories/${encodeURIComponent(
          categoryid
        )}/products`
      )
        .then((res) => res.json())
        .then((data) => {
          setProducts(data.data || []);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching products:", err);
          setLoading(false);
        });
    }
  }, [categoryid]);

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(price);

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-white text-gray-900 px-4 sm:px-6 py-8 sm:py-12">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto mb-4 sm:mb-6 text-xs sm:text-sm text-gray-600">
          <Link to="/" className="hover:text-blue-600 transition">
            Home
          </Link>{" "}
          /{" "}
          <Link to="/categories" className="hover:text-blue-600 transition">
            Categories
          </Link>{" "}
          /{" "}
          <span className="capitalize text-blue-700 font-semibold">
            {categoryname}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-10 text-center text-blue-700">
          {categoryname} Products
        </h1>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-500">
            No products found in this category.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-8 max-w-7xl mx-auto">
            {products.map((product) => (
              <Link
                to={`/product/${product._id}`}
                key={product._id}
                className="bg-white border border-gray-200 rounded-lg sm:rounded-xl 
                           p-3 sm:p-5 shadow-sm hover:shadow-md sm:hover:shadow-lg 
                           transition group"
              >
                <div className="w-full h-40 sm:h-48 flex items-center justify-center bg-gray-50 rounded mb-3 sm:mb-4 overflow-hidden">
                  <img
                    src={
                      product.image
                        ? `${import.meta.env.VITE_API_URL}/${product.image}`
                        : "/placeholder.png"
                    }
                    alt={product.title}
                    className="h-full object-contain group-hover:scale-105 transition"
                  />
                </div>
                <h2 className="text-base sm:text-lg font-semibold mb-1 text-gray-800 group-hover:text-blue-700">
                  {product.title}
                </h2>
                <p className="text-blue-700 font-bold mb-1 text-sm sm:text-base">
                  {formatPrice(product.price)}
                </p>
                <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
                  {product.desc}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default ProductsPage;
