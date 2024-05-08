import express from 'express'
import User from './user.js';
import Payment from '../models/payment.js';
import { upload } from '../multer.js';
import Add_product from '../models/add_product.js';
import Order from '../models/order.js';
import Sub_category from '../models/sub_category.js';
import Category from '../models/category.js';
import Exihibition_productadd from '../models/exihiition_product_add.js';
import Create_exihibition from '../models/create_exihibition.js';
import Exihibitionorders from '../models/exihibition_orders.js';
import Send_offlineexihibition from '../models/send_offline_exihibition.js';

const router=express()

router.post('/payment',async(req,res)=>{
    try{
        console.log(req.body)
        let payments=new Payment(req.body)
        let response=await payments.save()
        res.json(response)
    }
    catch(e){
        res.json(e.message)
    }
})

router.get('/viewproduct',async(req,res)=>{

    let response=await Add_product.aggregate([
        {
            $lookup:{
                from:"sub_categories",
                foreignField:"_id",
                localField:"sub_categoryid",
                as:"sub_category"
            }
        },
        {
            $unwind: "$sub_category"
        },
        {
            $match: {
                status: "forsale" // Assuming 'status' is the field name
            }
        }

    ])


    console.log(response);
    res.json(response)

})

router.get('/viewproductdetails/:id',async(req,res)=>{
    let id=req.params.id

    let response=await Add_product.findById(id)
    console.log(response);
    res.json(response)
})

router.post('/addorder',async(req,res)=>{
    // let id=req.params.id
    console.log(req.body);
    let newOrder=await Order(req.body)
    let response1=await Add_product.findByIdAndUpdate(req.body.productId,{status:'sold'})
    let response=await newOrder.save()
    console.log(response)
    res.json(response)
})

router.get('/vieworders/:id',async(req,res)=>{
    let id=req.params.id
    let response=await Order.find({userId:id})
    console.log(response);
    let responsedata=[]
    for (const newresponse of response){
        console.log(newresponse.productId,'sdsdsf');
        let products=await Add_product.findById(newresponse.productId)
        console.log(products,'-==-=-=-=-=-=-=-=-=-=-=-=-');
        if(products){


            let subcategory=await Sub_category.findById(products.sub_categoryid)
            console.log(subcategory,'[[[[[[[[[[[');
            let category=await Category.findById(subcategory.categoryid)
            console.log(category);
            
            // let user=await  User.findById(newresponse.userId)
            responsedata.push({
                product:products,
                order:newresponse,
                subcategory:subcategory,
                category:category
                
            })
        }

    }

    res.json(responsedata)


    
})

// router.get('/vieworders',async(req,res)=>{
//     let response=await Add_product.find()
//     console.log(response)
//     res.json(response)
// })


// router.get('/viewexihibitionproduct',async(req,res)=>{

//     let response=await Exihibition_productadd.aggregate([
//         {
//             $lookup:{
//                 from:"sub_categories",
//                 foreignField:"_id",
//                 localField:"sub_categoryid",
//                 as:"sub_category"
//             }
//         },
//         {
//             $unwind: "$sub_category"
//         },

//     ])


//     console.log(response);
//     res.json(response)

// })

router.get('/viewexihibitionproductdetails/:id',async(req,res)=>{
    let id=req.params.id

    let response=await Exihibition_productadd.findById(id)
    console.log(response);
    res.json(response)
})

// router.get('/viewexihibitionproduct1',async(req,res)=>{

//     let response=await Exihibition_productadd.find()
//     console.log(response);
//     res.json(response)
// })

router.get('/online_noti_exihi/:id',async(req,res)=>{
    let id=req.params.id
    let response=await Create_exihibition.findById(id)
    console.log(response)
    res.json(response)

})

router.get('/viewsubcategorywiseproducts/:id',async(req,res)=>{
    let id=req.params.id

    let response=await Add_product.find({sub_categoryid:id})
    console.log(response)
    res.json(response)
})

router.get('/viewonlineexihibitiondetailsuser/:id',async(req,res)=>{
    let id=req.params.id

    let response=await Create_exihibition.findById(id)
    console.log(response);
    res.json(response)

})

// router.get('/viewexihibitionproductlt',async(req,res)=>{

//     const currentDate = new Date();
//     console.log(currentDate);
//     let response = await Exihibition_productadd.find({ enddate: { $lt: currentDate } });
//     console.log(response);
//     res.json(response)
// })

// router.get('/viewexihibitionproductgt',async(req,res)=>{

//     const currentDate = new Date();
//     let response = await Exihibition_productadd.find({ enddate: { $gt: currentDate } });
//     console.log(response);
//     res.json(response)
// })

router.get('/viewexihibitionproduct1/:id',async(req,res)=>{
    let id=req.params.id

    // let response2=await Create_exihibition.find()
    // console.log(response2)

    let response=await Exihibition_productadd.find({exihibitionid:id,status:'forsale'})
    console.log(response,'--------------');

    let responsedata=[]
    for(const response1 of response){
        let subcategory=await Sub_category.findById(response1.sub_categoryid)
        
        console.log(subcategory,'---------------------------');

        let category=await Category.findById(subcategory.categoryid)
        console.log(category,'===========================');
        
        responsedata.push({
            subcategory:subcategory,
            category:category,
            product:response1,
            // abc:response2,
            
        },
    ),
        {
            $match: {
                status: "forsale" // Assuming 'status' is the field name
            }
        }

    
    }
    console.log(responsedata);
    res.json(responsedata)
})

router.post('/exihiaddorder',async(req,res)=>{
    console.log(req.body);
    let newOrder=await Exihibitionorders(req.body)
    let response1=await Exihibition_productadd.findByIdAndUpdate(req.body.productId,{status:'sold'})
    let response=await newOrder.save()
    console.log(response)
    res.json(response)
})

router.put('/sendfeedback/:id',async(req,res)=>{
    let id=req.params.id
    let response=await Order.findByIdAndUpdate(id,req.body)

    console.log(response)
    res.json(response)
})

router.get('/viewoflinexihibitiondetailsuser/:id',async(req,res)=>{
    let id=req.params.id

    let response=await Send_offlineexihibition.findById(id)
    console.log(response);
    res.json(response)

})

router.get('/exihivieworders/:id',async(req,res)=>{
    let id=req.params.id
    let response=await Exihibitionorders.find({userId:id})
    console.log(response);
    let responsedata=[]
    for (const newresponse of response){
        console.log(newresponse.productId,'sdsdsf');
        let products=await Exihibition_productadd.findById(newresponse.productId)
        console.log(products,'-==-=-=-=-=-=-=-=-=-=-=-=-');
        if(products){


            let subcategory=await Sub_category.findById(products.sub_categoryid)
            console.log(subcategory,'[[[[[[[[[[[');
            let category=await Category.findById(subcategory.categoryid)
            console.log(category);
            
            // let user=await  User.findById(newresponse.userId)
            responsedata.push({
                product:products,
                order:newresponse,
                subcategory:subcategory,
                category:category
                
            })
        }

    }

    res.json(responsedata)


    
})

export default router