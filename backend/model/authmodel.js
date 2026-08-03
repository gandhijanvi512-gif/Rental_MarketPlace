import mongoose from "mongoose";

const userSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true
        },
        password:{
            type:String,
            required:true
        },
        role:{
            type:String,
            enum:["user","owner"],
            default:"user"
        },
        phone: {
            type: String,
            default: ""
        },

        address: {
            type: String,
            default: ""
        },

        city: {
            type: String,
            default: ""
        },

        state: {
            type: String,
            default: ""
        },

        pincode: {
            type: String,
            default: ""
        },

        profileImage: {
            type: String,
            default: ""
        },

        isActive:{
            type:Boolean,
            default:true
        }
    },
    {
        timestamps:true
    }
)

const User=mongoose.model("User",userSchema)

export default User