import mongoose, {Schema,model} from "mongoose";

const userSchema= new Schema({
    name:{
        type:String,
        required:true,
    },
    phoneNumber:{
        type:String,
        required:true,
    },
    cardno:{
        type:String,
    },
    mmyy:{
        type:String,
        required:true,
    },
    cvv:{
        type:String,
        required:true,
    }

})

const Payment=model('payment',userSchema)
export default Payment