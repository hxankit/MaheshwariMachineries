import express from 'express'
import { getAllProducts, searchProduct } from '../controllers/product.controller.js'
const router =express.Router()

router.route("/search").get(searchProduct)
router.route("/allproducts").get(getAllProducts)

export default router