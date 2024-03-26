import express from 'express'
import Create_exihibition from '../models/create_exihibition.js'


const router=express()

router.post('/createexihibition',async(req,res)=>{
    try{
        console.log(req.body)
        let exihibition=new Create_exihibition(req.body)
        let response=await exihibition.save()
        res.json(response)
    }
    catch(e){
        res.json(e.message)
    }
})



export default router