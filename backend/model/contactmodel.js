import mongoose from "mongoose";

export const contactSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            trim:true
        },
        email:{
            type:String,
            required:true,
            trim:true,
            lowercase:true
        },
        subject:{
            type:String,
            required:true,
            trim:true
        },
        category:{
            type:String,
            required:true,
            enum:[
                "Booking Issue",
                "Payment Issue",
                "Product Issue",
                "Owner Issue",
                "Account Issue",
                "General Inquiry"
            ]
        },
        message:{
            type:String,
            required:true,
            trim:true
        },
        status:{
            type:String,
            enum:["new","read","resolved"],
            default:"new"
        }
    },
    {
        timestamps:true
    }
)

const Contact=new mongoose.model("Contact",contactSchema)

export default Contact