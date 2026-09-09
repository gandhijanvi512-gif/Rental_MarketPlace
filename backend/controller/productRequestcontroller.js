import Product from "../model/productmodel.js"
import ProductRequest from "../model/productRequestmodel.js"

export const getProductRequest=async(req,res)=>{

    try{
        const request=await ProductRequest.find()
        .populate("ownerId" ,"name email")
        .sort({createdAt:-1})

        return res.status(200).json({
            success:true,
            request
        })
    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}


export const approveProductRequest=async(req,res)=>{
    try{
        const {id}=req.params;

        const request=await ProductRequest.findById(id)

        if(!request){
            return res.status(404).json({
                success:false,
                message:"Product request not found"
            })
        }

        if(request.status!=="pending"){
            return res.status(400).json({
                success:false,
                message:"Request is already processed"
            })
        }

        // actual product create after approval

        const product=await Product.create({
            title:request.title,
            description:request.description,
            category:request.category,
            subcategory:request.subcategory,
            rentPrice:request.rentPrice,
            deposit:request.deposit,
            images:request.images,
            ownerId:request.ownerId,
            status:"approved"
        })

        request.status="approved",
        await request.save()

        return res.status(200).json({
            success: true,
            message: "Product approved successfully",
            product
        });

    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        }) 
    }
}


export const rejectProductRequest=async(req,res)=>{
    try{
        const {id}=req.params;

        const request=await ProductRequest.findById(id)

        if(!request){
            return res.status(404).json({
                success: false,
                message: "Product request not found"
            });
        }

        if(request.status!=="pending"){
            return res.status(400).json({
                success: false,
                message: "Request is already processed"
            });
        }

        request.status="rejected";
        await request.save()

        return res.status(200).json({
            success: true,
            message: "Product request rejected"
        });


    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}