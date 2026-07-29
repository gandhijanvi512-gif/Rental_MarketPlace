import mongoose from "mongoose"

const paymentSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    bookingId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Booking",
        required:true
    },
    razorpayOrderId:{
        type:String,
        required:true
    },
    razorpayPaymentId:{
        type:String,
    },
    amount:{
        type:Number,
        required:true
    },
    paymentStatus:{
        type:String,
        enum:["CREATED", "VERIFYING", "PAID", "FAILED"],
        default:"CREATED"
    },
    razorpaySignature:{
        type:String,
    },
    currency:{
        type:String,
        default: "INR"
    },
},
{
    timestamps:true
})

const Payment=new mongoose.model("Payment",paymentSchema)

export default Payment