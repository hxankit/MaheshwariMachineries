import { useEffect, useState } from "react";
import NavBar from "../miniComponents/navabar";

function GalleryPage() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/products/allproducts`)
      .then((res) => res.json())
      .then((data) => {
        const imgUrls = data.data.map((item) => item.image);
        setImages(imgUrls);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching images:", err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 px-4 sm:px-6 py-10">
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-blue-700 mb-10">
          Our Gallery
        </h1>

        {/* Content */}
        {loading ? (
          <p className="text-center text-blue-600">Loading images...</p>
        ) : images.length === 0 ? (
          <p className="text-center text-gray-500">No images found.</p>
        ) : (
          <div className="columns-2 sm:columns-3 md:columns-4 gap-4 max-w-6xl mx-auto">
            {images.map((src, idx) => (
              <div
                key={idx}
                className="mb-4 break-inside-avoid rounded-lg overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition"
              >
                <img
                  src={src}
                  alt={`Gallery ${idx + 1}`}
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default GalleryPage;
