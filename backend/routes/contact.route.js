import express from 'express'
import { createContact, deleteContact, getContactById, getContacts } from '../controllers/contact.controller.js'
import { isAdmin } from '../midlewares/isAdmin.middleware.js'

const router =express.Router()


router.route("/contact/create").post(createContact)
router.route("/contact/all").get(getContacts)
router.route("/contact/:id").get(getContactById)
router.route("/contact/:id/delete").delete(deleteContact)

export default router