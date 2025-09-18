import { useEffect, useRef, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import { FaProjectDiagram, FaSmile, FaQuestionCircle, FaCoffee } from 'react-icons/fa';
import { Boxes } from 'lucide-react';

function HotProductsAndStats() {
  const [hotProducts, setHotProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://dummyjson.com/products?limit=4');
      const data = await res.json();
      setHotProducts(data.products);
    } catch (err) {
      console.error('API fetch failed:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    AOS.init({ duration: 800, once: false });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fetchData();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <div className="bg-white text-gray-900" ref={sectionRef}>
      {/* Hot Product List */}
      {/* <section className="py-16 px-4">
        <h2
          className="text-center text-4xl font-bold mb-12 text-blue-700"
          data-aos="fade-down"
        >
          Hot Product List
        </h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-gray-200 rounded-lg p-4 shadow-md animate-pulse h-64 flex flex-col justify-center items-center"
                >
                  <div className="w-24 h-24 bg-gray-300 rounded-full mb-4"></div>
                  <div className="w-3/4 h-4 bg-gray-300 rounded"></div>
                </div>
              ))
            : hotProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex flex-col items-center text-center bg-white border border-gray-200 rounded-lg p-4 shadow hover:shadow-blue-200 transition-all"
                  data-aos="zoom-in-up"
                >
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="rounded-full w-32 h-32 object-cover mb-4 border-4 border-blue-500 hover:scale-105 transition-transform duration-300"
                  />
                  <h3 className="text-lg font-semibold text-gray-800">{product.title}</h3>
                </div>
              ))}
        </div>
      </section> */}

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-blue-100 via-white to-blue-100 py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <StatCard icon={<FaProjectDiagram />} number="34444" label="Customers" aosType="fade-up" />
          <StatCard icon={<FaSmile />} number="45642" label="Happy Clients" aosType="zoom-in" />
          <StatCard icon={<FaQuestionCircle />} number="356" label="Questions Answered" aosType="flip-left" />
          <StatCard icon={<Boxes />} number="2000" label="Ordered completed" aosType="slide-up" />
        </div>
      </section>
    </div>
  );
}

function StatCard({ icon, number, label, aosType }) {
  return (
    <div className="flex flex-col items-center" data-aos={aosType}>
      <div className="text-blue-500 text-4xl mb-2">{icon}</div>
      <div className="text-4xl font-bold text-gray-800">{number}</div>
      <div className="text-sm text-gray-500 mt-1">{label}</div>
    </div>
  );
}

export default HotProductsAndStats;
