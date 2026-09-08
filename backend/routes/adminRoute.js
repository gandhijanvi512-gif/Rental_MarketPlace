import express from "express"
// import { authMiddleware } from "../middleware/authmiddleware.js"
import { adminAuthMiddleware, isAdmin } from "../middleware/adminmiddleware.js"
import { checkAdmin, deleteUser, getAdminBookings, getAdminOverview, getAdminProducts, getAllUser, getBookingByStatus, getOwnerAnalytics, getPendingProduct, getTopProducts, updateUser } from "../controller/admincontroller.js"
import { getProductRequest,approveProductRequest, rejectProductRequest } from "../controller/productRequestcontroller.js"

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
adminRouter.get("/admin/products/pending",adminAuthMiddleware,getPendingProduct)
adminRouter.get("/admin/productrequest",adminAuthMiddleware,getProductRequest)
adminRouter.patch("/admin/approverequest/:id",adminAuthMiddleware,approveProductRequest)
adminRouter.patch("/admin/rejectrequest/:id",adminAuthMiddleware,rejectProductRequest)

export default adminRouter