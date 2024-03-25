import express from 'express'
import Sub_category from '../models/sub_category.js'
const router=express()

router.post('/addproduct',async(req,res)=>{
    try{
        console.log(req.body)
        let products=new product(req.body)
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