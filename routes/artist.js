import express from 'express'

import Add_product from '../models/add_product.js'
import Sub_category from '../models/sub_category.js'
import { upload } from '../multer.js'
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

export default router