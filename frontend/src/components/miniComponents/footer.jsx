import React from 'react';
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-14 grid gap-10 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
        {/* Company Info */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4">Maheshwari Machineries</h2>
          <p className="text-sm mb-3">
            Trusted supplier of Submersible Pumps, Hand Pumps, PVC Pipes, and other high-quality
            industrial & agricultural machinery since 2023.
          </p>
          <p className="text-sm">📞 +91-9548353466</p>
          <p className="text-sm">📧 niharikamaheshwari097@gmail.com</p>
          <p className="text-sm">📍 Nadrai,kasganj, UP</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold border-b-2 border-orange-500 inline-block mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-orange-400">About Us</a></li>
            <li><a href="#" className="hover:text-orange-400">Contact</a></li>
            <li><a href="#" className="hover:text-orange-400">Product Catalogue</a></li>
            <li><a href="#" className="hover:text-orange-400">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Products */}
        <div>
          <h3 className="text-lg font-semibold border-b-2 border-orange-500 inline-block mb-4">Products</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-orange-400">Submersible Water Pumps</a></li>
            <li><a href="#" className="hover:text-orange-400">Hand Pumps</a></li>
            <li><a href="#" className="hover:text-orange-400">PVC & GI Pipes</a></li>
            <li><a href="#" className="hover:text-orange-400">Agricultural Tools</a></li>
          </ul>

          {/* Socials */}
          <div className="flex space-x-3 mt-6">
            <a href="#" className="text-xl hover:text-orange-400 transition"><FaFacebookF /></a>
            <a href="#" className="text-xl hover:text-orange-400 transition"><FaInstagram /></a>
            <a href="#" className="text-xl hover:text-orange-400 transition"><FaLinkedinIn /></a>
            <a href="#" className="text-xl hover:text-orange-400 transition"><FaWhatsapp /></a>
          </div>
        </div>

        {/* Google Map */}
        <div>
          <h3 className="text-lg font-semibold border-b-2 border-orange-500 inline-block mb-4">Find Us</h3>
          <div className="rounded overflow-hidden border border-gray-700 shadow-lg">
            <iframe
              title="Maheshwari Machineries Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d355.2028084961492!2d78.618021!3d27.7784696!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3974e1ac8e9a8635%3A0x885534b52943a83c!2sNadrai%2C%20Uttar%20Pradesh%20207123%2C%20India!5e0!3m2!1sen!2sin!4v1723800000000"
              width="100%"
              height="200"
              allowFullScreen=""
              loading="lazy"
              className="border-0 w-full h-48"
            ></iframe>

          </div>
        </div>
      </div>

      {/* Bottom Strip */}
      <div className="bg-orange-600 text-white text-sm text-center py-4">
        © 2024 Maheshwari Machineries. All rights reserved. | Designed by <span className="font-semibold underline">Niharika Maheshwari</span>
      </div>
    </footer>
  );
};

export default Footer;
