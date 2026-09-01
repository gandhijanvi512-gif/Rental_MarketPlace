import express from 'express'
import mongoose from 'mongoose'
import "dotenv/config"
import cookieParser from 'cookie-parser'
import dbconnect from './config/dbconnect.js'
import router from './routes/authroute.js'
import cors from "cors"
import productrouter from './routes/productroute.js'
import cartrouter from './routes/cartroute.js'
import bookingrouter from './routes/bookingroute.js'
import paymentrouter from './routes/paymentroute.js'
import profilerouter from './routes/profileroute.js'
import morgan from 'morgan'
import reviewrouter from './routes/reviewroute.js'
import wishlistrouter from './routes/wishlistroute.js'
import ownerRouter from './routes/ownerRoute.js'
import adminRouter from './routes/adminRoute.js'
import contactRouter from './routes/contactRoute.js'

const app=express()

const PORT = process.env.PORT || 5200;

app.set("trust proxy", 1);

app.use((req,res,next)=>{
    if(req.path==="/webhook"){
        next()
    }else{
        express.json()(req,res,next)
    }
})

// const allowedOrigins = [
//     "http://localhost:5173",
//     "http://localhost:5174",
//     "http://localhost:3000",
//     "https://rental-market-place.vercel.app",

// ];

// app.use(cors({
//     origin:(origin,callback)=>{
//         if(!origin)
//             return callback(null,true);

//         let isVercel=false

//         try{
//             const hostname=new URL(origin).hostname;

//             isVercel=hostname==="vercel.app" || hostname.endsWith(".vercel.app");
//         }catch(_){}

//         const isLocalOrPrivateNetwork = /^https?:\/\/(localhost|127\.0\.0\.1|192\.168\.\d{1,3}\.\d{1,3}|10\.\d{1,3}\.\d{1,3}|172\.(1[6-9]|2\d|3[01])\.\d{1,3}\.\d{1,3})(:\d+)?$/.test(origin);

//         if(isVercel || isLocalOrPrivateNetwork || process.env.NODE_ENV!=="production"){
//             return callback(null,true)
//         }

//         return callback(new Error("Not allowed by CORS"));
//     },
//     credentials:true
// }))

app.use(cors({
  origin: "https://rental-market-place.vercel.app",
  credentials: true
}));


app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())
// app.use("/uploads",express.static("uploads"))

app.use(router)
app.use(productrouter)
app.use(cartrouter)
app.use(bookingrouter)
app.use(paymentrouter)
app.use(profilerouter)
app.use(reviewrouter)
app.use(wishlistrouter)
app.use(ownerRouter)
app.use(adminRouter)
app.use(contactRouter)


app.use((req, res, next) => {
    if (req.headers["access-control-request-private-network"]) {
        res.setHeader("Access-Control-Allow-Private-Network", "true");
    }
    next();
});



dbconnect()
.then(()=>{
    console.log("DB Connected Successfully!")
})
.catch((err)=>{
    console.log(err)
})

app.listen(PORT,"0.0.0.0",()=>{
    console.log("App is listen on port 5200");
})

app.get("/",(req,res)=>{
    res.send("Running")
})