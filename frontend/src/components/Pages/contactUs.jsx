import { useState } from "react";
import axios from "axios";
import NavBar from "../miniComponents/navabar";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(form);
      await axios.post(`${import.meta.env.VITE_API_URL}/contacts/contact/create`, form,{withCredentials:true});
      alert("Your request has been submitted. Our executive will contact you soon!");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error(error);
      alert("Something went wrong, please try again.");
    }
  };

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-white text-gray-900 flex items-center justify-center px-6 py-12">
        <div className="bg-white border border-gray-200 p-8 rounded-lg shadow-lg w-full max-w-lg">
          <h2 className="text-3xl font-bold text-center text-blue-700 mb-2">
            Contact Us
          </h2>
          <p className="text-gray-600 text-center mb-6 text-sm">
            Fill in your details and our executive will reach out to you soon.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <input
              type="tel"
              name="phone"
              placeholder="Your Phone Number"
              value={form.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <textarea
              name="message"
              placeholder="Write your query here..."
              value={form.message}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 h-28"
            ></textarea>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded font-semibold hover:bg-blue-700 transition"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
