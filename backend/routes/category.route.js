import express from 'express'
import { isAdmin } from '../midlewares/isAdmin.middleware.js'
import { addCate } from '../controllers/category.conntroller.js'
const router =express.Router()

router.route("/addcate").post(isAdmin,addCate)

export default router