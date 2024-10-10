const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    Comment:{type:String,required:true},
    rating:{type:Number,required:true},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    productId:{type:mongoose.Schema.Types.ObjectId,ref:"Product",required:true}
},{timestamps:true})

const reviewmodel = mongoose.model("review",reviewSchema)

module.exports = reviewmodel