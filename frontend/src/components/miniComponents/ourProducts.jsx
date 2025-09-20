import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

function ProductSection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });

    fetch(`/api/products/allproducts?limit=8`)
      .then(res => res.json())
      .then(data => {
      
        const formatted = data.data.map((item) => ({
          
          id: item._id,
          title: item.title,
          image: item.image,
          link: `/product/${item._id}`,
        }));
       
        setProducts(formatted);
        setLoading(false);
      })
      .catch(err => {
        console.error('Fetch failed', err);
        setLoading(false);
      });
  }, []);

  return (
    <section className="bg-white text-gray-900 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2
          className="text-4xl font-bold text-center mb-12 text-blue-700"
          data-aos="fade-down"
        >
          Our Products
        </h2>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
  {loading
    ? Array.from({ length: 4 }).map((_, idx) => (
        <div
          key={idx}
          className="animate-pulse bg-gray-200 p-4 rounded-xl shadow-inner h-full flex flex-col"
          data-aos="fade-up"
          data-aos-delay={idx * 100}
        >
          <div className="h-52 bg-gray-300 rounded mb-4"></div>
          <div className="h-5 bg-gray-300 rounded w-3/4 mx-auto mt-auto"></div>
        </div>
      ))
    : products.map((product, index) => (
        <Link
          to={product.link}
          key={product.id}
          className="group h-full"
          data-aos="fade-up"
          data-aos-delay={index * 100}
        >
          <div className="bg-white border border-gray-300 rounded-xl overflow-hidden shadow hover:shadow-blue-200 transition-shadow duration-300 flex flex-col h-full">
            {/* fixed aspect ratio for equal height images */}
            <div className="aspect-[4/3] w-full overflow-hidden">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4 text-center mt-auto">
              <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-700 transition-colors">
                {product.title}
              </h3>
            </div>
          </div>
        </Link>
      ))}
</div>
      </div>
    </section>
  );
}

export default ProductSection;
