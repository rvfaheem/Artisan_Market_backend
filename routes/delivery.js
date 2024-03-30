import express, { response } from 'express'

import Order from '../models/order.js'
import User from '../models/user.js'

const router=express()

router.get('/viewproductorder/:id',async(req,res)=>{
    let id=req.params.id
    let orders =await Order.find({deliveryId:id})
    let responseData=[]
    for(let ord of orders){
        console.log(ord,'orders----');
        let user=await User.findById(ord.userId)
        responseData.push({
            order:ord,
            users:user,
        })
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