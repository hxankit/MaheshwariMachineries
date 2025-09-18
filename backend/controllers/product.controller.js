import { Product } from "../models/product.model.js"
import path from "path";
import { existsSync, unlinkSync } from "fs";
import { title } from "process";

export const createProduct = async (req, res) => {
  try {
    // const cateId = req.params.id
    const { title, price, desc,cateId } = req.body
    console.log(req.body)
    const file = req.file
    if (!title || !price) {
      return res.status(404).json("Title and Price is required")
    }
    const fileuri = `uploads/${file.filename}`

    const product = await Product.create({
      title,
      desc,
      image: fileuri,
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
    const productId = req.params.id;
    const { title, price, desc } = req.body;
    const file = req.file;

    if (!title || !price) {
      return res.status(400).json({ message: "Title and Price are required" });
    }

    // Fetch product first (1 DB call)
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // If new image is uploaded, delete the old one
    if (file) {
      if (product.image) {
        const oldImagePath = path.join("uploads", path.basename(product.image)); // only file name
        if (existsSync(oldImagePath)) {
          unlinkSync(oldImagePath);
          console.log("Old image deleted:", oldImagePath);
        }
      }
      product.image = `uploads/${file.filename}`;
    }

    // Update other fields
    product.title = title;
    product.desc = desc;
    product.price = price;

    // Save updated product (still 1 DB call total, because .save() only updates)
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
  console.log(query)
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