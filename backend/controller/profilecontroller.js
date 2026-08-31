import User from "../model/authmodel.js";
import Booking from "../model/bookingmodel.js"
import uploadToCloudinary from "../utils/uploadToCloudinary.js";

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

        const now=new Date();
        
        const today=new Date(
            now.toLocaleString("en-US",{
                timeZone:"Asia/Kolkata"
            })
        )
        today.setHours(0,0,0,0)


        const tomorrow=new Date(today);

        tomorrow.setDate(tomorrow.getDate()+1)

        const activeRentals=bookings.filter((booking)=>{
            if (booking.status === "cancelled") {
                return false;
            }

            const start=new Date(booking.startDate)
            const end=new Date(booking.endDate)

            start.setHours(0,0,0,0)
            end.setHours(0,0,0,0)

            return(
               
                start<=today &&
                end>=today
            )
        })

        const upcomingRentals=bookings.filter((booking)=>{
            if (booking.status === "cancelled") {
                return false;
            }

            const start=new Date(booking.startDate)
            start.setHours(0,0,0,0)

            return(
                 start>today
            )

        })

            const completedRentals = bookings.filter((booking) => {

            if (booking.status === "cancelled") {
                return false;
            }
            const end = new Date(booking.endDate);
            end.setHours(0, 0, 0, 0);

            return end < today;

        });

        // total spent

        const totalSpent = bookings.reduce((total, booking) => {

                if (booking.status === "cancelled") {
                    return total;
                }
                return total + Number(
                    booking.totalAmount || 0
                );
            },
            0
        );
        // const rentalHistory=bookings.filter((booking)=>{
        //     const end=new Date(booking.endDate);

        //     end.setHours(0,0,0,0)

        //     return(
        //         booking.status!="cancelled" && end<today
        //     )
        // })

        const rentalHistory = bookings.filter((booking) => {

            if (booking.status === "cancelled") {
                return false;
            }

            const end = new Date(booking.endDate);
            end.setHours(0, 0, 0, 0);
            return end < today;
        });

        

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

         console.log("========== UPDATE PROFILE ==========");
            console.log("BODY:", req.body);
            console.log("FILE:", req.file ? {
            fieldname: req.file.fieldname,
            originalname: req.file.originalname,
            mimetype: req.file.mimetype,
            size: req.file.size,
            hasBuffer: !!req.file.buffer
            } : "NO FILE");


        const {name,phone,address,city,state,pincode}=req.body;

        const updateData={name,phone,address,city,state,pincode};

        if(req.file){

             if (!req.file.buffer) {
                return res.status(400).json({
                    success: false,
                    message: "Image buffer not available",
                });
            }

            console.log(
                "Uploading profile image to Cloudinary..."
            );

             console.log("Uploading profile image to Cloudinary...");
            const result=await uploadToCloudinary(req.file.buffer);
             console.log("CLOUDINARY RESULT:", result);

            updateData.profileImage={
                url: result.secure_url,
                public_id: result.public_id
            }
        }
          console.log("UPDATE DATA:", updateData);

        const user=await User.findByIdAndUpdate(
            req.user.id,
            updateData,
            {
                new:true,
                runValidators:true
            }
        ).select("-password")
         console.log("USER UPDATED:", user);


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

        const now = new Date();

        const today=new Date(
            now.toLocaleString("en-US",{
                timeZone:"Asia/Kolkata"
            })
        )
        today.setHours(0,0,0,0)


        const tomorrow=new Date(today);

        tomorrow.setDate(
            tomorrow.getDate()+1
        )

        const userBookings = await Booking.find({
            userId: req.user.id
        });


        const activeIds = userBookings
            .filter((booking) => {

                if (booking.status === "cancelled") {
                    return false;
                }

                const start = new Date(
                    booking.startDate
                );

                const end = new Date(
                    booking.endDate
                );

                start.setHours(0, 0, 0, 0);
                end.setHours(0, 0, 0, 0);

                return (
                    start <= today &&
                    end >= today
                );

            })
            .map(booking => booking._id);


        if (activeIds.length > 0) {

            await Booking.updateMany(
                {
                    _id: {
                        $in: activeIds
                    },
                    status: {
                        $in: ["approved", "completed"]
                    }
                },
                {
                    $set: {
                        status: "ongoing"
                    }
                }
            );

        }


        const completedIds = userBookings
            .filter((booking) => {

                if (booking.status === "cancelled") {
                    return false;
                }

                const end = new Date(
                    booking.endDate
                );

                end.setHours(0, 0, 0, 0);

                return end < today;

            })
            .map(booking => booking._id);


        if (completedIds.length > 0) {

            await Booking.updateMany(
                {
                    _id: {
                        $in: completedIds
                    },
                    status: {
                        $in: ["approved", "ongoing"]
                    }
                },
                {
                    $set: {
                        status: "completed"
                    }
                }
            );

        }



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