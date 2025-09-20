import express from 'express'
import { deleteProduct, editProduct, getAllProducts, productDetails, searchProduct } from '../controllers/product.controller.js'
const router =express.Router()

router.route("/search").get(searchProduct)
router.route("/allproducts").get(getAllProducts)
router.route("/product/:id").get(productDetails)
router.route("/product/edit").put(editProduct)
router.route("/product/:id/delete").delete(deleteProduct)


export default router
