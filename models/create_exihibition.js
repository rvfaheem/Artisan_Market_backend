import mongoose, {Schema,model} from "mongoose";


const userSchema =new Schema({
    exihibitionName:{
        type:String,
        required:true,
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
        type:String,
        requied:true,
    },
    enddate:{
        type:String,
        required:true,
    }
})

const Create_exihibition =model('create_exihibition',userSchema)
export default Create_exihibition