import Booking from "../model/bookingmodel.js";
import Product from "../model/productmodel.js";

export const createBooking=async(req,res)=>{
    try{
        const {productId,startDate,endDate}=req.body;

        if(!productId ||!startDate || !endDate){
            return res.status(400).json({
                success:false,
                message:"Product, start date and end date are required"
            })
        }

        // convert dates

        const start=new Date(startDate)
        const end=new Date(endDate)

        if(isNaN(start.getTime())||isNaN(end.getTime())){
            return res.status(400).json({
                success:false,
                message:"Invalid booking dates"
            })
        }


        if(start>end){
            return res.status(400).json({
                success:false,
                message:"End date must be after start date"
            })
        }

        // findd product
        const product=await Product.findById(productId)

        if(!product){
            return res.status(404).json({
                success:false,
                message:"Product Not Found"
            })
        }

        const existingBooking=await Booking.findOne({
            productId,
            status:{
                $in:[
                    "pending",
                    "approved",
                    "ongoing"
                    // "cancelled"
                ]
            },
            startDate:{
                $lte:end
            },
            endDate:{
                $gte:start
            }
        });

        if(existingBooking){
            return res.status(400).json({
                success:false,
                message:"Product Already Booked",

                bookedFrom:existingBooking.startDate,
                bookedUntil:existingBooking.endDate

            })
        }

    // Rental Days
        const days=Math.ceil((
            new Date(endDate)-new Date(startDate)
        )/(1000*60*60*24))+1;

    // Rent amount

        const rentAmount=Number(product.rentPrice)*days;

        const depositAmount = Number(product.deposit || 0);

        // GST calculation

        const GST_RATE=18;
        const gstAmount=rentAmount*GST_RATE/100

        
        // Admin Commission
        const COMMISSION_RATE=10;
        const commissionAmount = rentAmount * COMMISSION_RATE / 100;

        // owner earning
        const ownerEarning=rentAmount-commissionAmount

        //admin earning
        const adminEarning=commissionAmount

        // final customer amount

        const totalAmount=rentAmount+gstAmount+depositAmount

        // const totalAmount=product.rentPrice*days+product.deposit

        const booking=await Booking.create({
            userId:req.user.id,
            productId,
            startDate:start,
            endDate:end,
            rentAmount:Number(rentAmount.toFixed(2)),
            depositAmount:Number(depositAmount.toFixed(2)),
            gstRate:GST_RATE,
            gstAmount:Number(gstAmount.toFixed(2)),
            commissionRate:COMMISSION_RATE,
            commissionAmount:Number(commissionAmount.toFixed(2)),
            ownerEarning:Number(ownerEarning.toFixed(2)),
            adminEarning:Number(ownerEarning.toFixed(2)),
            totalAmount:Number(totalAmount.toFixed(2)),
            status:"pending",
        })

        return res.status(200).json({
            success:true,
            message: "Booking created successfully",
            booking
        })
        
        
    }catch(err){
        console.error("CREATE BOOKING ERROR:",err)
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
        .populate({
            path:"productId",
            populate:{
                path:"ownerId",
                select:"name city state"
            }
        })


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


export const getMyRentals=async(req,res)=>{
    try{
        const bookings=await Booking.find({userId:req.user.id}).populate("productId").sort({createdAt: -1})

        const today=new Date()

        const rentals=bookings.map((booking)=>{
            const start=new Date(booking.startDate)
            const end=new Date(booking.endDate)


            let rentalStatus=""
            let remainingDays=0
            let progress=0

            const totalDays=Math.ceil((end-start)/(1000*60*60*24))+1

            if(today<start){
                rentalStatus="Upcoming";

                remainingDays=Math.ceil((end-start)/(1000*60*60*24))

                progress=0;
            }
            else if(today>=start && today<=end){
                rentalStatus="Active"

                remainingDays=Math.ceil((end-start)/(1000*60*60*24))

                const usedDays=Math.ceil((end-start)/(1000*60*60*24))

                progress=Math.min(Math.round((usedDays/totalDays)*100),100)
            }
            else{
                rentalStatus="Completed"
                remainingDays=0
                progress=100
            }

            return{
                id:booking._id,
                startDate:booking.startDate,
                endDate:booking.endDate,
                totalAmount:booking.totalAmount,
                bookingStatus:booking.status,
                rentalStatus,
                remainingDays,
                progress,
                totalDays,
                product:booking.productId
            }
        })

        return res.status(200).json({
            success:true,
            rentals
        })
    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}




// check available or not


// export const checkProductAvailability=async(req,res)=>{
//   try{
//     const {productId}=req.params;
//     const {startDate,endDate}=req.query;

//     if(!startDate || !endDate){
//       return res.status(400).json({
//         success:false,
//         message:"Start date and End date are required"
//       })
//     }


//     // convert date
//   const requestedStart=new Date(startDate)
//   const requestedEnd=new Date(endDate)

//   // validate date

//     if(isNaN(requestedStart.getTime())||isNaN(requestedEnd.getTime())){
//       return res.status(400).json({
//         success:false,
//         message:"Invalid date"
//       })
//     }

//     if (requestedStart > requestedEnd) { // ✅ compare Dates, not string vs Date
//       return res.status(400).json({
//         success: false,
//         message: "End date must be after start date",
//       });
//     }

//     const product=await Product.findById(productId)

//     if(!product){
//       return res.status(400).json({
//         success:false,
//         message:"Product Not Found"
//       })
//     }

//     // 6. Find overlapping booking
 
//     const existingBooking=await Booking.findOne({
//       productId,
//       status:{
//         $in:["pending","approved","ongoing"]
//       },
//       startDate:{
//         $lte:requestedEnd
//       },
//     }).select("startDate endDate")


//     // if product unavailable

//     if(existingBooking){
//       return res.status(200).json({
//         success:true,
//         isAvailable:false,
//         message:"Product is not available for selected dates",
//         bookedFrom:existingBooking.startDate,
//         bookedUntil:existingBooking.endDate
//       })
//     }

//     return res.status(200).json({
//       success: true,
//       isAvailable: true,
//       message: "Product is available for selected dates",
//     });


//   }catch(err){
//     return res.status(500).json({
//       success:false,
//       message:err.message
//     })
//   }
// }

export const checkProductAvailability = async (req, res) => {
  try {
    const { productId } = req.params;
    const { startDate, endDate } = req.query;
 
    if (!startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: "Start date and End date are required",
      });
    }
 
    // convert date
    const requestedStart = new Date(startDate);
    const requestedEnd = new Date(endDate);
 
    // validate date
    if (isNaN(requestedStart.getTime()) || isNaN(requestedEnd.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid date",
      });
    }
 
    // ✅ FIX: was comparing the raw `startDate` string to a Date object
    // (`startDate > requestedEnd`), which is an unreliable comparison.
    // Compare the parsed Date objects instead.
    if (requestedStart > requestedEnd) {
      return res.status(400).json({
        success: false,
        message: "End date must be after start date",
      });
    }
 
    const product = await Product.findById(productId);
 
    if (!product) {
      return res.status(400).json({
        success: false,
        message: "Product Not Found",
      });
    }
 
    // 6. Find overlapping booking
    //
    // ✅ FIX: the original query only checked
    //   startDate: { $lte: requestedEnd }
    // which matches ANY booking that merely started before the requested
    // end date — including bookings that already ended long ago. A correct
    // date-range overlap needs BOTH conditions:
    //   existingBooking.startDate <= requestedEnd
    //   AND existingBooking.endDate  >= requestedStart
    const existingBooking = await Booking.findOne({
      productId,
      status: {
        $in: ["pending", "approved", "ongoing"],
      },
      startDate: { $lte: requestedEnd },
      endDate: { $gte: requestedStart },
    }).select("startDate endDate");
 
    // if product unavailable
    if (existingBooking) {
      return res.status(200).json({
        success: true,
        isAvailable: false,
        message: "Product is not available for selected dates",
        bookedFrom: existingBooking.startDate,
        bookedUntil: existingBooking.endDate,
      });
    }
 
    return res.status(200).json({
      success: true,
      isAvailable: true,
      message: "Product is available for selected dates",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
 