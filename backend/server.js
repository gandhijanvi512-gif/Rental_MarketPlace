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

const app=express()

app.use((req,res,next)=>{
    if(req.path==="/webhook"){
        next()
    }else{
        express.json()(req,res,next)
    }
})

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(morgan('dev'))
app.use(cookieParser())
app.use("/uploads",express.static("uploads"))
app.use(router)
app.use(productrouter)
app.use(cartrouter)
app.use(bookingrouter)
app.use(paymentrouter)
app.use(profilerouter)



dbconnect()
.then(()=>{
    console.log("DB Connected Successfully!")
})
.catch((err)=>{
    console.log(err)
})

app.listen(process.env.PORT,()=>{
    console.log("App is listen on port 5200");
})

app.get("/",(req,res)=>{
    res.send("Running")
})