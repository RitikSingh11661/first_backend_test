const express = require('express');
const cors = require('cors');
require('dotenv').config()
const { connection } = require('./db');
const { todosRoute } = require('./routes/todoRoute');
const { userRouter } = require('./routes/userRoute');
const app = express();

app.use(express.json())
app.use(cors())

app.get('/',(req,res)=>{
    res.status(200).send("Homepage")
})

app.use('/user',userRouter)
app.use('/todos',todosRoute)

app.listen(process.env.port,async()=>{
    try {
        await connection;
        console.log('Db connnected')
    } catch (error) {
        console.log('error while connecting db')
    }
    console.log(`Server is live at port ${process.env.port}`);
})