import express from "express"
import { getProfile, updateProfile } from "../controller/profilecontroller.js"
import { authMiddleware } from "../middleware/authmiddleware.js"

const profilerouter=express.Router()

profilerouter.get("/getprofile",authMiddleware,getProfile)
profilerouter.put("/updateprofile",authMiddleware,updateProfile)

export default profilerouter