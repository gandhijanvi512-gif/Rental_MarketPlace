import express, { Router } from "express"
import { becomeOwner, getme, logout, signin, signup } from "../controller/authcontroller.js"
import { authMiddleware } from "../middleware/authmiddleware.js"

const router=express.Router()

router.post("/signup",signup)
router.post("/signin",signin)
router.get("/getme",authMiddleware,getme)
router.post("/logout",authMiddleware,logout)
router.put("/becomeowner",authMiddleware,becomeOwner)

export default router