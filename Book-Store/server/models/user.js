const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const userschema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    roll:{
        type:Number,
        required:true
    },
    dept:{
        type:String,
        required:true
    },
    year:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    college:{
        type:String,
        required:true
    },
    proof_pic:{
        type:String,
        required:true
    },
    
})

mongoose.model("User",userschema)