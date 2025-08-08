import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    desc:{
        type:String,
        default:""
    }

})

export const Category = mongoose.model("Category", CategorySchema)