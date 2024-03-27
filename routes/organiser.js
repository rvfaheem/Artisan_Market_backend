import express from 'express'
import Create_exihibition from '../models/create_exihibition.js'
import Send_offlineexihibition from '../models/send_offline_exihibition.js'
import Send_onlineexihibition from '../models/send_online_exihibition.js'
import { upload } from '../multer.js'


const router=express()

router.post('/createexihibition',async(req,res)=>{
    try{
        console.log(req.body)
        let exihibition=new Create_exihibition(req.body)
        let response=await exihibition.save()
        res.json(response)
    }
    catch(e){
        res.json(e.message)
    }
})

router.post('/Sendoffline',upload.single("Image"),async(req,res)=>{
    try{
        console.log(req.body)
        console.log(req.files);
        console.log(req.file);
        let sendoffline=new Send_offlineexihibition({...req.body,Image:req.file?.filename})
        
        let response=await sendoffline.save()
        res.json(response)
    }
    catch(e){
        res.json(e.message)
    }
})

router.post('/Sendonline',upload.single("Image"),async(req,res)=>{
    try{
        console.log(req.body)
        console.log(req.files);
        console.log(req.file);
        let sendonline=new Send_onlineexihibition({...req.body,Image:req.file?.filename})
        let response=await sendonline.save()
        res.json(response)
    }
    catch(e){
        res.json(e.message)
    }
})



export default router