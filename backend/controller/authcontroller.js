import User from "../model/authmodel.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import mongoose from "mongoose";

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

        console.log("DATABASE:", mongoose.connection.name);

        const user=await User.create({
            name,
            email,
            password:hashedPassword,
            role:["user"]
        })

        

        console.log("SIGNUP EMAIL:", email);
        console.log("DATABASE NAME:", mongoose.connection.name);
        console.log("USER SAVED:", user._id);

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
            secure:true,
            sameSite:"none",
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


export const adminsignin=async(req,res)=>{
    try{
        const {email,password}=req.body

        const admin=await User.findOne({email})

        if(!admin){
            return res.status(404).json({
                success:false,
                message:"Admin Not Found"
            })
        }

        if(!admin.role?.includes("admin")){
            return res.status(403).json({
                success:false,
                message:"You are not authorized as an admin"
            })
        }

        const isMatch=await bcrypt.compare(
            password,
            admin.password
        )

        if(!isMatch){
            return res.status(401).json({
                success:false,
                message:"Invalid email or password"
            })
        }


        // create sep admin token

        const adminrefreshtoken=jwt.sign(
            {
                id:admin._id,
                role:"admin"
            },
            process.env.JWT_SECRET,
            {
                expiresIn:"1d"
            }
        )

        res.cookie("adminrefreshtoken", adminrefreshtoken, {
            httpOnly: true,
            secure: false,
            sameSite: "lax"
        });

        return res.status(200).json({
            success: true,
            message: "Admin login successful",
            admin: {
                _id: admin._id,
                name: admin.name,
                email: admin.email,
                role: admin.role
            }
        });

    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}


export const adminLogout=async(req,res)=>{
    try{
        res.clearCookie("adminrefreshtoken",{
            httpOnly:true,
            secure:false,
            sameSite:"lax"
        })

        return res.status(200).json({
            success:true,
            message:"Admin Logout Successfully"
        })
    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}