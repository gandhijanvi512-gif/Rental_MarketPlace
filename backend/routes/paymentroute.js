import express from "express";
import { authMiddleware } from "../middleware/authmiddleware.js";
import { createOrder, paymentHistory, paymentStatus, webhook } from "../controller/paymentcontroller.js";
import { verifyPayment } from "../controller/paymentcontroller.js";
import { paymentDetails } from "../controller/paymentcontroller.js";

const paymentrouter=express.Router()

paymentrouter.post("/createorder",authMiddleware,createOrder)
paymentrouter.post("/verifypayment",authMiddleware,verifyPayment)
paymentrouter.get("/paymenthistory",authMiddleware,paymentHistory) 
paymentrouter.get("/paymentdetails",authMiddleware,paymentDetails)
paymentrouter.post("/webhook",express.raw({type:"application/json"}),webhook)
paymentrouter.get("/paymentstatus/:orderId",authMiddleware,paymentStatus)

export default paymentrouter
