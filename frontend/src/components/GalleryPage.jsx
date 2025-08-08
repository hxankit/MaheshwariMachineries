import { useEffect, useState } from 'react';

function GalleryPage() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
        const imgUrls = data.map(item => item.image);
        setImages(imgUrls);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching images:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold text-center text-orange-400 mb-8">
        Our Gallery
      </h1>

      {loading ? (
        <p className="text-center">Loading images...</p>
      ) : images.length === 0 ? (
        <p className="text-center text-gray-400">No images found.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {images.map((src, idx) => (
            <div
              key={idx}
              className="bg-white rounded shadow-md overflow-hidden transform hover:scale-105 transition duration-300"
            >
              <img
                src={src}
                alt={`Gallery ${idx + 1}`}
                className="w-full h-48 object-contain bg-white p-2"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default GalleryPage;
