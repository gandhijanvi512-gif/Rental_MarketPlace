import express from "express";
import { authMiddleware } from "../middleware/authmiddleware.js";
import { checkProductAvailability, createBooking, getBooking, getBookingById, getMyRentals, updateBookingStatus } from "../controller/bookingcontroller.js";
import { authorizeRole } from "../middleware/rolemiddleware.js"


const bookingrouter=express.Router()

bookingrouter.post("/createbooking",authMiddleware,createBooking)
bookingrouter.get("/getBooking",authMiddleware,getBooking)
bookingrouter.get("/getbookingbyid/:id",authMiddleware,getBookingById)
bookingrouter.patch("/updatestatus/:id/status",authMiddleware,authorizeRole("user","owner","admin"),updateBookingStatus)
bookingrouter.get("/myrental",authMiddleware,getMyRentals)
bookingrouter.get("/checkavailable/:productId",authMiddleware,checkProductAvailability)
export default bookingrouter