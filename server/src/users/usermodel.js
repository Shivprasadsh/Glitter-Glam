const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{ type:String, required:true },
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    phonenumber:{type:String,required:true},
    role:{
        type:String,
        default:'user'
    },
    profilImage:String,
    bio:{type:String,maxlength:200},
    profession:String,
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const userModel = new mongoose.model('User',userSchema)

module.exports = userModel