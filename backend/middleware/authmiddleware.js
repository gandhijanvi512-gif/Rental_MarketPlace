import jwt from "jsonwebtoken"

export const authMiddleware=async(req,res,next)=>{
    try{
        console.log("Cookies:",req);
        

        const token=req.cookies?.refreshtoken

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
        console.log("AUTH ERROR:", err.message);
        return res.status(401).json({
            
            success:false,
            message:err.message,
            message:"Invalid or expired token"

        })
    }
}