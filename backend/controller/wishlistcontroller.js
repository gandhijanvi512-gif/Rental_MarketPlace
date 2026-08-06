import { populate } from "dotenv";
import Product from "../model/productmodel.js";
import Wishlist from "../model/wishlistmodel.js";

export const addToWishList=async(req,res)=>{
    try{
        const {productId}=req.params;

        const product=await Product.findById(productId)

        if(!product){
            return res.status(404).json({
                success:false,
                message:"Product Not Found"
            })
        }

        const alreadyExists=await Wishlist.findOne({
            userId:req.user.id,
            productId
        })

        if(alreadyExists){
            return res.status(400).json({
                success:false,
                message:"Product already in wishlist"
            })
        }

        const wishlist=await Wishlist.create({
            userId:req.user.id,
            productId
        })

        return res.status(200).json({
            success:true,
            message:"Product added to wishlist",
            wishlist
        })
    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}


export const removeFromWishlist=async(req,res)=>{
    try{
        const {productId}=req.params;

        const wishlist=await Wishlist.findOneAndDelete({
            userId:req.user.id,
            productId
        })

        if(!wishlist){
            return res.status(404).json({
                success:false,
                message:"Wishlist item not found"
            })
        }

        return res.status(200).json({
            success:true,
            message:"Removed from wishlist"
        })


    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}


export const getwishlist=async(req,res)=>{
    try{
        const wishlist=await Wishlist.find({
            userId: req.user.id
        })
            .populate({
                path:"productId",
                populate:{
                    path:"ownerId",
                    select:"name city state"
                }
            })
            .sort({createAt:-1})

            return res.status(200).json({
                success:true,
                wishlist
            })
    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}