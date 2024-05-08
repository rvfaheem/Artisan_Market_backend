import express, { response } from 'express'

import Order from '../models/order.js'
import User from '../models/user.js'
import Exihibitionorders from '../models/exihibition_orders.js'
import Add_product from '../models/add_product.js'
import Exihibition_productadd from '../models/exihiition_product_add.js'

const router=express()

router.get('/viewproductorder/:id',async(req,res)=>{
    let id=req.params.id
    let orders =await Order.find({deliveryId:id})
    
    
    let responseData=[]
    for(let ord of orders){
        console.log(ord,'orders----');
        let user=await User.findById(ord.userId)
        let product=await Add_product.findById(ord.productId)
        responseData.push({
            order:ord,
            users:user,
            product:product,
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

router.get('/exhiviewproductorder/:id',async(req,res)=>{
    let id=req.params.id
    let orders =await Exihibitionorders.find({deliveryId:id})
    console.log(orders,'iuygtfds')
    let responseData=[]
    for(let ord of orders){
        console.log(ord,'orders----');
        let user=await User.findById(ord.userId)
        let product=await Exihibition_productadd.findById(ord.productId)
        responseData.push({
            order:ord,
            users:user,
            product:product,
        })
    }
    
res.json(responseData)
})

router.put('/exhimanageDelivery/:id',async(req,res)=>{
    let id=req.params.id
    console.log(id)
    console.log(req.body)
    let response=await Exihibitionorders.findByIdAndUpdate(id,req.body)
    console.log(response);
})


export default router