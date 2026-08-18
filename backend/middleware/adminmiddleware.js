import User from "../model/authmodel.js"

export const isAdmin=(req,res,next)=>{

    try{
        if(!req.user){
            return res.status(401).json({
                success:false,
                message:"Unauthorized"
            })
        }

        if(!req.user.role?.includes=="admin"){
            return res.status(403).json({
                success:false,
                message:"Admin access required"
            })
        }
        next()
    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}


