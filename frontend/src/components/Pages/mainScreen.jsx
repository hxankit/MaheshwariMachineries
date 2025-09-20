import NavBar from '../miniComponents/navabar';
import { Typewriter } from 'react-simple-typewriter';
import { FaClipboardList } from 'react-icons/fa';

import ProductSection from '../miniComponents/ourProducts';
import HotProductsAndStats from '../miniComponents/hotProducts';
import Footer from '../miniComponents/footer';
import WhyChooseUs from '../miniComponents/choose';
import PartnersCarousel from '../miniComponents/partnerCrousel';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Main() {
  const [category, setCategories] = useState([])
  useEffect(() => {
    (async () => {
      
      const res = await axios.get(`/api/categories/category`, {
        withCredentials: true,
      });
      setCategories(res.data.category || []);
    })();
  }, []);

  return (
    <>
      <NavBar />

      {/* Hero Section */}
      <div className="bg-blue-900 text-white">
        <div className="grid max-w-7xl px-4 pt-12 md:pt-20 pb-8 md:pb-12 mx-auto lg:gap-8 xl:gap-0 lg:grid-cols-12">
          {/* Left Content */}
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-3xl md:text-5xl xl:text-6xl font-extrabold leading-tight tracking-tight">
              <Typewriter
                words={['Industrial-Grade Machinery Items']}
                loop={true}
                cursor
                cursorStyle="|"
                typeSpeed={120}
                deleteSpeed={80}
                delaySpeed={2000}
              />
            </h1>

            <p className="max-w-2xl mb-6 font-light text-gray-200 text-base md:text-lg lg:text-xl">
              Supplying durable water pumps, submersible motors, and mechanical piping tools for industries and homes.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center px-5 py-3 text-base md:text-lg font-medium text-blue-900 bg-white rounded-lg shadow hover:bg-gray-200 transition"
              >
                <FaClipboardList className="mr-2" />
                Request a Quote
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="mt-8 lg:mt-0 lg:col-span-5 flex justify-center">
            <img
              src="banner.png"
              alt="machinery banner"
              className="w-full max-w-md lg:max-w-lg xl:max-w-xl h-auto object-contain"
            />
          </div>
        </div>
      </div>

      {/* Featured Categories */}
      <section className="py-10 md:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-800 mb-4 md:mb-6">
            Our Product Categories
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8 md:mb-12 text-sm md:text-base">
            Explore a wide range of machinery and tools designed to serve agriculture, construction, and industry.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {category.map((item) => (
              <Link
                key={item._id}
                to={`/${item.name}/${encodeURIComponent(
                  item._id
                )}`}
                className="p-4 md:p-6 bg-blue-50 border border-blue-100 shadow rounded-lg font-semibold text-blue-900">
                {item.name}
              </Link>
            ))}

          </div>
        </div>
      </section>

      <ProductSection />
      <HotProductsAndStats />
      <WhyChooseUs />
      <PartnersCarousel />

      {/* Testimonials */}
      <section className="py-10 md:py-16 bg-blue-50">
        <div className="max-w-6xl mx-auto px-4 md:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-800 mb-6 md:mb-8">
            Trusted by Thousands, Valued by Every Client
          </h2>
          <p className="max-w-3xl mx-auto text-gray-600 mb-10 md:mb-14 text-sm md:text-base">
            From farms to factories, construction sites to homes – our machines and equipment
            are powering success stories every day. Here’s what our clients have to say:
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
            <div className="p-6 bg-white border border-blue-100 shadow rounded-lg hover:shadow-md transition-shadow">
              <p className="text-gray-700 text-sm md:text-base italic">
                “The submersible pump we bought has been working without a single fault for over a year.
                Great performance and outstanding build quality.”
              </p>
              <h4 className="mt-4 font-semibold text-blue-700">– Rajesh Kumar, Farmer</h4>
            </div>
            <div className="p-6 bg-white border border-blue-100 shadow rounded-lg hover:shadow-md transition-shadow">
              <p className="text-gray-700 text-sm md:text-base italic">
                “The pipes we sourced were strong, durable, and handled tough site conditions with ease.
                A dependable choice for heavy-duty projects.”
              </p>
              <h4 className="mt-4 font-semibold text-blue-700">– Priya Sharma, Contractor</h4>
            </div>
            <div className="p-6 bg-white border border-blue-100 shadow rounded-lg hover:shadow-md transition-shadow">
              <p className="text-gray-700 text-sm md:text-base italic">
                “They’ve been our go-to supplier for machinery and spares. Reliable service, on-time delivery,
                and customer support that truly cares.”
              </p>
              <h4 className="mt-4 font-semibold text-blue-700">– Amit Verma, Industry Owner</h4>
            </div>
          </div>
        </div>
      </section>


      {/* Call to Action */}
      <section className="py-10 md:py-16 bg-blue-900 text-white text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Looking for Reliable Machinery?
        </h2>
        <p className="mb-6 text-gray-200 max-w-2xl mx-auto text-sm md:text-base">
          Get in touch with Maheshwari Machineries today and receive a customized quote for your needs.
        </p>
        <Link
          to="/contact"
          className="px-5 py-3 bg-white text-blue-900 rounded-lg font-semibold hover:bg-gray-200 transition"
        >
          Contact Us
        </Link>
      </section>

      <Footer />
    </>
  );
}

export default Main;
