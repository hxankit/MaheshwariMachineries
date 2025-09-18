import { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

function AddProduct() {
    const { state } = useLocation()
    const id = state
    console.log(id)
    const [data, setData] = useState({
        title: "",
        price: "",
        desc: "",
        file: null,
    });
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(data)

        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/categories/create/product`, { ...data, cateId: id }, {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true, // <-- put it here

            });
            if (res.data.success) {
                alert(res.data.message)
                setMessage("✅ Product added successfully!");
                setData({
                    title: "",                              
                    price: "",
                    desc: "",
                    file: null,
                })

            }
        } catch (err) {
            setMessage(`🚫 Error: ${err.message}`);
        }
    };

    return (
        <div className="p-6 bg-gray-900 min-h-screen text-white">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
                <h2 className="text-2xl font-bold text-orange-400 mb-4">Add New Product</h2>

                {message && (
                    <div
                        className={`mb-4 p-3 rounded text-center ${message.includes("✅")
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
                        placeholder="Product Title"
                        value={data.title}
                        onChange={(e) => setData({ ...data, title: e.target.value })}
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
                        type="number"
                        placeholder="Price"
                        value={data.price}
                        onChange={(e) => setData({ ...data, price: e.target.value })}
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
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded shadow-md transition-all duration-200"
                    >
                        Add Product
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddProduct;
