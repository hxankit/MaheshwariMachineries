// SearchResults.jsx
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function SearchResults() {
  const [results, setResults] = useState([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/products/search?query=${query}`);
        console.log(res.data)
        setResults(res.data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    if (query) fetchResults();
  }, [query]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Search Results for "{query}"</h2>
      {results.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {results.map((product) => (
            <div key={product._id} className="border p-4 rounded-lg shadow">
              <img src={`${import.meta.env.VITE_API_URL}/${product.image}`} alt={product.title} className="h-40 w-full object-cover rounded" />
              <h3 className="text-lg font-semibold mt-2">{product.title}</h3>
              <p className="text-gray-600">${product.price}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
}
