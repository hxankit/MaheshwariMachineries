import { useState } from 'react';
import NavBar from './navabar';
import { Typewriter } from 'react-simple-typewriter';
import { FaTools, FaClipboardList } from 'react-icons/fa';

import ProductSection from './ourProducts';
import HotProductsAndStats from './hotProducts';
import Footer from './miniComponents/footer';
import WhyChooseUs from './choose';
import PartnersCarousel from './partnerCrousel';

function Main() {
  return (
    <>
      {/* <NavBar /> */}
      <div className="bg-white min-h-screen text-gray-900">
        <div className="grid max-w-screen-xl px-4 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 lg:pt-28">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl text-gray-800">
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

            <p className="max-w-2xl mb-6 font-light text-gray-600 lg:mb-8 md:text-lg lg:text-xl">
              Supplying durable water pumps, submersible motors, and mechanical piping tools for industries and homes.
            </p>

            <div className="space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
              <a
                href="#"
                className="inline-flex items-center justify-center w-full px-5 py-3 mb-2 mr-2 text-sm font-medium text-white bg-blue-600 rounded-lg sm:w-auto hover:bg-blue-700 transition"
              >
                <FaTools className="mr-2" />
                View Our Products
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center w-full px-5 py-3 mb-2 mr-2 text-sm font-medium text-blue-600 bg-gray-200 rounded-lg sm:w-auto hover:bg-gray-300 transition"
              >
                <FaClipboardList className="mr-2" />
                Request a Quote
              </a>
            </div>
          </div>

          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <img src="banner.png" alt="machinery banner" />
          </div>
        </div>
      </div>

      <ProductSection />
      <HotProductsAndStats />
      <WhyChooseUs />
      {/* <PartnersCarousel /> */}
      <Footer />
    </>
  );
}

export default Main;
