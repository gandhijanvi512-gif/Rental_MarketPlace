import express from "express"
import { getme, signin, signup } from "../controller/authcontroller.js"
import { authMiddleware } from "../middleware/authmiddleware.js"

const router=express.Router()

router.post("/signup",signup)
router.post("/signin",signin)
router.get("/getme",authMiddleware,getme)

export default router