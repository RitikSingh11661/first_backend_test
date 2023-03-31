const {Router}= require('express');
const { TodoModel } = require('../models/todoModel');
const {auth} = require('../middlewares/auth')
const jwt = require('jsonwebtoken');
const todosRoute=Router();

todosRoute.get('/',async(req,res)=>{
    const token = req.headers.authorization;
    const decoded = jwt.verify(token,'user');
    console.log('decoded',decoded)
    if(decoded){
        let todos = await TodoModel.find({"userID":decoded.userID});
        res.status(200).send({"data":todos})
    }else res.status(400).send({"msg":"User don't have todos"})
})

todosRoute.get('/:id',async(req,res)=>{
    let todo = await TodoModel.findById(req.params.id)
    res.status(200).send({"data":todo});
})

todosRoute.use(auth);
todosRoute.patch('/update/:id',async(req,res)=>{
    await TodoModel.findByIdAndUpdate({_id:req.params.id},req.body)
    res.status(200).send('updated todo')
})

todosRoute.delete('/delete/:id',async(req,res)=>{
    const token = req.headers.authorization;
    const decoded = jwt.verify(token,'user');
    const todoId = req.params.id;
    const todo = TodoModel.findOne({_id: todoId})
    const req_id = decoded.userID;
    const userID_in_todo = todo.userID
    try {
        if(req_id==userID_in_todo){
            await TodoModel.findByIdAndDelete({_id:todoId})
            res.status(200).send({"msg":"Successfully deleted"})
        }else res.status(400).send({"msg":"Not Authorized"})
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})

todosRoute.post('/add',async(req,res)=>{
    let todo = new TodoModel(req.body);
    console.log('todo',req.body)
    await todo.save();
    res.status(200).send({"msg":"added todo successfully"})
})

module.exports={todosRoute}