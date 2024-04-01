import express from 'express'

import Add_product from '../models/add_product.js'
import Sub_category from '../models/sub_category.js'
import { upload } from '../multer.js'
import Exihibition_register from '../models/exihibition_register.js'
import Exihibition_productadd from '../models/exihiition_product_add.js'
import Send_offlineexihibition from '../models/send_offline_exihibition.js'
import User from '../models/user.js'
import Category from '../models/category.js'
import Order from '../models/order.js'
import Send_onlineexihibition from '../models/send_online_exihibition.js'
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

router.get('/viewofflineexihibition/:id',async(req,res)=>{
    let id=req.params.id

    let response=await Send_offlineexihibition.findById(id)
    console.log(response);
    res.json(response)
})

router.get('/viewonlineexihibitions',async(req,res)=>{
    console.log(req.body)
    let response=await Send_onlineexihibition.find()
    console.log(response);
    res.json(response)
})

router.get('/viewonlineexihibitiondetails/:id',async(req,res)=>{
    let id=req.params.id

    let response=await Send_onlineexihibition.findById(id)
    console.log(response);
    res.json(response)

})

router.get('/viewproductorder/:id',async(req,res)=>{
    let id=req.params.id
    let response=await Add_product.find({artistId:id})
    console.log(response);
    let responseData=[]
    for (const prod of response){
        console.log(prod,']]]]]]]]]');
        let orders =await Order.find({productId:prod._id})
        for(let  ord of orders){
            console.log(ord,'orders --------------');
            let user=await User.findById(ord.userId);
        let sub_categories=await Sub_category.findById(prod.sub_categoryid)
        let categories=await Category.findById(sub_categories.categoryid)
        responseData.push({
            users:user,
            sub_categories:sub_categories,
            categories:categories,
            product:prod,
            orders:ord
            
        })
        
    }
    }
    res.json(responseData)
})

router.put('/manageDelivery/:id',async(req,res)=>{
    let id=req.params.id
    console.log(id)
    console.log(req.body)
    let response=await Order.findByIdAndUpdate(id,req.body)
    console.log(response);
})

export default router