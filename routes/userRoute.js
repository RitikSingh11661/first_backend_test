const {Router} = require('express');
const {UserModel} = require('../models/userModel')
const jwt  = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const userRouter = Router();

userRouter.post('/register',async(req,res)=>{
    console.log('post useRouter worked')
    const {email,username,password,age,location} = req.body;
    const isRegistered =await  UserModel.findOne({email});
    if(!isRegistered){
        bcrypt.hash(password,5, async(err, hash)=>{
            const user = new UserModel({email,username,password:hash,age,location})
            await user.save()
            res.status(200).send({"msg":"register success"});
        });
    }else res.status(400).send({"msg":"User has been already registered with this email"});
})

userRouter.post('/login',async(req,res)=>{
    const {email,password} = req.body;
    const user = await UserModel.findOne({email});
    if(user){
        bcrypt.compare(password,user.password,(err,result)=>{
          result?res.status(200).send({"msg":"login success","token":jwt.sign({userID:user._id},'user')}):res.status(400).send({"msg":"user doesn't exist"});
        })
    }else res.status(400).send({"msg":"user doesn't exist"});
})

module.exports = {userRouter}