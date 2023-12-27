import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()
const connectDatabase=async()=>{
    mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        console.log('database  connected')
    })
    .catch((err)=>{
        console.log('database not connected',err?.message)

    })
}

export default connectDatabase
