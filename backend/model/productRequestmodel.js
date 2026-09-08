import mongoose from "mongoose";

const productRequestSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            required:true
        },

        description:{
            type:String,
            required:true
        },

        category:{
            type:String,
            required:true
        },

        subcategory: {
            type:String
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
                url:String,
                public_id:String
            }
        ],

        ownerId: {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },

        status:{
            type:String,
            enum:["pending", "approved", "rejected"],
            default:"pending"
        }
    },
    {
        timestamps: true
    }
);

const ProductRequest=new mongoose.model("ProductRequest",productRequestSchema)

export default ProductRequest