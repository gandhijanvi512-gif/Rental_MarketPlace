import express from "express"
import { authMiddleware } from "../middleware/authmiddleware.js"
import { getOwnerBookingHistory, getOwnerDashboard, getOwnerEarnings, getOwnerProducts } from "../controller/ownercontroller.js"
import { authorizeRole } from "../middleware/rolemiddleware.js"
import { getOwnerActiveRentals } from "../controller/ownercontroller.js"
import { getBookingHistory } from "../controller/profilecontroller.js"

const ownerRouter=express.Router()

ownerRouter.get("/ownerdashboard",authMiddleware,authorizeRole("owner"),getOwnerDashboard)
ownerRouter.get("/activerentals",authMiddleware,authorizeRole("owner"),getOwnerActiveRentals)
ownerRouter.get("/bookinghistory",authMiddleware,authorizeRole("owner"),getOwnerBookingHistory)
ownerRouter.get("/getownerearning",authMiddleware,authorizeRole("owner"),getOwnerEarnings)
ownerRouter.get("/owner/:ownerId/products",getOwnerProducts)

export default ownerRouter