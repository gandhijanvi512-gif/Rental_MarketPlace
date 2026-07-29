import jwt from "jsonwebtoken"

export const authMiddleware=async(req,res,next)=>{
    try{
        const token=req.cookies.refreshtoken

        if(!token){
            return res.status(400).json({
                success:false,
                message:"Token Required!"
            })
        }

        const decoded=jwt.verify(
            token,
            process.env.JWT_SECRET
        )
        
        req.user=decoded;
        next()
    }catch(err){
        
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}