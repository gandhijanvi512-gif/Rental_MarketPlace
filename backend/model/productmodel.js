import mongoose from "mongoose";

const productSchema=new mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
            trim:true
        },
        description:{
            type:String,
            required:true
        },
        category:{
            type:String,
            required:true
        },
        subcategory:{
            type:String,
            required:true
        },
        rentPrice:{
            type:Number,
            required:true
        },
        deposit:{
            type:Number,
            required:true
        },
        images:[
            {
                // type:String
                url:{
                    type:String,
                    required:true
                },
                public_id:{
                    type:String,
                    required:true
                }
            }
        ],
        ownerId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        averageRating:{
            type:Number,
            default:0
        },
        totalReview:{
            type:Number,
            default:0
        },
    },
    {
        timestamps:true
    }
)

const Product=new mongoose.model("Product",productSchema)

export default Product