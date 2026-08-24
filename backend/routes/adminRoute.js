import express from "express"
// import { authMiddleware } from "../middleware/authmiddleware.js"
import { adminAuthMiddleware, isAdmin } from "../middleware/adminmiddleware.js"
import { checkAdmin, deleteUser, getAdminBookings, getAdminOverview, getAdminProducts, getAllUser, getBookingByStatus, getOwnerAnalytics, getTopProducts, updateUser } from "../controller/admincontroller.js"

const adminRouter=express.Router()

adminRouter.get("/alluser",adminAuthMiddleware,getAllUser)
adminRouter.patch("/user/:id",adminAuthMiddleware,updateUser)
adminRouter.delete("/deleteuser/:id",adminAuthMiddleware,deleteUser)
adminRouter.get("/getadminoverview",adminAuthMiddleware,getAdminOverview)
adminRouter.get("/getbookingbystatus",adminAuthMiddleware,getBookingByStatus)
adminRouter.get("/getowneranalytics",adminAuthMiddleware,getOwnerAnalytics)
adminRouter.get("/topproducts",adminAuthMiddleware,getTopProducts)
adminRouter.get("/getadminproducts",adminAuthMiddleware,getAdminProducts)
adminRouter.get("/admin/check",adminAuthMiddleware,checkAdmin)
adminRouter.get("/admin/bookings",adminAuthMiddleware,getAdminBookings)


export default adminRouter