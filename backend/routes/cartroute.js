import express from "express";
import { addToCart, getCart, removeFromCart } from "../controller/cartcontroller.js";
import { authMiddleware } from "../middleware/authmiddleware.js";

const cartrouter=express.Router()

cartrouter.post("/addtocart",authMiddleware,addToCart)
cartrouter.delete("/removefromcart/:id",authMiddleware,removeFromCart)
cartrouter.get("/getCart",authMiddleware,getCart)

export default cartrouter