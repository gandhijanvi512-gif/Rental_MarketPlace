import mongoose from "mongoose";

const dbconnect=async function main(){
   await mongoose.connect(process.env.DB_URL) 
}

export default dbconnect