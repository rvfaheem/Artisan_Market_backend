import express from 'express'
import Create_exihibition from '../models/create_exihibition.js'
import Send_offlineexihibition from '../models/send_offline_exihibition.js'
import Send_onlineexihibition from '../models/send_online_exihibition.js'
import { upload } from '../multer.js'
import Exihibition_register from '../models/exihibition_register.js'
import User from '../models/user.js'


const router=express()

// router.post('/createexihibition',async(req,res)=>{
//     try{
//         console.log(req.body)
//         let exihibition=new Create_exihibition(req.body)
//         let response=await exihibition.save()
//         res.json(response)
//     }
//     catch(e){
//         res.json(e.message)
//     }
// })


router.post('/createexihibition',upload.single("image"),async(req,res)=>{
    try{
        console.log(req.body)
        console.log(req.files);
        console.log(req.file);
        let create_exihibition=new Create_exihibition({...req.body,image:req.file?.filename})
        
        let response=await create_exihibition.save()
        res.json(response)
    }
    catch(e){
        res.json(e.message)
    }
})

router.post('/Sendoffline',upload.single("image"),async(req,res)=>{
    try{
        console.log(req.body)
        console.log(req.files);
        console.log(req.file);
        let sendoffline=new Send_offlineexihibition({...req.body,image:req.file?.filename})
        
        let response=await sendoffline.save()
        res.json(response)
    }
    catch(e){
        res.json(e.message)
    }
})

router.post('/Sendonline',upload.single("image"),async(req,res)=>{
    try{
        console.log(req.body)
        console.log(req.files);
        console.log(req.file);
        let sendonline=new Send_onlineexihibition({...req.body,image:req.file?.filename})
        let response=await sendonline.save()
        res.json(response)
    }
    catch(e){
        res.json(e.message)
    }
})

router.get('/viewexihibitionartist',async(req,res)=>{
    let response=await Exihibition_register.find()
    console.log(response)
    res.json(response)
})

router.put('/manageexhibitionartist/:id',async(req,res)=>{
    let id=req.params.id
    console.log(id)
    console.log(req.body)
    let response=await Exihibition_register.findByIdAndUpdate(id,req.body)
    console.log(response);

})



export default router