import mongoose, {Schema,model} from "mongoose";

const userSchema =new Schema({
    productName:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
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
    }
})

const Exihibition_register =model('exihibition_register',userSchema)
export default Exihibition_register