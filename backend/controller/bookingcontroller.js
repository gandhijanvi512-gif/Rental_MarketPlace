import Booking from "../model/bookingmodel.js";
import Product from "../model/productmodel.js";

export const createBooking=async(req,res)=>{
    try{
        const {productId,startDate,endDate}=req.body;

        const existingBooking=await Booking.findOne({
            productId,
            status:{
                $in:[
                    "pending",
                    "approved",
                    "ongoing",
                    "cancelled"
                ]
            },
            startDate:{
                $lte:endDate
            },
            endDate:{
                $gte:startDate
            }
        });

        if(existingBooking){
            return res.status(400).json({
                success:false,
                message:"Product Already Booked"
            })
        }


        const product=await Product.findById(productId)

        const days=Math.ceil((
            new Date(endDate)-new Date(startDate)
        )/(1000*60*60*24))+1;

        const totalAmount=product.rentPrice*days+product.deposit

        const booking=await Booking.create({
            userId:req.user.id,
            productId,
            startDate,
            endDate,
            totalAmount,
            status:"pending",
        })

        return res.status(200).json({
            success:true,
            booking
        })
        
        
    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}



export const getBooking=async(req,res)=>{
    try{
        const {status}=req.query;

        let filter={}

        if(status){
            filter.status=status
        }

        if(req.user.role=="user"){
            filter.userId=req.user.id;
        }
        else if(req.user.role=="owner"){
            const product=await Product.find({
                ownerId:req.user.id
            })

            const productIds=product.map(product=>product._id)

            filter.productId={
                $in:productIds
            }
        }
        

        const bookings=await Booking.find(filter).populate("userId","name email")
        .populate("productId")


        return res.status(200).json({
            success:true,
            bookings
        })
    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}


//get single booking

export const getBookingById=async(req,res)=>{
    try{    
        const booking=await Booking.findById(req.params.id).populate("userId","name email")
        .populate("productId")

        if(!booking){
            return res.status(404).json({
                success:false,
                message:"Booking Not Found"
            })
        }
        return res.status(200).json({
            success:true,
            booking
        })
    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

export const updateBookingStatus=async(req,res)=>{
    try{
        const {status}=req.body;

        const booking=await Booking.findById(req.params.id)

        if(!booking){
            return res.status(404).json({
                success:false,
                message:"Booking Not Found"
            })
        }

        const currentStatus=booking.status;

        const allowedTransition={
            pending:["approved","rejected","cancelled"],
            approved:["ongoing","cancelled"],
            ongoing:["completed"],
            completed:[],
            rejected:[],
            cancelled:[]
        };

        if(!allowedTransition[currentStatus]||!allowedTransition[currentStatus].includes(status)){
            return res.status(400).json({
                success:false,
                message:"Invalid Status Transition"
            })
        }

        //user

        if(req.user.role=="user"){
            if(booking.userId.toString()!==req.user.id){
                return res.status(403).json({
                    success:false,
                    message:"Access Deniend"
                })
            }

            if(status!=="cancelled"){
                return res.status(403).json({
                    success:false,
                    message:"User can only cancel bookings"
                })
            }
        }

        //owner:

        if(req.user.role=="owner"){
            if(!["approved","rejected","ongoing","completed"].includes(status)){
                return res.status(403).json({
                    success:false,
                    message:`Owner cannot perform ${status} action`
                })
            }
        }


        
        booking.status=status;
        await booking.save()

        return res.status(200).json({
            success:true,
            message:"Status Updated Successfully!",
            booking
        })

        


    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}