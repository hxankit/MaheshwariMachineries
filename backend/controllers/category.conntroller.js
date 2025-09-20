import { Category } from "../models/category.model.js"
import fs from "fs"
import { Product } from "../models/product.model.js"
import cloudinary from "../config/cloudinary.js"

export const addCategory = async (req, res) => {
  try {
    const { name, desc } = req.body
    const file = req.file
    
    const existedCategory = await Category.findOne({ name })
    if (existedCategory) {
      return res.status(403).json("This category already existed")

    }
    const category = await Category.create({
      name,
      desc,
      pic: file.path,
    })
    return res.status(200).json({
      message: "Category created Succesfully",
    })
  } catch (error) {
    return res.status(500).json(`Internal server error ${error.message}`)
  }
}



export const editCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const { name, desc } = req.body;

    // Fetch the old category first
    const oldCategory = await Category.findById(categoryId);
    if (!oldCategory) {
      return res.status(404).json("Category not found");
    }

    // If new file is uploaded, delete old image from Cloudinary
    if (req.file && oldCategory.pic) {
      // Extract public_id from oldCategory.pic
      const segments = oldCategory.pic.split("/");
      const fileName = segments[segments.length - 1]; // e.g., "abc123.jpg"
      const publicId = `categories/${fileName.split(".")[0]}`; // adjust folder if needed

      await cloudinary.uploader.destroy(publicId);
    }

    // Update category
    oldCategory.name = name;
    oldCategory.desc = desc;
    if (req.file) oldCategory.pic = req.file.path; // assuming you store Cloudinary URL in pic

    await oldCategory.save();

    return res.status(200).json({
      message: "Category updated successfully",
      data: oldCategory,
    });
  } catch (error) {
    return res.status(500).json(`Internal Server Error: ${error.message}`);
  }
};




export const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;

    // Find the category first
    const category = await Category.findById(categoryId);
    if (!category) return res.status(404).json("Category not found");

    // Delete category image from Cloudinary
    if (category.pic) {
      const segments = category.pic.split("/");
      const fileName = segments[segments.length - 1]; // e.g., "abc123.jpg"
      const publicId = `categories/${fileName.split(".")[0]}`; // adjust folder if needed
      await cloudinary.uploader.destroy(publicId);
    }

    // Find all products linked to this category
    const products = await Product.find({ category: categoryId });

    // Delete each product image from Cloudinary
    for (const product of products) {
      if (product.image) { // assuming product.image stores Cloudinary URL
        const segments = product.image.split("/");
        const fileName = segments[segments.length - 1];
        const publicId = `products/${fileName.split(".")[0]}`; // adjust folder if needed
        await cloudinary.uploader.destroy(publicId);
      }
    }

    // Delete all products of this category
    await Product.deleteMany({ category: categoryId });

    // Delete the category itself
    await Category.findByIdAndDelete(categoryId);

    return res.status(200).json({
      success: true,
      message: "Category and all associated products deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json(`Internal Server Error: ${error.message}`);
  }
};


//public controller
export const categories = async (req, res) => {
  try {
    const cate = await Category.find()
    if (!cate[0]) {
      return res.status(200).json("No Categoriy Avaible ")
    }
    return res.status(200).json({
      message: "Categories Found Succesfully",
      category: cate
    })
  } catch (error) {
    return res.status(503).json(`Internal Server error ${error.message}`)
  }
}
export const getCategoryById = async (req, res) => {
  try {
    const categoryId = req.params.id;

    // Find category by ID
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Optional: fetch products under this category
    const products = await Product.find({ category: categoryId });

    return res.status(200).json({
      message: "Category found successfully",
      category,
      products,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: `Internal server error: ${error.message}` });
  }
};