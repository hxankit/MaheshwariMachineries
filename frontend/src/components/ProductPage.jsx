import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function ProductsPage() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (category) {
      fetch(`https://fakestoreapi.com/products/category/${category}`)
        .then((res) => res.json())
        .then((data) => {
          setProducts(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Error fetching products:', err);
          setLoading(false);
        });
    }
  }, [category]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-orange-400 text-center capitalize">
        Products in "{category}"
      </h1>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-400">No products found in this category.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {products.map((product) => (
            <Link
              to={`/product/${product.id}`}
              key={product.id}
              className="bg-gray-800 rounded-lg p-4 shadow-md hover:shadow-xl transition transform hover:-translate-y-1"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-contain mb-4 bg-white rounded"
              />
              <h2 className="text-lg font-semibold mb-1">{product.title}</h2>
              {/* <p className="text-orange-300 font-bold mb-1">${product.price}</p> */}
              {/* <p className="text-sm text-gray-400 line-clamp-2">{product.description}</p> */}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductsPage;
