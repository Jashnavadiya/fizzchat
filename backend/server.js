
import express from 'express'
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import authRoutes from './Routes/auth.routes.js'
import messageRoutes from './Routes/message.routes.js'
import userRoutes from './Routes/users.routes.js'

import connectToMongoDb from './db/ConnectToMongo.js';

const app=express();
const PORT = process.env.PORT || 5000;

dotenv.config()


    
// app.use(express.urlencoded());
app.use(express.json());
app.use(cookieParser())

app.use('/api/auth',authRoutes)
app.use('/api/messages',messageRoutes)
app.use('/api/users',userRoutes)


app.get('/',(req,res)=>{
    res.send('Helosss')
})

app.listen(PORT,()=>{
    connectToMongoDb()
    console.log('Server is  '+PORT)})