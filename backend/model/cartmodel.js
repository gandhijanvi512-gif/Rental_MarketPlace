import mongoose from "mongoose";
import Product from "./productmodel.js";

export const cartSchema=new mongoose.Schema(
    {
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        productId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product",
            required:true
        },
        startDate:{
            type:Date,
            // required:true
        },
        endDate:{
            type:Date,
            // required:true
        }
    },
    {
        timestamps:true
    }
)

const Cart=new mongoose.model("Cart",cartSchema)

export default Cart