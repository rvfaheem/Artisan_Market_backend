import express from 'express'
const router=express()
import Category from '../models/category.js'
import Sub_category from '../models/sub_category.js'
import User from '../models/user.js'


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

router.get('/viewuserorganiser',async(req,res)=>{
    let response=await User.find({userType:'organiser'})
    console.log(response)
    res.json(response)
})
router.get('/viewuserartist',async(req,res)=>{
    let response=await User.find({userType:'artist'})
    console.log(response)
    res.json(response)
})
router.get('/viewuserdelivery',async(req,res)=>{
    let response=await User.find({userType:'delivery'})
    console.log(response)
    res.json(response)
})

router.put('/manageUser/:id',async(req,res)=>{
    let id=req.params.id
    console.log(id)
    console.log(req.body)
    let response=await User.findByIdAndUpdate(id,req.body)
    console.log(response);

})

router.get('/viewsubcategory',async(req,res)=>{

    let response=await Sub_category.find()
    let responseData=[]
    for(let x of response ){
        let cat=await Category.findById(x.categoryid)
        responseData.push({
        category:x,
        subcategory:cat,  
        })
    }
    
    res.json(responseData)
})

router.put('/editcategory/:id',async(req,res)=>{
    let id=req.params.id
    console.log(id,'in cat');
    let response=await Category.findByIdAndUpdate(id,req.body)
    console.log(response)
    res.json(response)
})

router.put('/editsubcategory/:id',async(req,res)=>{
    let id=req.params.id
    console.log(id,'in subcat');

    let response=await Sub_category.findByIdAndUpdate(id,req.body)
    console.log(response)
    res.json(response)
})

//view exihibition

router.get('/viewexihibitions/:id',async(req,res)=>{
    let id=req.params.id
    console.log(req.body)
    let response=await Create_exihibition.find({organisationId:id})
    console.log(response);
    res.json(response)
})


export default router