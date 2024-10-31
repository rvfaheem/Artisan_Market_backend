import express from 'express'
const router=express()
import Category from '../models/category.js'
import Sub_category from '../models/sub_category.js'
import User from '../models/user.js'
import Create_exihibition from '../models/create_exihibition.js'
import Exihibition_register from '../models/exihibition_register.js'


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

// router.get('/viewuserorganiserexihibition',async(req,res)=>{
//     let response=await User.find({userType:'organiser'})
//     let response2=await Create_exihibition()
//     let response3=await Exihibition_register()

//     console.log(response)
//     res.json(response)
//     console.log(response2)
//     res.json(response2)
//     console.log(response3)
//     res.json(response3)
// })

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
    let response=await User.findByIdAndUpdate(id,req.body,{new:true})
    console.log(response);

})

// router.get('/viewsubcategory',async(req,res)=>{

//     let response=await Sub_category.find()
//     let responseData=[]
//     for(let x of response ){
//         let cat=await Category.findById(x.categoryid)
//         responseData.push({
//         category:x,
//         subcategory:cat,  
//         })
//     }
    
//     res.json(responseData)
// })

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

// view exihibition

// router.get('/viewexihibitions/:id',async(req,res)=>{
//     let id=req.params.id
//     console.log(id,'aaa')
//     let response=await User.findById(userType:organiser);
//     let response=await User.findById();
//     let response=await User.findById();
//    res.json({message:"skjdsdkhflsdj"})
// })

//edited

// view exihibition

router.get('/viewexihibitions', async (req, res) => {
    try {
        // Fetch all exhibitions and populate the organization details
        let exhibitions = await Create_exihibition.find().populate("organisationId");

        // Fetch all registered products and populate the exhibition details
        let registeredProducts = await Exihibition_register.find().populate("exihibitionid");

        // Map products to each exhibition based on matching exhibition IDs
        const exhibitionsWithProducts = exhibitions.map(exhibition => {
            // Filter products that match the current exhibition's ID
            const productsForExhibition = registeredProducts
                .filter(product => product.exihibitionid && product.exihibitionid.equals(exhibition._id))
                .map(product => ({
                    productName: product.productName,
                    category: product.category,
                    artistName: product.name,
                    _id: product._id,
                }));

            return {
                ...exhibition.toObject(),
                products: productsForExhibition // Attach products to each exhibition
            };
        });

        // Respond with the exhibitions, each containing its respective products
        res.json({ resposne: exhibitionsWithProducts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error occurred." });
    }
});



//delete category and sub category

// Delete category
router.delete('/deletecategory/:cid', async (req, res) => {
    try {
        const categoryId = req.params.cid;
        await Category.findByIdAndDelete(categoryId);
        res.json({ message: 'Category deleted successfully' });
    } catch (error) {
        console.error('Error deleting category:', error);
        res.status(500).json({ error: 'Server error occurred while deleting category.' });
    }
});

// Delete subcategory
router.delete('/deletesubcategory/:sid', async (req, res) => {
    try {
        const subcategoryId = req.params.sid;
        await Sub_category.findByIdAndDelete(subcategoryId);
        res.json({ message: 'Subcategory deleted successfully' });
    } catch (error) {
        console.error('Error deleting subcategory:', error);
        res.status(500).json({ error: 'Server error occurred while deleting subcategory.' });
    }
});


// Adjusted API code to group subcategories under their categories
router.get('/viewsubcategory', async (req, res) => {
    try {
        const categories = await Category.find(); // Fetch all categories
        const responseData = [];

        for (let cat of categories) {
            // Fetch subcategories that belong to this category
            const subcategories = await Sub_category.find({ categoryid: cat._id });
            responseData.push({
                category: cat,
                subcategories: subcategories
            });
        }

        res.json(responseData);
    } catch (error) {
        console.error("Error fetching categories and subcategories:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

//end


export default router