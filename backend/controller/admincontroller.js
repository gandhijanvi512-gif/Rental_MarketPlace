import User from "../model/authmodel.js";
import Booking from "../model/bookingmodel.js";
import Product from "../model/productmodel.js";


export const getAllUser=async(req,res)=>{
    try{
        const users=await User.find()
        .select("-password -refreshtoken")
        .sort({createdAt:-1})

        return res.status(200).json({
            success:true,
            count:users.length,
            users
        })


    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}



export const updateUser=async(req,res)=>{
    try{
        const {id}=req.params
        const {role,isActive}=req.body;


        const user=await User.findById(id)

        if(!user){
            return res.status(404).json({
                success:false,
                message:"User Not Found"
            })
        }

        if(role!==undefined){
            user.role=role
        }

        if(isActive!==undefined){
            user.isActive=isActive
        }

        await user.save()

        return res.status(200).json({
            success:true,
            message:"User updated successfully",
            user
        })

    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

export const deleteUser=async(req,res)=>{
    try{
        const {id}=req.params;

        const user=await User.findById(id);

        if(!user){
            return res.status(404).json({
                success:false,
                message:"User Not Found"
            })
        }

        // Admin cannot delete their own account

        if(req.user.id===id){
            return res.status(400).json({
                success:false,
                message:"You cannot delete your own admin account"
            })
        }

        await User.findOneAndDelete(id)

        return res.status(200).json({
            success:true,
            message:"User Deleted Successfully!"
        })
    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}


export const getAdminOverview=async(req,res)=>{
    try{
        const totalUsers=await User.countDocuments({role:"user"})
        const totalOwners=await User.countDocuments({role:"owner"})
        const totalAdmins=await User.countDocuments({role:"admin"})

        // product-booking related

        const totalProducts=await Product.countDocuments();
        const totalBookings=await Booking.countDocuments();
        const activeBookings=await Booking.countDocuments({status:"ongoing"})


        // Total revenue 

        // admin revenue=adminEarning

        const revenueResult=await Booking.aggregate([
            {
                $match:{
                    status:{
                        $in: ["approved", "ongoing", "completed"]
                    }
                }
            },
            {
                $group:{
                    _id:null,
                    totalRevenue:{
                        $sum:"$adminEarning"
                    }
                }
            }
        ])
        console.log("REVENUE RESULT:", revenueResult);

        const totalRevenue=revenueResult.length>0?revenueResult[0].totalRevenue:0;

        return res.status(200).json({
            success:true,
            data:{
                totalUsers,
                totalOwners,
                totalAdmins,
                totalProducts,
                totalBookings,
                activeBookings,
                totalRevenue
            }
        })


    }catch(err){
        return res.status(500).json({
            success:false,
            message:"Failed to fetch admin overview"
        })
    }
}

// group by status

export const getBookingByStatus=async(req,res)=>{
    try{
        const statusData=await Booking.aggregate([
            {
                $group:{
                    _id:"$status",
                    count:{
                        $sum:1 
                    }
                }
            },
            {
                $sort:{
                    count:-1
                }
            }
        ])

        return res.status(200).json({
            success:true,
            data:statusData
            
        })
    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}


// owner analytics

export const getOwnerAnalytics=async(req,res)=>{
    try{
        const ownerData=await User.aggregate([
            {
                $match:{
                    role:"owner"
                }
            },
            // 2. GET PRODUCTS OF EACH OWNER
            {
                $lookup:{
                    from:"products",
                    localField:"_id",
                    foreignField:"ownerId",
                    as:"products"
                }
            },
            // 3. GET BOOKINGS FOR THOSE PRODUCTS
            {
                $lookup:{
                    from:"bookings",
                    let:{
                        productIds:"$products._id"
                    },
                    pipeline:[
                        {
                            $match:{
                                $expr:{
                                    $in:[
                                        "$productId","$$productIds"
                                    ]
                                }
                            }
                        }
                    ],
                    as:"bookings"
                }
            },
            // 4. CREATE FINAL OWNER DATA
          
            {
                $project:{
                    _id:0,
                    ownerId:"$_id",
                    ownerName:"$name",
                    ownerEmail:"$email",
                    totalProducts:{
                        $size:"$products"
                    },

                    totalEarning:{
                        $sum:"$bookings.ownerEarning"
                    }
                }
            },
            {
                $sort:{
                    totalEarning:-1
                }
            }
        ])

        return res.status(200).json({
            success:true,
            data:ownerData
        })
    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}


// get Top products

export const getTopProducts=async(req,res)=>{
    try{
        const topProducts=await Booking.aggregate([
            {
                $match:{
                    status:{
                        $ne:"cancelled"
                    }
                }
            },
            {
                $group:{
                    _id:"$productId",
                    totalBookings:{
                        $sum:1
                    }
                }
            },
            {
                $sort:{
                    totalBookings:-1
                }
            },
            {
                $limit:10
            },
            {
                $lookup:{
                    from:"products",
                    localField:"_id",
                    foreignField:"_id",
                    as:"product"
                }
            },
            {
                $unwind:"$product"
            },
            {
                $project:{
                    _id:0,
                    productId:"$_id",
                    title:"$product.title",
                    category:"$product.category",
                    totalBookings:1
                }
            }
        ])

        return res.status(200).json({
            success:true,
            data:topProducts
        })
    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}
