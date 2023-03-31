const {Router}= require('express');
const { TodoModel } = require('../models/todoModel');
const todosRoute=Router();

todosRoute.get('/',async(req,res)=>{
    const userId = req.body.userId;
    try{
        let todos = await TodoModel.find({"userId":userId});
        if(todos)res.status(200).send({"data":todos});
        else res.status(400).send({"msg":"User don't have todos"})
    }catch (e){
        res.status(400).send({"msg":e.message})
    } 
})

todosRoute.get('/:id',async(req,res)=>{
    try {
        let todo = await TodoModel.findById(req.params.id)
        res.status(200).send({"data":todo});      
    } catch (e) {
        res.status(400).send({"msg":e.message});     
    }
})

todosRoute.patch('/update/:id',async(req,res)=>{
    try {
        await TodoModel.findByIdAndUpdate({_id:req.params.id},req.body)
        res.status(200).send('updated todo')
    } catch (e) {
        res.status(400).send({"msg":e.message});
    }
})

todosRoute.patch('/toggle/:id',async(req,res)=>{
    try {
        let doc = await TodoModel.findById(req.params.id);
        let todo={...doc};
        todo.status=!todo.status;
        console.log('todo',todo)
        await TodoModel.findByIdAndUpdate({_id:req.params.id},todo);
        res.status(200).send('updated todo')
    } catch (e) {
        res.status(400).send({"msg":e.message});
    }
})

todosRoute.delete('/delete/:id',async(req,res)=>{
    const todoId = req.params.id;
    try {
    const todo = TodoModel.findOne({_id: todoId})
        if(req.body.userID==todo.userID){
            await TodoModel.findByIdAndDelete({_id:todoId})
            res.status(200).send({"msg":"Successfully deleted"})
        }else res.status(400).send({"msg":"Not Authorized"})
    } catch (e) {
        res.status(400).send({"msg":e.message})
    }
})

todosRoute.post('/add',async(req,res)=>{
    console.log('req.body in adding',req.body)
    try {
        let todo = new TodoModel({...req.body,status:false});
        await todo.save();
        res.status(200).send({"msg":"added todo successfully"})      
    } catch (e) {
        res.status(400).send({"msg":e.message})
    }
})

module.exports={todosRoute}