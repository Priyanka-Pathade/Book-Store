const express = require('express')
const router = express.Router()
const mongoose  = require('mongoose');
const User = mongoose.model("User")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../key') 
const requiredLogin = require('../middleware/requiredLogin')

router.post('/signup',(req,res)=>{
    const{name,email,password,roll,dept,phone,year,college,photo} = req.body

    console.log({name, email,password,roll,dept,phone,year,college,photo})

    if(!email || !password || !name || !roll || !dept || !phone || !year || !college || !photo){
        return res.status(422).json({error:("Please add all the fields")})
    }
    User.findOne({email:email})
    .then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({error:"User already exists with that email"})
        }
        bcrypt.hash(password,12)
        .then(hashedpassword=>{
            const user = new User({
                email,
                password:hashedpassword,
                name,
                roll,
                dept,
                phone,
                year,
                college,
                proof_pic:photo
            })
            user.save()
            .then(user=>{
                res.json({message:"saved successfully"})
            })
            .catch(err=>{
                console.log(err)
            })
        })
        })
        .catch(err=>{
            console.log(err)
        })
    })

router.post('/login',(req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
      return res.status(422).json({error:"Please add all the fields"})
    }
    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser){
           return res.status(422).json({error:"Invalid email or password"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch){
                // res.json({message:"Successfully signed in"})
                const token = jwt.sign({_id:savedUser._id},JWT_SECRET)
                // console.log({token,_id,name,email})
                const {_id,name,email} = savedUser
                res.json({token, user:{_id,name,email}})
                // res.json({token,user:{_id,name,email,followers,following,pic}})
            }
            else{
                return res.status(422).json({error:"Invalid email or password"})
            }
        })
        .catch(err=>{
            console.log(err)
        })
    })
})
module.exports=router