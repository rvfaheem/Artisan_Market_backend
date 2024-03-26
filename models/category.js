import mongoose, { Schema,model } from "mongoose";
import User from './user.js'


const userSchema = new Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        ref:User
    },
    category:{
        type:String,
        required:true,
    }
})

 const Category =model('category',userSchema)
 export default Category