import Booking from "../model/bookingmodel.js"
import Product from "../model/productmodel.js"

export const getOwnerDashboard=async(req,res)=>{
    try{
        const ownerId=req.user.id

        const products=await Product.find({
            ownerId:ownerId
        }).select("_id")

        const productIds=products.map(product=>product._id)

        const now=new Date()

        const indiaToday=new Date(
            now.toLocaleDateString("en-US",{
                timeZone:"Asia/Kolkata"
            })
        )

        indiaToday.setHours(0,0,0,0)

        const tomorrow=new Date(indiaToday)
        tomorrow.setDate(tomorrow.getDate()+1)

        // ==========================================
        // ACTIVE RENTALS
        // approved/completed -> ongoing
        // ==========================================

        await Booking.updateMany(
            {
                productId:{$in:productIds},

                startDate:{
                    $lt:tomorrow
                },
                endDate:{
                    $gte:indiaToday
                },
                status:{
                    $in:["approved","completed"]
                }
            },
            {
                $set:{
                    status:"ongoing"
                }
            }
        )

        // ==========================================
// FINISHED RENTALS
// ongoing -> completed
// ==========================================

await Booking.updateMany(
    {
        productId: { $in: productIds },
        status: "ongoing",
        endDate: {
            $lt: indiaToday
        }
    },
    {
        $set: {
            status: "completed"
        }
    }
);


         
        //  Get bookings for owner's products

        const bookings=await Booking.find({
            productId: {$in:productIds}
        }).populate("userId","name email")
        .populate("productId","title images rentPrice")
        .sort({createdAt:-1})


        // stats

        const totalProducts=products.length;

        const activeRentals=bookings.filter((booking)=>booking.status==="ongoing").length;

        const pendingRequest=bookings.filter((booking)=>booking.status==="pending").length;

        const completedBooking=bookings.filter((booking)=>booking.status==="completed")

        const earningBookings=bookings.filter((booking)=>
            ["approved","ongoing","completed"].includes(booking.status)
        )

        const totalEarnings=earningBookings.reduce((total,booking)=>{
            return total+Number(booking.ownerEarning || 0)
        },0)

        const totalBookings = bookings.length;


        return res.status(200).json({
            success:true,
            stats:{
                totalProducts,
                activeRentals,
                pendingRequest,
                totalEarnings,
                totalBookings,
            },
           
        })
    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}


export const getOwnerActiveRentals = async (req, res) => {
    try {
        const ownerId = req.user.id;

        const products = await Product.find({
            ownerId: ownerId
        }).select("_id");

        const productIds = products.map(
            product => product._id
        );


        // ==========================================
        // TODAY - INDIA TIME
        // ==========================================

        const now=new Date()

        const indiaDate=new Date(
            now.toLocaleString("en-US",{
                timeZone:"Asia/Kolkata"
            })
        )
        indiaDate.setHours(0,0,0,0)


        // TOMORROW

        const tomorrow=new Date(indiaDate)

        tomorrow.setDate(
            tomorrow.getDate()+1
        )
        console.log("TODAY:", indiaDate);

        await Booking.updateMany(
            {
                productId: {
                    $in: productIds
                },
                startDate: {
                    $lt: tomorrow
                },
                endDate: {
                    $gte: indiaDate
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

        await Booking.updateMany(
            {
                productId: {
                    $in: productIds
                },
                status: "ongoing",
                endDate: {
                    $lt: indiaDate
                }
            },
            {
                $set: {
                    status: "completed"
                }
            }
        );


        const activeRentals = await Booking.find({
            productId: {
                $in: productIds
            },
            startDate:{
                $lt:tomorrow
            },
            endDate:{
                $gte:indiaDate
            },
            status:{
                $ne:"cancelled"
            }
            
        })
            .populate(
                "userId",
                "name email phone"
            )
            .populate(
                "productId",
                "title images rentPrice deposit"
            )
            .sort({
                startDate: 1
            });



        return res.status(200).json({
            success: true,
            activeRentals
        });

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};




export const getOwnerBookingHistory=async(req,res)=>{
    try{

        const ownerId=req.user.id

        const products=await Product.find({
            ownerId:ownerId
        }).select("_id")

        const productIds=products.map(product=>product._id)

        const now=new Date()

        const today=new Date(
            now.toLocaleString("en-US",{
                timeZone:"Asia/Kolkata"
            })
        )
        today.setHours(0,0,0,0)

        
        

        
        // find completed record

        const bookings=await Booking.find({
            productId:{$in:productIds},
            endDate:{
                $lt:today
            },
            status:{
                $ne:"cancelled"
            }
        })
        .populate("userId","name email")
        .populate("productId","title images rentPrice deposit")
        .sort({endDate:-1})

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



// get owner earnings:

export const getOwnerEarnings=async(req,res)=>{
    try{
        const ownerId=req.user.id

        const products=await Product.find({
            ownerId:ownerId
        }).select("_id")

        const productIds=products.map(product=>product._id)

        const bookings=await Booking.find({
            productId:{
                $in:productIds
            },
            status:{
                $in:["approved", "ongoing", "completed"]
            }
        })
        .populate("productId","title images rentPrice")
        .populate("userId","name email")
        .sort({endDate:-1})

        const totalEarning=bookings.reduce((total,booking)=>{
            return total+Number(booking.ownerEarning||0)
        },0)

        const totalCommission=bookings.reduce((total,booking)=>{
            return total+Number(booking.commissionAmount||0)
        },0)

        const totalRentals=bookings.length;

        const averageEarning=totalRentals>0?totalEarning/totalRentals:0

        const monthlyEarnings=[
            {month:"Jan",earnings:0},
            {month:"Feb",earnings:0},
            {month:"Mar",earnings:0},
            {month:"Apr",earnings:0},
            {month:"May",earnings:0},
            {month:"Jun",earnings:0},
            {month:"Jul",earnings:0},
            {month:"Aug",earnings:0},
            {month:"Sep",earnings:0},
            {month:"Oct",earnings:0},
            {month:"Nov",earnings:0},
            {month:"Dec",earnings:0},

        ]

        bookings.forEach((booking)=>{
            const month=new Date(booking.endDate).getMonth()

            monthlyEarnings[month].earnings+=Number(booking.ownerEarning||0)
        })

        


        return res.status(200).json({
            success:true,
            summary:{
                totalEarning,
                totalCommission,
                totalRentals,
                averageEarning
            },
            monthlyEarnings,
            earnings:bookings
        })

        
    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}


// getowner products

export const getOwnerProducts=async(req,res)=>{
    try{    
        const {ownerId}=req.params;
        console.log("OWNER ID:", ownerId);

        const products=await Product.find({ownerId:ownerId})
        console.log("OWNER PRODUCTS:", products);

        return res.stats(200).json({
            success:true,
            message:"Owner Products",
            products
        })
    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

