import mongoose from 'mongoose'

export const connectdb=async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("mongodb Connected Succesfully")
    } catch (error) {
        console.log(error.message)
    }
}