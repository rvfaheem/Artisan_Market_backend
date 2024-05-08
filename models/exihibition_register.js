import mongoose, {Schema,model} from "mongoose";
import User from "./user.js";
import Create_exihibition from "./create_exihibition.js";


const userSchema =new Schema({
    productName:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        
    },
    image:{
        type:String,
    },
    email:{
        type:String,
        required:true,
    },
    phoneNumber:{
        type:String,
        required:true,
    },
    Address:{
        type:String,
        required:true,
    },
    userid:{
        type:mongoose.Types.ObjectId,
        ref:User
    },
    exihibitionid:{
        type:mongoose.Types.ObjectId,
        ref:Create_exihibition
    },
    status:{
        type:String,
        default:'pending'
    }
})

const Exihibition_register =model('exihibition_register',userSchema)
export default Exihibition_register