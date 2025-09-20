import { Product } from "../models/product.model.js"
import path from "path";
import { existsSync, unlinkSync } from "fs";
import { title } from "process";
import cloudinary from "../config/cloudinary.js"; // your cloudinary config

export const createProduct = async (req, res) => {
  try {
    // const cateId = req.params.id
    const { title, price, desc,cateId } = req.body
    const file = req.file
    if (!title || !price) {
      return res.status(404).json("Title and Price is required")
    }
    

    const product = await Product.create({
      title,
      desc,
      image: file.path,
      price,
      category: cateId
    })
    return res.status(200).json({
      success:true,
      message: "Product Created Sucesfully",
      data: product
    })
  } catch (error) {
    return res.status(500).json(`internal server error ${error.message}`)
  }
}


export const editProduct = async (req, res) => {
  try {
    const { title, price, desc, productId } = req.body;
    const file = req.file;

    if (!title || !price) {
      return res.status(400).json({ message: "Title and Price are required" });
    }

    // Fetch product
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Delete old image from Cloudinary if a new file is uploaded
    if (file) {
      if (product.image) {
        // Extract publicId from existing Cloudinary URL
        const segments = product.image.split("/");
        const fileName = segments[segments.length - 1];
        const publicId = `products/${fileName.split(".")[0]}`; // adjust folder name if needed
        await cloudinary.uploader.destroy(publicId);
      }

      // Upload new image to Cloudinary
      const uploadedImage = await cloudinary.uploader.upload(file.path, {
        folder: "products", // optional: specify folder in Cloudinary
      });

      product.image = uploadedImage.secure_url;
    }

    // Update other fields
    product.title = title;
    product.desc = desc;
    product.price = price;

    await product.save();

    return res.status(200).json({
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: `Internal Server Error: ${error.message}` });
  }
};



export const products = async (req, res) => {
  try {
    const cateId = req.params.id
    const products = await Product.find({ category: cateId })
    if (!products[0]) {
      return res.status(404).json({
        message:"Products Not Avilable in this category"
    })
    }
    return res.status(200).json({
      message: "Products Found Succefully",
      data: products
    })
  } catch (error) {
    return res.status(500).json(`Internal Server Error ${error.message}`)
  }
}
export const productDetails = async (req, res) => {
 try {
   const productId = req.params.id
   if(!productId){
     return res.status(405).json("Product Id not found")
   }
   const product= await Product.findById(productId).populate("category")
   if(!product){
     return res.status(403).json("Product not Availble")
   }
   return res.status(200).json({
     message:"Product Details get succesfully",
     data:product
   })
 } catch (error) {
  return res.status(500).json(`Internal Server Error ${error.message}`)
 }

}
export const searchProduct=async(req,res)=>{
  const {query}=req.query
  if(!query){
    return res.status(301).json("Query item not found")
  }

  const searchedItem=await Product.find({
    $or:[
      {title:{ $regex: query, $options: "i" }},
      {desc:{ $regex: query, $options: "i" }},

    ]
  })
  if (searchedItem.length === 0) {
      return res.status(404).json({ message: "No products found" }); //Some work is left in search Api And other changes
    }

  res.status(200).json({
    message:"Product Get Succesfully",
    data:searchedItem

  })
}
export const getAllProducts=async(req,res)=>{
  try {
    const allProducts=await Product.find({})
    if(!allProducts){
      return res.status(502).json("Products Not Found")
    }
    return res.status(200).json({
      message:"All Products Fetched Succesfully",
      data:allProducts
    })
  } catch (error) {
    return res.status(200).json(`Internal Server Error ${error.message}` )
  }
}



export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    // Find the product
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Delete image from Cloudinary
    if (product.image) {
      // Extract public_id from URL
      const segments = product.image.split("/");
      const fileName = segments[segments.length - 1]; // e.g., "abc123.jpg"
      const publicId = `products/${fileName.split(".")[0]}`; // "products/abc123"

      await cloudinary.uploader.destroy(publicId);
    }

    // Delete the product from DB
    await Product.findByIdAndDelete(productId);

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: `Internal Server Error: ${error.message}` });
  }
};
