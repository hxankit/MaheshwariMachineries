import express from 'express'
import { isAdmin } from '../midlewares/isAdmin.middleware.js'
import { addCategory,categories,deleteCategory,editCategory, getCategoryById } from '../controllers/category.conntroller.js'
import {createProduct, editProduct, products,productDetails} from '../controllers/product.controller.js'
import { upload } from '../utils/multer.js'
const router =express.Router()

//category Route admin route
router.route("/category/create").post(isAdmin,upload.single("file"),addCategory)
router.route("/category/:id/edit").post(isAdmin,upload.single("file"),editCategory)
router.route("/category/:id/delete").delete(isAdmin,deleteCategory)

//category Route public route
router.route("/category").get(categories)
router.route("/category/:id").get(getCategoryById)


//Product Routes admin route
router.route("/create/product").post(isAdmin,upload.single("file"),createProduct)
router.route("/edit/product/:id").post(isAdmin,upload.single("file"),editProduct)

//Product Routes public route
router.route("/:id/products").get(products)
router.route("/product/:id/productDetails").get(productDetails)

export default router


//edit Product Apis completed And now Work is left on product details and some public routes 