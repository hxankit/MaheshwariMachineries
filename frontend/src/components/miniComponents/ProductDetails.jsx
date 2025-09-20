import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "./navabar";

function ProductDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    quantity: 1,
    notes: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    axios
      .get(`/api/categories/product/${id}/productDetails`)
      .then((res) => {
        setProduct(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Client-side validation
  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10,15}$/.test(formData.phone)) {
      newErrors.phone = "Phone number should be 10-15 digits";
    }

    if (formData.quantity < 1) newErrors.quantity = "Quantity must be at least 1";

    return newErrors;
  };

  const handleSubmit = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
      product: {
        productId: product._id,
        productName: product.title,
        category: product.category.name,
        quantity: formData.quantity,
        notes: formData.notes,
      },
    };

    try {
      const { data } = await axios.post(
        `/api/contacts/contact/create`,
        payload
      );

      if (data.success) {
        alert("✅ Inquiry submitted successfully");
        setShowModal(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
          quantity: 1,
          notes: "",
        });
        setErrors({});
      } else {
        alert("❌ Failed to submit inquiry");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Error submitting inquiry");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <p className="text-lg text-gray-700 animate-pulse">Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <p className="text-lg text-red-500">❌ Product not found.</p>
      </div>
    );
  }

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-3 sm:p-6">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-4 inline-flex items-center px-3 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-xs sm:text-sm font-medium text-gray-700 transition"
        >
          ← Back
        </button>

        {/* Product Card */}
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300">
          <div className="w-full flex items-center justify-center bg-gray-50 p-4">
            <img
              src={product.image}
              alt={product.title}
              className="w-48 h-48 sm:w-72 sm:h-72 object-contain rounded-lg shadow-sm"
            />
          </div>
          <div className="p-4 sm:p-6">
            <h1 className="text-xl sm:text-3xl font-bold text-gray-800 mb-2 text-center sm:text-left">
              {product.title}
            </h1>
            <p className="text-lg sm:text-2xl text-orange-600 font-semibold mb-3 text-center sm:text-left">
              ₹{product.price}
            </p>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-5 text-center sm:text-left">
              {product.desc}
            </p>
          </div>
        </div>

        {/* Sticky CTA */}
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-inner border-t border-gray-200 flex gap-3 p-3 sm:static sm:mt-6">
          <button
            onClick={() => setShowModal(true)}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition text-sm sm:text-base shadow-md"
          >
            📞 Enquire
          </button>
        </div>

        {/* Enquiry Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-2xl w-11/12 max-w-md p-6 relative shadow-xl border border-gray-200">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 font-bold text-lg"
              >
                ✕
              </button>
              <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
                Enquire about {product.title}
              </h2>

              <div className="space-y-3">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                />
                {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}

                <textarea
                  name="message"
                  placeholder="Message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none resize-none"
                  rows={3}
                />

                <input
                  type="number"
                  name="quantity"
                  placeholder="Quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  min={1}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                />
                {errors.quantity && <p className="text-red-500 text-sm">{errors.quantity}</p>}

                <textarea
                  name="notes"
                  placeholder="Notes / Special Instructions"
                  value={formData.notes}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none resize-none"
                  rows={2}
                />
              </div>

              <button
                onClick={handleSubmit}
                className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold shadow-md transition"
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ProductDetailsPage;
