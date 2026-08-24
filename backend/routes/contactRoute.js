import express from "express"
import { createContact, deleteContact, getAllContacts, getContactById, updateContactStatus } from "../controller/contactcontroller.js"
import { authMiddleware } from "../middleware/authmiddleware.js";
import { authorizeRole } from "../middleware/rolemiddleware.js";
import { adminAuthMiddleware } from "../middleware/adminmiddleware.js";



const contactRouter=express.Router()

contactRouter.post("/admin/contact",authMiddleware,createContact)
contactRouter.get("/admin/getallcontacts",adminAuthMiddleware,getAllContacts)
contactRouter.patch("/admin/updatecontactstatus/:id/status",adminAuthMiddleware,updateContactStatus)
contactRouter.delete("/admin/deletecontact/:id",adminAuthMiddleware,deleteContact)
contactRouter.get("/admin/getcontact/:id",adminAuthMiddleware,getContactById)


export default contactRouter