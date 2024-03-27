import express from 'express'
import User from './user.js';
import Payment from '../models/payment.js';
import { upload } from '../multer.js';
import Add_product from '../models/add_product.js';
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

export default router