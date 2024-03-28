import mongoose, { Schema,model } from "mongoose";
import Add_product from "./add_product.js";
import User from "./user.js";


const userSchema = new Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        ref:User,
    },
    productId:{
        type:mongoose.Types.ObjectId,
        ref:Add_product,
    },
    date:{
        type:Date,
        default:Date.now(),
    }
})

const   Order=model('order',userSchema)
export default Order