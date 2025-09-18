import { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import axios from "axios";

export default function ContactDetail() {
  const { state } = useLocation();
  const { id } = useParams(); // get from /contacts/:id route
  const navigate = useNavigate();
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load from state or API
  useEffect(() => {
    if (state) {
      setContact(state);
      setLoading(false);
    } else {
      fetchContact();
    }
  }, [state]);
  console.log(contact)
  const fetchContact = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/contacts/contact/${id}`, {
        withCredentials: true,
      });
      setContact(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this request?")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/contacts/contact/${id}/delete`, {
        withCredentials: true,
      });
      navigate("/admin/contacts");
    } catch (err) {
      console.error(err);
      alert("Failed to delete request");
    }
  };

  if (loading) return <p className="p-6 text-gray-500">Loading...</p>;
  if (!contact) return <p className="p-6 text-gray-500">No contact found.</p>;

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10 text-gray-500">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-primary mb-4">Contact Request</h1>

        <div className="space-y-4">
          <p><span className="font-semibold">Name:</span> {contact.name}</p>
          <p><span className="font-semibold">Email:</span> {contact.email}</p>
          <p><span className="font-semibold">Phone:</span> {contact.phone}</p>
          <p><span className="font-semibold">Message:</span> {contact.message}</p>
          <p><span className="font-semibold">Created At:</span> {new Date(contact.createdAt).toLocaleString()}</p>
        </div>

        {contact.product && (
          <div className="mt-6 border-t pt-4">
            <h2 className="text-xl font-semibold text-secondary mb-3">Product Details</h2>
            <p><span className="font-semibold">Product Name:</span> {contact.product.productName}</p>
            <p><span className="font-semibold">Category:</span> {contact.product.category}</p>
            <p><span className="font-semibold">Quantity:</span> {contact.product.quantity}</p>
            <p><span className="font-semibold">Notes:</span> {contact.product.notes || "N/A"}</p>
          </div>
        )}

        <div className="mt-6 flex gap-3">
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Back
          </button>
          <button
            onClick={() => handleDelete(contact._id)}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
