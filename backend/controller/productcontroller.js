import User from "../model/authmodel.js";
import Booking from "../model/bookingmodel.js";
import Product from "../model/productmodel.js";

export const addProduct = async (req, res) => {
  try {
    const { title, description, category, subcategory, rentPrice, deposit } = req.body;

    const images = req.files.map((file) => {
      return `/uploads/products/${file.filename}`;
    });

    const product = await Product.create({
      title,
      description,
      category,
      subcategory,
      rentPrice,
      deposit,
      images,
      ownerId: req.user.id,
    });

    return res.status(200).json({
      success: true,
      message: "Product Added Successfully!",
      product,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

//GET /products  Paginated list of all available 
export const getProducts = async (req, res) => {
  try {
    const { search, category, minPrice, maxPrice } = req.query;

    let filter = {};

    // Search by title
    if (search) {
      filter.title = {
        $regex: search,
        $options: "i",
      };
    }

    // Category filter
    if (category) {
      filter.category = category;
    }

    // Price filter
    if (minPrice || maxPrice) {
      filter.rentPrice = {};

      if (minPrice) {
        filter.rentPrice.$gte = Number(minPrice);
      }

      if (maxPrice) {
        filter.rentPrice.$lte = Number(maxPrice);
      }
    }

    const products = await Product.find(filter)
      .populate("ownerId", "name email");

    const today=new Date()
    today.setHours(0,0,0,0)

    const productIds=products.map(product=>product._id)

    const bookings=await Booking.find({
      productId:{$in:productIds},
      
      status:{
        $in:["pending","approved","ongoing"]
      },
      endDate:{
        $gte:today
      }
    }).select("productId startDate endDate")


    const updateProducts=products.map(product=>{
      const productBookings=bookings.filter(booking=>booking.productId && booking.productId.toString()===product._id.toString())
      .sort((a,b)=>new Date(a.startDate)-new Date(b.startDate))

      let availability={
        available:true,
        unavailableDays:0,
        availableFrom: null
      }

      if(productBookings.length>0){
        let unavailableUntil=null

        for(const booking of productBookings){
          const start = new Date(booking.startDate);
          const end = new Date(booking.endDate);

          start.setHours(0, 0, 0, 0);
          end.setHours(0, 0, 0, 0);


          if(start<=today && end>=today){
            unavailableUntil=end
            break
          }
        }

        if(unavailableUntil){
          const availableDate=new Date(unavailableUntil)

          availableDate.setDate(
            availableDate.getDate()+1
          )

          const unavailableDays=Math.ceil((availableDate-today)/(1000*60*60*24))

          availability={
            available:false,
            unavailableDays,
            availableFrom:availableDate
          }
        }
      }

      return{
        ...product.toObject(),
        availability
      }
    })




    return res.status(200).json({
      success: true,
      products: updateProducts,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateProduct=async(req,res)=>{
  try{
    const {id}=req.params;

    const {title,description,category,rentPrice,deposit}=req.body

    const updateProduct=await Product.findByIdAndUpdate(id,{
      title,
      description,
      category,
      rentPrice,
      deposit
    },
    {
      new:true
    })

    if(!updateProduct){
      return res.status(404).json({
        success:false,
        message:"Product Not Found"
      })
    }

    return res.status(200).json({
      success:true,
      message:"Product Update Successfully!",
      product: updateProduct
    })
  }catch(err){
    return res.status(500).json({
      success:false,
      message:err.message
    })
  }
}

export const getSingleProduct=async(req,res)=>{
  try{
    const {id}=req.params;

    const product=await Product.findById(id);

    if(!product){
      return res.status(404).json({
        success:false,
        message:"Product Not Found!"
      })
    }

    return res.status(200).json({
      success:true,
      product
    })
  }catch(err){
    return res.status(500).json({
      success:false,
      message:err.message
    })
  }
}

export const deleteProduct=async(req,res)=>{
  try{
    const {id}=req.params;

    const deleteProduct=await Product.findByIdAndDelete(id);

    if(!deleteProduct){
      return res.status(404).json({
        success:false,
        message:"Product Not Found!"
      })
    }

    return res.status(200).json({
      success:true,
      message:"Product Deleted Successfully!"
    })
  }catch(err){
    return res.status(500).json({
      success:false,
      message:err.message
    })
  }
}

export const getMyProduct=async(req,res)=>{
  try{  
    const product=await Product.find({ownerId:req.user.id})

    return res.status(200).json({
      success:true,
      message:"All Product",
      product
    })
  }catch(err){
    return res.status(500).json({
      success:false,
      message:err.message
    })
  }
}

export const searchProduct=async(req,res)=>{
  try{  
    const {q}=req.query;

    const product=await Product.find({
      $or:[
        {title: {
          $regex:q,
          $options:"i"
        }},
        {
          description:{
            $regex:q,
            $options:"i"
          }
        }
      ]
    })
    return res.status(200).json({
      success:true,
      product
    })
  }catch(err){
    return res.status(500).json({
      success:false,
      message:err.message
    })
  }
}

// export const filterProducts=async(req,res)=>{
//   try{
//     const {search,category,minPrice,maxPrice}=req.query;

//     let filter={}

//     if(search){
//       filter.title={
//         $regex: search,
//         $options: "i"
//       }
//     }

//     if(category){
//       filter.category=category
//     }

//     if(minPrice||maxPrice){
//       filter.rentPrice={};

//       if(minPrice){
//         filter.rentPrice.$gte=minPrice;
//       }

//       if(maxPrice){
//         filter.rentPrice.$lte=maxPrice
//       }

//       const products=await Product.find(filter);

//       return res.status(200).json({
//         success:true,
//         products
//       })
//     }
//   }catch(err){
//     return res.status(500).json({
//       success:false,
//       message:err.message
//     })
//   }
// }

export const featureProduct=async(req,res)=>{
  try{
    const product=await Product.find()

    .sort({createdAt:-1})
    .limit(4)

    return res.status(200).json({
      success:true,
      product
    })
  }catch(err){
    return res.status(500).json({
      success:false,
      message:err.message
    })
  }
}

export const getProductDetails=async(req,res)=>{
  try{

    const id=req.params.id

    const product=await Product.findById(req.params.id)
    .populate("ownerId","name email phone city state profileImage")

    const today=new Date()
    today.setHours(0,0,0,0)

    const bookings=await Booking.find({
      productId:id,
      status:{
        $in:["pending","approved","ongoing"]
      },
      endDate:{
        $gte:today
      }
    }).select("startDate endDate")


    let availability = {
    available: true,
    unavailableDays: 0,
    availableFrom: null
};

const currentBooking = bookings
    .map((booking) => ({
        start: new Date(booking.startDate),
        end: new Date(booking.endDate)
    }))
    .sort((a, b) => a.start - b.start)
    .find((booking) => {
        booking.start.setHours(0, 0, 0, 0);
        booking.end.setHours(0, 0, 0, 0);

        return booking.start <= today && booking.end >= today;
    });

if (currentBooking) {

    const availableDate = new Date(currentBooking.end);

    availableDate.setDate(
        availableDate.getDate() + 1
    );

    const unavailableDays = Math.ceil(
        (availableDate - today) /
        (1000 * 60 * 60 * 24)
    );

    availability = {
        available: false,
        unavailableDays,
        availableFrom: availableDate
    };
}


    if(!product){
      return res.status(404).json({
        success:false,
        message:"Product Not Found!"

      })
    }



    return res.status(200).json({
      success:true,
      product:{
        ...product.toObject(),
        availability
      }
    })
  }catch(err){
    return res.status(500).json({
      success:false,
      message:err.message
    })
  }
}

export const getProductByCategory=async(req,res)=>{
  try{
    const {category}=req.params;

    const products=await Product.find({
      category,
    })

    return res.status(200).json({
      success:true,
      products
    })
  }catch(err){
    return res.status(500).json({
      success:false,
      message:err.message
    })
  }
}






