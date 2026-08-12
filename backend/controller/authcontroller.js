import User from "../model/authmodel.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const signup=async(req,res)=>{
    try{
        const {name,email,password}=req.body;
        
        const isAlreadySignUp=await User.findOne({email})

        if(isAlreadySignUp){
            return res.status(400).json({
                success:false,
                message:"User Already Exists"
            })
        }

        const hashedPassword=await bcrypt.hash(password,10);

        const user=await User.create({
            name,
            email,
            password:hashedPassword,
            role:["user"]
        })

        return res.status(200).json({
            success:true,
            message:"User Signup Successfully!",
            user
        })
    }catch(err){
        return res.status(500).json({
            success:false, 
            message:err.message
        })
    }
}


export const signin=async(req,res)=>{
    try{
        const {email,password}=req.body

        const user=await User.findOne({email})

        if(!user){
            return res.status(400).json({
                success:false,
                message:"User Not Found!"
            })
        }

        const isMatch=await bcrypt.compare(password,user.password)

        if(!isMatch){
            return res.status(400).json({
                success:false,
                message:"Password Does Not Match"
            })
        }

        const accesstoken=jwt.sign(
            {
                id:user._id,
                role:user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn:"15m"
            }
        )

        const refreshtoken=jwt.sign(
            {
                id:user._id,
                role:user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn:"7d"
            }
        )

        res.cookie("refreshtoken",refreshtoken,{
            httpOnly:true,
            secure:false,
            sameSite:"lax",
            maxAge:7*24*60*60*1000
        })

        return res.status(200).json({
            success:true,
            message:"User login Successfully",
            accesstoken,
            user
        })
    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

export const getme=async(req,res)=>{
    try{
        const user=await User.findById(req.user.id).select("-password")

        if(!user){
            return res.status(404).json({
                success:false,
                message:"User Not Found!"
            })
        }

        return res.status(200).json({
            success:true,
            message:"User Fetched Successfully!",
            user
        })
    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

export const logout=async(req,res)=>{
    try{        
        res.clearCookie("refreshtoken",{
            httpOnly:true,
            secure:false,
            sameSite:"lax"
        })

        return res.status(200).json({
            success:false,
            message:"Logout Successful"
        })
    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}


export const becomeOwner=async(req,res)=>{
    try{

        const userId=req.user.id;

        const user=await User.findById(userId)

        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }

           // Make sure role is an array
        if (!Array.isArray(user.role)) {
            user.role = [user.role];
        }

        if(user.role.includes("owner")){
            return res.status(400).json({
                success:false,
                message:"You are already an owner"
            })
        }

        user.role.push("owner")
        await user.save()

        return res.status(200).json({
            success:true,
            message:"You are now an owner",
            user
        })
    }catch (err) {
    console.log("BECOME OWNER ERROR:", err);

    return res.status(500).json({
        success: false,
        message: err.message
    });
}
}
