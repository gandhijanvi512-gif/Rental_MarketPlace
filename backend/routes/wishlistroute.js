import express from "express"
import { authMiddleware } from "../middleware/authmiddleware.js"
import { addToWishList, getwishlist, removeFromWishlist } from "../controller/wishlistcontroller.js"

const wishlistrouter=express.Router()

wishlistrouter.post("/addtowishlist/:productId",authMiddleware,addToWishList)
wishlistrouter.delete("/removefromwishlist/:productId",authMiddleware,removeFromWishlist)
wishlistrouter.get("/getwishlist",authMiddleware,getwishlist)

export default wishlistrouter