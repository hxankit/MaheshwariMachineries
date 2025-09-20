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

  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // clear error on change
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Invalid email address";
    }
    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10,15}$/.test(form.phone)) {
      newErrors.phone = "Invalid phone number";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await axios.post(
        `/api/contacts/contact/create`,
        form,
        { withCredentials: true }
      );
      setSuccessMsg(
        "✅ Your request has been submitted. Our executive will contact you soon!"
      );
      setForm({ name: "", email: "", phone: "", message: "" });
      setErrors({});
    } catch (error) {
      console.error(error);
      setSuccessMsg("🚫 Something went wrong, please try again.");
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

          {successMsg && (
            <div
              className={`mb-4 p-3 rounded text-center ${
                successMsg.startsWith("✅")
                  ? "bg-green-100 text-green-700 border border-green-300"
                  : "bg-red-100 text-red-700 border border-red-300"
              }`}
            >
              {successMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <input
                type="tel"
                name="phone"
                placeholder="Your Phone Number"
                value={form.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
              )}
            </div>

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
