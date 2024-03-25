import mongoose, {Schema,model} from "mongoose";
import {user} from './user.js'
import {sub_category} from './sub_category.js'


const userSchema =new Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        ref:User
    },
    productName:{
        type:String,
        required:true,
    },
    Image:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    sub_categoryid:{
        type:String,
        required:true,
    },
    price:{
        type:String,
        required:true,
    }

})

const Add_product=model('add_product',userSchema)
export default Add_product