import express from 'express'

import Add_product from '../models/add_product.js'
import Sub_category from '../models/sub_category.js'
import { upload } from '../multer.js'
import Exihibition_register from '../models/exihibition_register.js'
import Exihibition_productadd from '../models/exihiition_product_add.js'
import Send_offlineexihibition from '../models/send_offline_exihibition.js'
const router=express()

router.post('/addproduct',upload.single("Image"),async(req,res)=>{
    try{
        console.log(req.body)
        console.log(req.files);
        console.log(req.file);
        let products=new Add_product({...req.body,Image:req.file?.filename})
        let response=await products.save()
        res.json(response)
    }
    catch(e){
        res.json(e.message)
    }
})

router.get('/viewsubcategory/:id',async(req,res)=>{
    let id=req.params.id
    console.log(id);
    let response=await Sub_category.find({categoryid:id})
    console.log(response);
    res.json(response)
})

router.post

router.post('/exihibitionregister',upload.single("Image"),async(req,res)=>{
    try{
        console.log(req.body)
        console.log(req.files);
        console.log(req.file);
        let exihibitions=new Exihibition_register({...req.body,Image:req.file?.filename})
        let response=await exihibitions.save()
        res.json(response)
    }
    catch(e){
        res.json(e.message)
    }
})

router.post('/exihibitionproductadd',upload.single("Image"),async(req,res)=>{
    try{
        console.log(req.body)
        console.log(req.files);
        console.log(req.file);
        let exihibition_productadd=new Exihibition_productadd({...req.body,Image:req.file?.filename})
        
        let response=await exihibition_productadd.save()
        res.json(response)
    }
    catch(e){
        res.json(e.message)
    }
})

// router.get('/viewofflineexihibitions/:id',async(req,res)=>{
//     let id=req.params.id
//     let response=await Send_offlineexihibition.findById(id)
//     console.log(response);
//     res.json(response)
// })

router.get('/viewofflineexihibitions',async(req,res)=>{
    console.log(req.body)
    let response =await Send_offlineexihibition.find()
    console.log(response)
    res.json(response)
})

export default router