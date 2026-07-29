import Booking from "../model/bookingmodel.js"
import Cart from "../model/cartmodel.js"
import Product from "../model/productmodel.js"

// export const addToCart=async(req,res)=>{
//     try{
//         const {productId,startDate,endDate}=req.body

//         const cart=await Cart.create({
//             userId:req.user.id,
//             productId,
//             startDate,
//             endDate
//         })

//         return res.status(200).json({
//             success:true,
//             message:"Product Add To Cart",
//             cart
//         })
//     }catch(err){
//         return res.status(500).json({
//             success:false,
//             message:err.message
//         })
//     }
// }

export const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;

    const cart = await Cart.create({
      userId: req.user.id,
      productId
    });

    return res.status(200).json({
      success: true,
      message: "Product Added To Cart",
      cart
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

export const removeFromCart=async(req,res)=>{
    try{
        await Cart.findByIdAndDelete(req.params.id)

        return res.status(200).json({
            success:true,
            message:"Item Removed"
        })
    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

export const getCart=async(req,res)=>{
    try{
        const items=await Cart.find({
            userId:req.user.id
        }).populate("productId")

        let rentTotal=0;
        let depositTotal=0;

        items.forEach(item => {
            const days=Math.ceil(
                (
                    new Date(item.endDate)-new Date(item.startDate)
                )/(1000*60*60*24)
            )+1;

            rentTotal+=item.productId.rentPrice*days;

            depositTotal+=item.productId.deposit
        });

        return res.status(200).json({
            success:true,
            items,
            rentTotal,
            depositTotal,
            grandTotal:rentTotal+depositTotal
        })
    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

