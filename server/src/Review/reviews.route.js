const express = require('express');
const reviewmodel = require('./reviews.model');
const productmodel = require('../products/products.model');
const router = express.Router();

router.post('/post-review',async (req,res)=>{
    try {
        const {comment,rating,productId,userId} = req.body

        if(!comment||!rating|| !productId||!userId){
            return res.status(400).send({message:'All feild are required'})
        }
        const existingReview = await reviewmodel.findOne({productId,userId})

        if(existingReview){
            existingReview.comment = comment;
            existingReview.rating = rating;
            await existingReview.save();

        }else{
            const newReview = new reviewmodel({
                comment,rating,productId,userId
            })
            await newReview.save();
        }

        const reviews = await reviewmodel.find({productId})
        if(reviews.length >0){
            const totalRating = reviews.reduce((acc,review)=> acc+review.rating,0)
            const averageRating = totalRating /reviews.length
            const product = await productmodel.findById(productId)
            if(product){
                product.rating = averageRating;
                await product.save({validateBeforeSave:false});
            }else{
                return res.status(404).send({message:"Product not found"})
            }
        }
        res.status(200).send({
            message:'Review processed sucessfully',
            reviews:reviews
        })
    } catch (error) {
        console.error("Error post review",error)
        res.status(500).send({message:"failed to post review"})
    }
})

router.get('/totalreview',async(req,res)=>{
    try {
        const totalReviews = await reviewmodel.countDocuments({});
        res.status(200).send(totalReviews)
    } catch (error) {
        console.error("Error geting total review",error)
        res.status(500).send({message:"failed to get totalcount review"})
    }
})

router.get('/userId',async(req,res)=>{
    const {userId} = req.params
    if(!userId){
        return res.status(400).send({message:'User is required'})
    }
    try {
        const reviews = await reviewmodel.find({userId:userId}).sort({createAt:-1})
        if(reviews.length === 0){
            return res.status(404).send({message:'revirew not found'})
        }
        res.status(200).send(reviews)
    } catch (error) {
        console.error("Error geting user review",error)
        res.status(500).send({message:"failed getting user review"})
    }
})


module.exports = router