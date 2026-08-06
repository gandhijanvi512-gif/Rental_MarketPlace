import express from "express"
import { getBookingHistory, getProfile, updateProfile } from "../controller/profilecontroller.js"
import { authMiddleware } from "../middleware/authmiddleware.js"
import profileUpload from "../middleware/profileUpload.js"

const profilerouter=express.Router()

profilerouter.get("/getprofile",authMiddleware,getProfile)
profilerouter.put("/updateprofile",authMiddleware,profileUpload.single("profileImage"),updateProfile)
profilerouter.get("/getbookinghistory",authMiddleware,getBookingHistory)

export default profilerouter