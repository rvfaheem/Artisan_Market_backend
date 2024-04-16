import express from 'express'

import Add_product from '../models/add_product.js'
import Sub_category from '../models/sub_category.js'
import { upload } from '../multer.js'
import Exihibition_register from '../models/exihibition_register.js'

import Send_offlineexihibition from '../models/send_offline_exihibition.js'
import User from '../models/user.js'
import Category from '../models/category.js'
import Order from '../models/order.js'
import Send_onlineexihibition from '../models/send_online_exihibition.js'
import Create_exihibition from '../models/create_exihibition.js'
// import Exihibition_productadd from '../models/exihiition_product_add.js'
import Exihibitionorders from '../models/exihibition_orders.js'
import Exihibition_productadd from '../models/exihiition_product_add.js'
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

router.post('/exihibitionregister',upload.single("image"),async(req,res)=>{
    try{
        console.log(req.body)
        console.log(req.files);
        console.log(req.file);
        let exihibitions=new Exihibition_register({...req.body,image:req.file?.filename})
        let response=await exihibitions.save()
        res.json(response)
    }
    catch(e){
        res.json(e.message)
    }
})

router.post('/exihibitionproductadd',upload.single("image"),async(req,res)=>{
    try{
        console.log(req.body)
        console.log(req.files);
        console.log(req.file);
        let exihibition_productadd=new Exihibition_productadd({...req.body,image:req.file?.filename})
        
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

// router.get('/viewonlineexihibitions',async(req,res)=>{
//     console.log(req.body)
//     let response=await Send_onlineexihibition.find()
//     console.log(response);
//     res.json(response)
// })

// router.get('/viewonlineexihibitiondetails/:id',async(req,res)=>{
//     let id=req.params.id

//     let response=await Send_onlineexihibition.findById(id)
//     console.log(response);
//     res.json(response)

// })

router.get('/viewproductorder/:id',async(req,res)=>{
    let id=req.params.id
    let response=await Add_product.find({artistId:id})
    console.log(response,'+++++');
    let responseData=[]
    for (const prod of response){
        console.log(prod._id,']]]]]]]]]');
        let orders =await Order.find({productId:prod._id})
        console.log(orders,'/////')
        for(let  ord of orders){
            console.log(ord,'orders ++++++++++++');
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

router.get('/viewexihibitionregister/:id',async(req,res)=>{
    console.log(req.body)
    let id=req.params.id
    let response=await Exihibition_register.find({userid:id,status:'accept'})
   let responseData=[]
    for( let x of response ){
        let exhibitions=await Create_exihibition.findById(x.exihibitionid)
        let org=await User.findById(exhibitions?.organisationId)
        responseData.push({
            registeration:x,
            exhibition:exhibitions,
            organisers:org
        })
    }

    console.log(response);
    res.json(responseData)
})

router.get('/viewonlineexihibitions',async(req,res)=>{
    console.log(req.body)
    let response=await Create_exihibition.find()
    console.log(response);
    res.json(response)
})

router.get('/viewonlineexihibitiondetails/:id',async(req,res)=>{
    let id=req.params.id

    let response=await Create_exihibition.findById(id)
    console.log(response);
    res.json(response)

})

router.get('/Viewaddedproducts/:id',async(req,res)=>{
    let id=req.params.id
    let response=await Add_product.find({artistId:id})
    console.log(response);
    let responsedata=[]
    for(const response1 of response){
        let subcategory=await Sub_category.findById(response1.sub_categoryid)
        console.log(subcategory);
        let category=await Category.findById(subcategory.categoryid)
        console.log(category);

        responsedata.push({
            subcategory:subcategory,
            category:category,
            product:response1
            
        })
    }
    res.json(responsedata)
    // let responsea=await Add_product.find()
    // console.log(response)
    // res.json(response)
})


router.get('/Vieweditaddedproducts/:id',async(req,res)=>{
    let id=req.params.id
    let response=await Add_product.findById(id)
    console.log(response);

    let responsedata=[]
    
        let subcategory=await Sub_category.findById(response.sub_categoryid)
        console.log(subcategory);
        let category=await Category.findById(subcategory.categoryid)
        console.log(category);

        responsedata.push({
            subcategory:subcategory,
            category:category,
            product:response
        })
    
 
        res.json(responsedata)
    }
    
    // let responsea=await Add_product.find()
    // console.log(response)
    // res.json(response)
)

// router.get('/vieweditproduct/:id',async(req,res)=>{
//     let id=req.params.id

//     let response=await Add_product.findById(id)
//     console.log(response);
//     res.json(response)

// })

router.put('/editaddproduct/:id',upload.fields([{name:'Image'}]),async(req,res)=>{
    if(req.files['Image']){
        let imagePath=req.files['Image'][0].filename
        req.body={...req.body,Image:imagePath}
    }
   
    console.log(req.body);
    let id=req.params.id
    // console.log(req.body);
    let response=await Add_product.findByIdAndUpdate(id,req.body)
    console.log(response);
})

router.delete('/deleteproduct/:id',async(req,res)=>{
    let id=req.params.id
    let response=await Add_product.findByIdAndDelete(id)
})

router.get('/viewexihibitionorder/:id',async(req,res)=>{
    let id=req.params.id
    let response=await Exihibitionorders.find({userId:id})
    console.log(response,'+++++');
    let responseData=[]
    for (const order of response){
        console.log(order._id,'000')
        let product=await Exihibition_productadd.findById(order.productId)
        let exhibition=await Create_exihibition.findById(product.exihibitionid)
        console.log(product,'6666666')

    let sub_categories=await Sub_category.findById(product.sub_categoryid)
    let categories=await Category.findById(sub_categories.categoryid)
    responseData.push({
        product:product,
            sub_categories:sub_categories,
            categories:categories,
            exhibition:exhibition
        })
    
    }



    
    res.json(responseData)
    
})

router.get('/viewupdateexihibition/:id',async(req,res)=>{
    let id=req.params.id
    let response=await Create_exihibition.findById(id)
    console.log(response);
    res.json(response)
})

export default router