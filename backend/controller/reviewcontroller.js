import Product from "../model/productmodel.js";
import Booking from "../model/bookingmodel.js";
import Review from "../model/reviewmodel.js";

export const addReview=async(req,res)=>{
    try{
        const productId=req.params.id;
        const userId=req.user.id;

        const {rating,comment}=req.body;

        const booking=await Booking.findOne({
            productId,
            userId,
            status:"completed"
        })

        if(!booking){
            return res.status(400).json({
                success:false,
                message:"You can review only completed booking"
            })
        }

        const alreadyReviewed=await Review.findOne({
            bookingId:booking._id
        })

        if(alreadyReviewed){
            return res.status(400).json({
                success:false,
                message:"Review already submitted"
            })
        }

        const review=await Review.create({
            userId,
            productId,
            bookingId:booking._id,
            rating,
            comment
        })

        const reviews=await Review.find({productId})

        const total=reviews.reduce((sum,item)=>
            sum+item.rating,0
        )

        const average=total/reviews.length;

        await Product.findByIdAndUpdate(productId,{
            averageRating:average,
            totalReview:reviews.length
        })

        return res.status(200).json({
            success:true,
            message:"Review Added",
            review
        })

    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}


export const getreview=async(req,res)=>{
    try{
        const productId=req.params.id;

        const reviews=await Review.find({productId})
        .populate("userId","name profileImage")
        .sort({createdAt:-1})

        const average=reviews.length>0?
            reviews.reduce((sum,item)=>sum+item.rating,0)/reviews.length:0;

        return res.status(200).json({
            success:true,
            averageRating:average,
            totalReviews:reviews.length,
            reviews
        })

    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}