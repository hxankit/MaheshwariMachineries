import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ContactList() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const naviagte=useNavigate()

  // Fetch all contacts
  const fetchContacts = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/contacts/contact/all`, {
        withCredentials: true,
      });
      setContacts(res.data.data || []);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch contacts");
    } finally {
      setLoading(false);
    }
  };

  // Delete a contact by ID
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this request?")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/contacts/contact/${id}/delete`, {
        withCredentials: true,
      });
      setContacts(contacts.filter((c) => c._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete request");
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#0d3b66]">
          📩 Contact Requests
        </h1>
        <span className="px-4 py-1 bg-[#f4a261] text-white rounded-full text-sm shadow">
          {contacts.length} Requests
        </span>
      </div>

      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : contacts.length === 0 ? (
        <p className="text-gray-600">No requests found.</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg border border-gray-200">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#0d3b66] text-white text-left">
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Message</th>
                <th className="p-3">Date</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((c, i) => (
                <tr
                  key={c._id}
                  className={`border-b ${
                    i % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-[#f1f5f9] transition`}
                >
                  <td className="p-3 font-medium text-gray-900">{c.name}</td>
                  <td className="p-3 text-gray-700">{c.email}</td>
                  <td className="p-3 text-gray-700">{c.phone}</td>
                  <td className="p-3 text-gray-600 truncate max-w-sm">
                    {c.message}
                  </td>
                  <td className="p-3 text-sm text-gray-500">
                    {new Date(c.createdAt).toLocaleString()}
                  </td>
                  <td className="p-3 space-x-2">
                    <button
                      onClick={() => naviagte("Details",{state:c})}
                      className="bg-[#2a9d8f] text-white px-3 py-1 rounded-md shadow hover:bg-[#21867a] transition"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleDelete(c._id)}
                      className="bg-[#e76f51] text-white px-3 py-1 rounded-md shadow hover:bg-[#c2543b] transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
