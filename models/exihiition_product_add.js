import mongoose, {Schema,model} from "mongoose";

const userSchema=new Schema({
    productName:{
        type:String,
        required:true,
    },
    category_id:{

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
    }
})

const Exihibition_productadd =model('exihibition_productadd',userSchema)
export default Exihibition_productadd