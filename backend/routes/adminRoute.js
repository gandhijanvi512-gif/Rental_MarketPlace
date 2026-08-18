import express from "express"
import { authMiddleware } from "../middleware/authmiddleware.js"
import { isAdmin } from "../middleware/adminmiddleware.js"
import { deleteUser, getAdminOverview, getAllUser, getBookingByStatus, getOwnerAnalytics, getTopProducts, updateUser } from "../controller/admincontroller.js"

const adminRouter=express.Router()

adminRouter.get("/alluser",authMiddleware,isAdmin,getAllUser)
adminRouter.patch("/user/:id",authMiddleware,isAdmin,updateUser)
adminRouter.delete("/deleteuser/:id",authMiddleware,isAdmin,deleteUser)
adminRouter.get("/getadminoverview",authMiddleware,isAdmin,getAdminOverview)
adminRouter.get("/getbookingbystatus",authMiddleware,isAdmin,getBookingByStatus)
adminRouter.get("/getowneranalytics",authMiddleware,isAdmin,getOwnerAnalytics)
adminRouter.get("/topproducts",authMiddleware,isAdmin,getTopProducts)


export default adminRouter