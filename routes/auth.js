import express from 'express'
import  User  from '../models/user.js'
import { upload } from '../multer.js'
const router=express()


router.post('/register',upload.fields([{name:'image'},{name:"idproof"},{name:"artwork"},{name:"Experience"}]),async(req,res)=>{
    try{
        console.log(req.files);
        if(req.files['image']){
            let imagePath=req.files['image'][0].filename
            req.body={...req.body,image:imagePath}
        }
        if(req.files['idproof']){
            let imagePath=req.files['idproof'][0].filename
            req.body={...req.body,idproof:imagePath}
        }
        if(req.files['artwork']){
            let imagePath=req.files['artwork'][0].filename
            req.body={...req.body,artwork:imagePath}
        }
        if(req.files['Experience']){
            let imagePath=req.files['Experience'][0].filename
            req.body={...req.body,Experience:imagePath}
        }         
        const existMail = await User.findOne({ gmail: req.body.gmail });
        if (existMail) {
            return res.status(400).json({ message: 'Mail exists' });
        }
        const existphonenumber = await User.findOne({ phoneNumber: req.body.phoneNumber });
        if (existphonenumber) {
            return res.status(400).json({ message: 'phone number exists' });
        }

        console.log(req.body)
        let newUser=new User(req.body)
        console.log(newUser,'new User');
        let response=await newUser.save()
        res.json(response)
}
catch(e){
    res.json(e.message)
}
})

router.post('/login',async(req,res)=>{
    console.log(req.body);
    const{gmail,password}=req.body
    let users=await User.findOne({gmail:gmail,password:password})
    console.log(users);
    res.json(users)

})

router.get('/viewprofile/:id',async(req,res)=>{
    let id=req.params.id
    console.log(id);
    let response=await User.findById(id)
    console.log(response);
    res.json(response)
})

router.put('/editprofile/:id',upload.fields([{name:'image'},{name:"id_proof"}]),async(req,res)=>{
    console.log(req.files);
    if(req.files!=undefined){

        if(req.files['image']){
            let imagePath=req.files['image'][0].filename
            req.body={...req.body,image:imagePath}
        }
        if(req.files['id_proof']){
            let imagePath=req.files['id_proof'][0].filename
            req.body={...req.body,id_proof:imagePath}
        }
    }
    
    console.log(req.body);
    let id=req.params.id
    // console.log(req.body);
    let response=await User.findByIdAndUpdate(id,req.body)
    console.log(response);
    res.json
})

router.post('/api/auth/authenticate',async (req,res)=>{
    console.log(req.body);
    let response=await  User.findOne(req.body)
    console.log(response);
    res.json(response)

})

export default router