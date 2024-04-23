import mongoose, {Schema,model} from "mongoose";
import User from "./user.js";


const userSchema =new Schema({
    exihibitionName:{
        type:String,
        required:true,
    },
    organisationId:{
        type:mongoose.Types.ObjectId,
        ref:User,

    },
    sponcers:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        
    },
    description:{
        type:String,
        required:true,

    },
    startdate:{
        type:Date,
        requied:true,
    },
    enddate:{
        type:Date,
        required:true,
    },
    status:{
        type:String,
        
    }
})

const Create_exihibition =model('create_exihibition',userSchema)
export default Create_exihibition