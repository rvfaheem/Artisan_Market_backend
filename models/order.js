import mongoose, { Schema,model } from "mongoose";
import Add_product from "./add_product.js";


const userSchema = new Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        ref:User,
    },
    productNameId:{
        type:mongoose.Types.ObjectId,
        ref:Add_product,
    },
    date:{
        type:String,
        required,
    }
})