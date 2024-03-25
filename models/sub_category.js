import mongoose, { Schema,model } from "mongoose";
import Category from "./category.js"; 


const userSchema = new Schema({
    categoryid:{
        type:mongoose.Types.ObjectId,
        ref:Category
    },
    sub_category:{
        type:String,
        required:true,
    }
})

const Sub_category =model('sub_category',userSchema)
export default Sub_category