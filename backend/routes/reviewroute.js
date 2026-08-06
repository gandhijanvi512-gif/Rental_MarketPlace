import express from "express"
import { addReview, getreview } from "../controller/reviewcontroller.js"
import { authMiddleware } from "../middleware/authmiddleware.js"

const reviewrouter=express.Router()

reviewrouter.post("/addreview/:id",authMiddleware,addReview)
reviewrouter.get("/getreview/:id",authMiddleware,getreview)

export default reviewrouter