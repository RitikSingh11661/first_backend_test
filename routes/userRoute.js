const {Router} = require('express');
const {UserModel} = require('../models/userModel')
const jwt  = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const userRouter = Router();

userRouter.post('/register',async(req,res)=>{
    const {email,username,password} = req.body;
    console.log('email',email)
    if(!email || !username || !password){
        res.status(400).send({"msg":"not present details"})
    }
    try {
        if(email && username && password){
            const preCheck = await UserModel.findOne({ email });
                if (!preCheck) {
                    const hashedPassword = await bcrypt.hash(password, 7);
                    const newUser = new UserModel({ ...req.body, password: hashedPassword });
                    await newUser.save();
                    res.status(200).send({ msg: "User has been registered", status: "success" });
                } else {
                    res.status(400).send({ msg: "User already registered" })
                }
            } else {
                res.status(400).send({ msg: "Invalid data format" })
            }
    } catch (e) {
        res.status(400).send({ msg: e.message });
    }
})

userRouter.post('/login',async(req,res)=>{
    const {email,password} = req.body;
    console.log('email',email)
    try {
        if(email && password){
            const user = await UserModel.findOne({ email })
            if(user){
                const hashCheck = await bcrypt.compare(password, user.password);
                const token = jwt.sign({ "userId": user._id }, "decordash", { expiresIn: "1h" });
                if (hashCheck) {
                    res.status(200).send({ msg: "User logged in", status: "success", token });
                } else {
                    res.status(400).send({ msg: "Invalid password" });
                }
            } else {
                res.status(400).send({ msg: "User not found" });
            }
        } else {
            res.status(400).send({ msg: "Invalid data format" });
        }
    } catch (e) {
        res.status(400).send({ msg: e.message });
    }
})

module.exports = {userRouter}