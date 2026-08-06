import User from "../model/authmodel.js";
import Booking from "../model/bookingmodel.js"

export const getProfile=async(req,res)=>{
    try{
        const user=await User.findById(req.user.id).select("-password")

        if(!user){
            return res.status(404).json({
                success:false,
                message:"User Not Found"
            })
        }

        const bookings=await Booking.find({userId:req.user.id}).populate("productId").sort({createdAt:-1})

        // const activeRentals=bookings.filter(booking=>booking.status==="ongoing")

        const today=new Date();
        today.setHours(0,0,0,0)


        const activeRentals=bookings.filter((booking)=>{
            const start=new Date(booking.startDate)
            const end=new Date(booking.endDate)

            start.setHours(0,0,0,0)
            end.setHours(0,0,0,0)

            return(
                booking.status!=="cancelled" && 
                booking.status!=="completed" && 
                start<=today &&
                end>=today
            )
        })

        const upcomingRentals=bookings.filter((booking)=>{
            const start=new Date(booking.startDate)
            start.setHours(0,0,0,0)

            return(
                booking.status!=="cancelled" && start>today
            )

        })

        const completedRentals=bookings.filter(booking=>booking.status==="completed")

        const totalSpent=bookings.reduce((total,booking)=>total+booking.totalAmount,0)

        const rentalHistory=bookings.filter((booking)=>{
            const end=new Date(booking.endDate);

            end.setHours(0,0,0,0)

            return(
                booking.status!="cancelled" && end<today
            )
        })

        return res.status(200).json({
            success:true,
            user,
            stats:{
                activeRentals:activeRentals.length,
                completedRentals:completedRentals.length,
                upcomingRentals:upcomingRentals.length,     
                totalSpent
            },
            activeRentals,
            rentalHistory
        })
    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

export const updateProfile=async(req,res)=>{
    try{
        const {name,phone,address,city,state,pincode}=req.body;

        const updateData={name,phone,address,city,state,pincode};

        if(req.file){
            updateData.profileImage=`/uploads/profile/${req.file.filename}`
        }

        const user=await User.findByIdAndUpdate(
            req.user.id,
            updateData,
            {
                new:true,
                runValidators:true
            }
        ).select("-password")

        return res.status(200).json({
            success:true,
            message:"Profile Updated Successfully!",
            user
        })
    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

export const getBookingHistory = async (req, res) => {
    try {

        const today = new Date();

        // Approved -> Ongoing
        await Booking.updateMany(
            {
                status: "approved",
                startDate: { $lte: today },
                endDate: { $gte: today }
            },
            {
                $set: {
                    status: "ongoing"
                }
            }
        );

        // Approved/Ongoing -> Completed
        await Booking.updateMany(
            {
                status: { $in: ["approved", "ongoing"] },
                endDate: { $lt: today }
            },
            {
                $set: {
                    status: "completed"
                }
            }
        );

        const bookings = await Booking.find({
            userId: req.user.id,
            status: "completed"
        })
        .populate("productId")
        .sort({ endDate: -1 });

        return res.status(200).json({
            success: true,
            bookings
        });

    } catch (err) {
        console.log(err);

        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};