import mongoose, {Schema,model} from "mongoose";


const userSchema=new Schema({
    exihibitionName:{
        type:String,
        equired:true,
    },
    sponcers:{
        type:String,
        required:true,
    },
    venue:{
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
    startingdate:{
        type:String,
        required:true,
    },
    endingdate:{
        type:String,
        required:true,
    }
})

const Send_offlineexihibition=model('send_offlineexihibition',userSchema)
export default Send_offlineexihibition