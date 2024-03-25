import { Schema,model } from "mongoose";


const userSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    image:{
        type:String,
    },
    gmail:{
        type:String,
        required:true,
        unique:true
    },
    phoneNumber:{
        type:String,
        required:true,
    },
    profile:{
        type:String,
        
    },
    id_proof:{
        type:String,
    },
    category:{
        type:"String",
        
    },
    artwork:{
        type:"String",
    },
    Experience:{
        type:String,
    },
    Address:{
        type:String,
        required:true,
    },
    userType:{
        type:String,
        required:true
    },
    password:{
        type: String,
        required:true
    }


})

export const User =model('User',userSchema)