const mongoose  = require('mongoose');
const {ObjectId} = mongoose.Schema.Types

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    publication:{
        type:String,
        required:true
    },
    price:{
        type:Number,
    },
    // category:{
    //     type:String,
    //     required:true
    // },
    checkFree:{
        type:String,
        required:true
    },
    Book_photo:{
        type:String,
        required:true
    },
    postedBy:{
        type:ObjectId,
        ref:"User"
    }
})

mongoose.model("Post",postSchema)