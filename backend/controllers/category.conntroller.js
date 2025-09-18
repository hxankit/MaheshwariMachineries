import { Category } from "../models/category.model.js"
import fs from "fs"
import { Product } from "../models/product.model.js"

export const addCategory=async(req,res)=>{
    try {
        const {name,desc}=req.body
        const file=req.file
        console.log(file)
        const existedCategory=await Category.findOne({name})
        if(existedCategory){
            return res.status(403).json("This category already existed")
    
        }const fileurl=`uploads/${file.filename}`
        const category=await Category.create({
            name,
            desc,
            pic:fileurl,
        })
        return res.status(200).json({
            message:"Category created Succesfully",
        })
    } catch (error) {
        return res.status(500).json(`Internal server error ${error.message}`)
    }
}

export const editCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const { name, desc } = req.body;

    // Update and return the old document in one query
    const oldCategory = await Category.findByIdAndUpdate(
      categoryId,
      {
        name,
        desc,
        pic: req.file ? req.file.path : undefined, // update if new file exists
      },
      { new: false } // return old doc, not updated one
    );

    if (!oldCategory) {
      return res.status(404).json("Category not found");
    }

    if (req.file && oldCategory.pic) {
      if (fs.existsSync(oldCategory.pic)) {
        fs.unlinkSync(oldCategory.pic);
      }
    }

    return res.status(200).json({
      message: "Category updated successfully",
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
    if (!category) {
      return res.status(404).json("Category not found");
    }

    // Delete the image file if it exists
    if (category.pic && fs.existsSync(category.pic)) {
      fs.unlinkSync(category.pic);
    }

    // Delete the category from DB
    await Category.findByIdAndDelete(categoryId);

    return res.status(200).json({
      success:true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    return res.status(500).json(`Internal Server Error: ${error.message}`);
  }
};

//public controller
export const categories=async(req,res)=>{
  try {
    const cate=await Category.find()
    if(!cate[0]){
      return res.status(200).json("No Categoriy Avaible ")
    }
    return res.status(200).json({
      message:"Categories Found Succesfully",
      category:cate
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