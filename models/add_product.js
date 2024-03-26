import mongoose, {Schema,model} from "mongoose";
import user from './user.js'
import sub_category from './sub_category.js'
import Sub_category from "./sub_category.js";


const userSchema =new Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        ref:user
    },
    productName:{
        type:String,
        required:true,
    },
    Image:{
        type:String,
        required:true,
    },
    sub_categoryid:{
        type:mongoose.Types.ObjectId,
        ref:Sub_category,
    },
    price:{
        type:String,
        required:true,
    }

})

const Add_product=model('add_product',userSchema)
export default Add_product