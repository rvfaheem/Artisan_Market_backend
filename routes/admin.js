import express from 'express'
const router=express()
import Category from '../models/category.js'
import Sub_category from '../models/sub_category.js'

router.post('/addcategory',async(req,res)=>{
    try{
        console.log(req.body)
        let categories=new Category(req.body)
        let response=await categories.save()
        res.json(response)
    }
    catch(e){
        res.json(e.message)
    }
})

router.post('/addsubcategory',async(req,res)=>{
    try{
        console.log(req.body)
        let subcategories=new Sub_category(req.body)
        let response=await subcategories.save()
        res.json(response)
    }
    catch(e){
        res.json(e.message)
    }
})

router.get('/viewcategory',async(req,res)=>{

    let response=await Category.find()
    console.log(response);
    res.json(response)
})




export default router