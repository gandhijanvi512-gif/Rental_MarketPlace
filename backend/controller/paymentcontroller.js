import Payment from "../model/paymentmodel.js";
import Booking from "../model/bookingmodel.js";
import razorpay from "../config/razorpay.js";
import crypto from "crypto";
import { log } from "console";

export const createOrder=async(req,res)=>{
    try{
        const {bookingId}=req.body;

        const booking=await Booking.findById(bookingId);

        if(!booking){
            return res.status(404).json({
                success:false,
                message:"Booking Not Found"
            })
        }

        const options={
            amount:booking.totalAmount*100,
            currency:"INR",
            receipt:`booking_${booking._id}`
        }

        const order=await razorpay.orders.create(options);

        const payment=await Payment.create({
            userId:req.user.id,
            bookingId:booking._id,
            razorpayOrderId:order.id,
            amount:booking.totalAmount,
            currency:order.currency,
            paymentStatus:"CREATED"
        })

        return res.status(200).json({
            success:true,
            order,
            payment
        })
    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

export const verifyPayment=async(req,res)=>{
    try{
        const {razorpay_order_id,razorpay_payment_id,razorpay_signature}=req.body;

        const generatedSignature=crypto.createHmac(
            "sha256",process.env.RAZORPAY_SECRET
        )
        .update(
            razorpay_order_id + "|" + razorpay_payment_id
        )
        .digest("hex");


        if(generatedSignature!==razorpay_signature){

            const payment=await Payment.findOne({
                razorpayOrderId: razorpay_order_id
            })

            if(payment){
                payment.paymentStatus = "FAILED";
                await payment.save();
            }

            return res.status(400).json({
                success: false,
                message: "Payment Verification Failed"
            });
        }

        const payment = await Payment.findOne({
            razorpayOrderId: razorpay_order_id
        });

        if (!payment) {
            return res.status(404).json({
                success: false,
                message: "Payment Not Found"
            });
        }


        if(payment.paymentStatus!=="PAID"){
            payment.paymentStatus="VERIFYING"
        }

        payment.razorpayPaymentId=razorpay_payment_id
        payment.razorpaySignature = razorpay_signature;
        
        await payment.save();

        // const booking = await Booking.findById(payment.bookingId).populate("productId");
        // console.log("Booking after populate:", booking);

        const booking = await Booking.findById(payment.bookingId)
        .populate({
            path: "productId",
            populate: {
                path: "ownerId",
                select: "name city state email phone profileImage"
            }
        });

        console.log("🔥 FINAL BOOKING:", JSON.stringify(booking, null, 2));
console.log("🔥 OWNER:", booking?.productId?.ownerId);


        return res.status(200).json({
            success:true,
            message:"Payment Verified Successfully",
            booking,
            paymentId: payment._id
        })

    }catch(err){
        console.log(err)
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

export const paymentHistory=async(req,res)=>{
    try{
        const payment=await Payment.find({userId:req.user.id}).populate("bookingId")

        return res.status(200).json({
            success:true,
            payment
        })
    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

export const paymentDetails=async(req,res)=>{
    try{
        const payment=await Payment.findOne({bookingId:req.params.bookingId}).populate("bookingId")

        if(!payment){
            return res.status(404).json({
                success:false,
                message:"Payment Not Found!"
            })
        }

        return res.status(200).json({
            success:true,
            payment
        })
    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message

        })
    }
}

export const webhook=async(req,res)=>{
    try{
        console.log("API called")
        const signature=req.headers["x-razorpay-signature"]

        const expectedSignature=crypto
            .createHmac("sha256",process.env.RAZORPAY_WEBHOOK_SECRET)
            .update(req.body)
            .digest("hex")

        if(signature!==expectedSignature){
            return res.status(400).json({
                success:false,
                message:"Invalid Webhook Signature"
            })
        }

        const body=JSON.parse(req.body.toString())

        const event=body.event

        if(event==="payment.captured"){
            console.log("Payment Captured");


            const razorpayPayment=body.payload.payment.entity

            const paymentRecord=await Payment.findOne({
                razorpayOrderId: razorpayPayment.order_id
            })


            if(!paymentRecord){
                return res.status(404).json({
                    success:false,
                    message:"Payment Record Not Found"
                })
            }

            paymentRecord.paymentStatus="PAID"
            paymentRecord.razorpayPaymentId = razorpayPayment.id;

            await paymentRecord.save()

            await Booking.findByIdAndUpdate(
                paymentRecord.bookingId,
                {
                    paymentStatus:"paid",
                    status:"approved"
                } 
            )

             console.log("Payment updated successfully")
        }

        // console.log(" Signature Verified");

        return res.status(200).json({
            success:true,
            message:"Webhook Verified"
        })
    }catch(err){
        console.log(err);

        return res.status(500).json({
            success:false,
            message:err.message
        })
        
    }
}


export const paymentStatus = async (req, res) => {
    try {
        const payment = await Payment.findOne({
            razorpayOrderId: req.params.orderId
        });

        if (!payment) {
            return res.status(404).json({
                success: false,
                message: "Payment not found"
            });
        }

        return res.status(200).json({
            success: true,
            status: payment.paymentStatus
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};
