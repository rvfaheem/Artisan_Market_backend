import mongoose, {Schema,model} from "mongoose";
import Create_exihibition from "./create_exihibition.js";
import User from "./user.js";
import Sub_category from "./sub_category.js";

const userSchema=new Schema({
    productName:{
        type:String,
        required:true,
    },
    category_id:{

    },
    sub_categoryid:{
        type:mongoose.Types.ObjectId,
        ref:Sub_category
    },
    exihibitionid:{
        type:String,
        type:mongoose.Types.ObjectId,

    },
    artistid:{
        type:String,
        type:mongoose.Types.ObjectId,
    },
    artist:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    rate:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        default:'forsale'
    }
})

const Exihibition_productadd =model('exihibition_productadd',userSchema)
export default Exihibition_productadd