import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      match: [/^[0-9]{7,15}$/, "Please enter a valid phone number"],
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
      maxlength: 1000,
    },

    // ✅ Optional Product Details
    product: {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: false,
      },
      productName: {
        type: String,
        trim: true,
        required: false,
      },
      category: {
        type: String,
        trim: true,
        required: false,
      },
      quantity: {
        type: Number,
        required: false,
        min: 1,
      },
      notes: {
        type: String,
        trim: true,
        maxlength: 500,
        required: false,
      },
    },
  },
  { timestamps: true }
);

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;
