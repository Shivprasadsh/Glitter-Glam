const express = require('express');
const productmodel = require('./products.model');
const reviewmodel = require('../Review/reviews.model');
const verifyToken = require('../middleware/verifytoken');
const verifyAdmin = require('../middleware/verifyamin');
const router = express.Router();

//post a product

router.post('/create-product',async (req,res)=>{
    try {
        const newProduct = new productmodel({
            ...req.body
        })
        const saveProduct = await newProduct.save()
        const reviews = await reviewmodel.find({productId:saveProduct._id})
        if(reviews.length >0){
            const totalrating =reviews.reduce((acc,review)=>{
                acc+review.rating,0
            })
            const averageRating = totalRating / reviews.length;
            saveProduct.rating = averageRating;
            await saveProduct.save()
        }
        res.status(201).send(saveProduct)
    } catch (error) {
        console.error("Error creating new product",erro)
        res.status(500).send({message:"Error crating new product",error})
    }
})

router.get('/',async(req,res)=>{
  try {
    const {category,color,minPrice,maxPrice,page=1,limit=10}=req.query
    let filter = {};
    if(category && category!=="all"){
        filter.category = category
    }

    if(color && color!=="all"){
        filter.color = color
    }
    if(minPrice && maxPrice){
        const min = parseFloat(minPrice);
        const max = parseFloat(maxPrice)
        if(!isNaN(min)&& !isNaN(max)){
            filter.price = {$gte:min,$lte:max}
        }
    }
    const skip = (parseInt(page)-1 )*parseInt(limit)
    const totalProduct = await productmodel.countDocuments(filter)
    const totalPage = Math.ceil(totalProduct/parseInt(limit))
    const products = await productmodel.find(filter)
                                       .skip(skip)
                                       .limit(parseInt(limit))
                                       .populate("author","email")
                                       .sort({createAt:-1})
    res.status(200).send({products,totalPage,totalProduct})
  } catch (error) {
    console.error("Error fetching  product",erro)
        res.status(500).send({message:"Error fetching product",error})
  }
})

router.get('/:id',async (req,res)=>{
    try {
        const productId = req.params.id;
        const product = await productmodel.findById(productId).populate("author","email username")
        if(!product){
            return res.status(404).send({message:"product not found"})

        } 
        const review = await reviewmodel.find({productId}).populate("userId","username email")
        res.status(200).send({product,review})
    } catch (error) {
        console.error("Error fetching single  product",error)
        res.status(500).send({message:"Error fetching single product",error})
    }
})

//update product 
router.patch("/update-product/:id",verifyToken,verifyAdmin, async (req,res)=>{
    try {
        const productId = req.params.id;
        const updatedProduct =await productmodel.findByIdAndUpdate(productId,{...req.body},{new:true})
       
        if(!updatedProduct){
            return res.status(404).send({message:"product not found"})
        }
    } catch (error) {
        console.error("Error updating  product",erro)
        res.status(500).send({message:"Error update product",error})
    }
})

//delete product

router.delete('/:id',async(req,res)=>{
    try {
       const produrId = req.params.id;
       const deleteProduct = await productmodel.findByIdAndDelete(productId)

       if(!deleteProduct){
        return res.status(404).send({message:"product not found"})
       }
       await reviewmodel.deleteMany({productId:productId})
       res.status(200).send({message:"delete sucessfully"})
    } catch (error) {
        console.error("Error delecting  product",erro)
        res.status(500).send({message:"Error delecting product",error})
    }
})

//get related product
router.get("/related/:id",async (req,res)=>{
    try {
        const {id} = req.params;
        if(!id){
           return res.status(400).send({message:'product not provided'}) 
        }
        const product = await productmodel.findById(id)
        if(!product){
            return res.status(400).send({message:'product not found'}) 
         }
         const titleRegex = new RegExp(
            product.name.split(" ").filter((word)=>word.length > 1).join("|"),"i"
           
         )
         const relatedProducts = await productmodel.find({
            _id:{$ne:id},
            $or:[
                
                    {name:{$regex:titleRegex}},
                    {category:product.category}


            ],
         })
         res.status(200).send(relatedProducts)
    } catch (error) {
        res.status(500).send({message:'Failed to get related product',error})
    }
})

module.exports = router