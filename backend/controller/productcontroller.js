import User from "../model/authmodel.js";
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

    return res.status(200).json({
      success: true,
      products,
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
    const product=await Product.findById(req.params.id).populate("ownerId","name email phone city state profileImage")

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

