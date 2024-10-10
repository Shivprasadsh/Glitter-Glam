const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type:String,required:true
    },
    category:String,
    description:String,
    price:{
        type:Number,required:true
    },
    oldPrice:Number,
    image:String,
    color:String,
    rating:{
        type:Number,default:0
    },
    author:{type:mongoose.Types.ObjectId,ref:"User",required:true}
})

const productmodel = mongoose.model("product",productSchema)

module.exports = productmodel