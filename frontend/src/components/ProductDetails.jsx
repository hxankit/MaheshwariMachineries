import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function ProductDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching product:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center">
        <p className="text-lg">Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-900 text-red-500 flex justify-center items-center">
        <p className="text-lg">Product not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-sm text-gray-300 hover:text-orange-400 transition"
      >
        ← Back
      </button>

      <div className="flex flex-col md:flex-row items-center gap-10 max-w-5xl mx-auto bg-gray-800 p-6 rounded-xl shadow-lg">
        <img
          src={product.image}
          alt={product.title}
          className="w-64 h-64 object-contain bg-white p-4 rounded"
        />
        <div className="space-y-4 text-center md:text-left">
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-xl text-orange-400 font-semibold">${product.price}</p>
          <p className="text-gray-300">{product.description}</p>
          <p className="text-sm text-gray-400">
            Category: <span className="capitalize">{product.category}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsPage;

