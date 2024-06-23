
import express from 'express'
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import path from 'path'
import authRoutes from './Routes/auth.routes.js'
import messageRoutes from './Routes/message.routes.js'
import userRoutes from './Routes/users.routes.js'

import connectToMongoDb from './db/connectToMongo.js';
import {app, server } from './socket/socket.js';


const PORT = process.env.PORT || 5000;

const __dirname=path.resolve();

dotenv.config()


    
// app.use(express.urlencoded());
app.use(express.json());
app.use(cookieParser())

app.use('/api/auth',authRoutes)
app.use('/api/messages',messageRoutes)
app.use('/api/users',userRoutes)

app.use(express.static(path.join(__dirname,"/frontend/dist")));

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,"frontend","dist","index.html"))
})

app.get('/',(req,res)=>{
    res.send('Helosss')
})

server.listen(PORT,()=>{
    connectToMongoDb()
    console.log('Server is  '+PORT)})
