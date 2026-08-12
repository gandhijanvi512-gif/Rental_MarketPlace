import mongoose from "mongoose";

export const bookingSchema=new mongoose.Schema(
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
            required:true
        },
        endDate:{
            type:Date,
            required:true
        },
        rentAmount:{
            type:Number,
            required:true
        },
        depositAmount:{
            type:Number,
            required:true
        },
        gstRate:{
            type:Number,
            default:0
        },
        gstAmount:{
            type:Number,
            default:0
        },
        commissionRate: {
            type: Number,
            default: 0
        },
        commissionAmount: {
            type: Number,
            default: 0
        },
        ownerEarning:{
            type:Number,
            default:0
        },
        adminEarning:{
            type:Number,
            default:0
        },
        totalAmount:{
            type:Number,
            required:true
        },
        status:{
            type:String,
            enum:[
                "pending",
                "approved",
                "ongoing",
                "completed",
                "cancelled"
            ],
            default:"pending"
        }
    },
    {
        timestamps:true
    }
)

const Booking=new mongoose.model("Booking",bookingSchema)

export default Booking