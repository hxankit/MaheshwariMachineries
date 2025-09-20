import { useState } from "react";
import axios from "axios";

function CategoryAdd() {
  const [data, setData] = useState({
    catname: "",
    desc: "",
    file: null,
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // Loader state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", data.catname);
      formData.append("desc", data.desc);
      formData.append("file", data.file);

      await axios.post(
        `/api/categories/category/create`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      setMessage("✅ Category added successfully!");
      setData({ catname: "", desc: "", file: null });
    } catch (err) {
      setMessage(`🚫 Error: ${err.response?.data?.message || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
        <h2 className="text-2xl font-bold text-orange-400 mb-4">
          Add New Category
        </h2>

        {message && (
          <div
            className={`mb-4 p-3 rounded text-center ${
              message.includes("✅")
                ? "bg-green-900 text-green-300 border border-green-600"
                : "bg-red-900 text-red-300 border border-red-600"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            placeholder="Category Name"
            value={data.catname}
            onChange={(e) => setData({ ...data, catname: e.target.value })}
            className="w-full px-3 py-3 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />

          <input
            type="text"
            placeholder="Description"
            value={data.desc}
            onChange={(e) => setData({ ...data, desc: e.target.value })}
            className="w-full px-3 py-3 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />

          <input
            type="file"
            onChange={(e) => setData({ ...data, file: e.target.files[0] })}
            className="w-full text-gray-300 bg-gray-700 border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded shadow-md transition-all duration-200 flex justify-center items-center"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Category"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CategoryAdd;
