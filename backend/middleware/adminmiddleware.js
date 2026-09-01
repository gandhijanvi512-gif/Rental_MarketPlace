import User from "../model/authmodel.js"
import jwt from "jsonwebtoken";

export const adminAuthMiddleware = (req, res, next) => {
    try {
        console.log("ADMIN COOKIES:", req.cookies);
        console.log("ADMIN TOKEN:", req.cookies?.adminrefreshtoken);

        const authHeader=req.headers && (req.headers.authorization || req.headers.Authorization);
        let bearerToken=null;

        if(typeof authHeader==="string"){
            if(authHeader.startsWith("Bearer")){
                bearerToken=authHeader.split(" ")[1];
            }else{
                bearerToken=authHeader
            }
        }


        const token=bearerToken || (req.cookies && req.cookies.adminrefreshtoken);

        // console.log("ADMIN COOKIES:", req.cookies);

        // const token = req.cookies.adminrefreshtoken;
        
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Admin authentication required"
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );


        const roles=Array.isArray(decoded.role)?decoded.role:[decoded.role];

        if (!roles.includes("admin")) {
            return res.status(403).json({
                success: false,
                message: "Admin access denied"
            });
        }

        req.admin = decoded;
        req.user=decoded

        next();

    } catch (err) {

        console.log("ADMIN AUTH ERROR:", err.message);

        return res.status(401).json({
            success: false,
            message: err.message
        });
    }
};




export const isAdmin=(req,res,next)=>{

    try{
        if(!req.user){
            return res.status(401).json({
                success:false,
                message:"Unauthorized"
            })
        }

        if(!req.user.role?.includes("admin")){
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





