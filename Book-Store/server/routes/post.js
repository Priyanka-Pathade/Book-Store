const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requiredLogin = require('../middleware/requiredLogin')
const Post = mongoose.model("Post")
const User = mongoose.model("User")

router.get('/allbooks',requiredLogin,(req,res)=>{
    Post.find()
    .populate("postedBy","_id name email phone")
    .then(posts=>{
        res.json({posts})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.post('/addbook',requiredLogin,(req,res)=>{
    const {title,publication,price,pic,checkfree} = req.body
    console.log(title,publication,price,pic,checkfree)
    // console.log(category,checkfree)
    // console.log(pic)

    if(!title || !publication  || !pic  || !checkfree ){
        return res.status(422).json({error:"please add all the fields"})
    }
    req.user.password = undefined
    const post = new Post({
        title,
        publication,
        Book_photo:pic,
        price,
        checkFree: checkfree,
        postedBy:req.user

    })
    post.save().then(result=>{
        res.json({post:result})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.get('/mybooks',requiredLogin,(req,res)=>{
    Post.find({postedBy:req.user._id})
    .populate("postedBy","_id name")
    .then(mybooks=>{
        res.json({mybooks})
    })
    .catch(err=>{
        consolel.log(err)
    })
})

router.delete('/deletebook/:postId',requiredLogin,(req,res)=>{
    Post.findOne({_id:req.params.postId})
    .populate("postedBy","_id")
    .exec((err,post)=>{
        if(err || !post){
            return res.status(422).json({error:err})
        }
        if(post.postedBy._id.toString() === req.user._id.toString()){
            post.remove()
            .then(result=>{
                res.json({result})
            }).catch(err=>{
                console.log(err)
            })
        }
    })
})

module.exports = router

