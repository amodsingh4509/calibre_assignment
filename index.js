import express, { application } from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import tickets from './routes/tickets.js';
import users from './routes/users.js';
import mongoose from 'mongoose';
import morgan from 'morgan'
import fs from 'fs';


const app = express();
app.use(cookieParser());
app.use(express.json())
dotenv.config();

var accessLogStream = fs.createWriteStream('./access.log', {flags: 'a'})

// setup the logger
app.use(morgan('combined', { stream: accessLogStream }))

const port = process.env.PORT || 8000;

const connect = async()=>{
    try {
         await mongoose.connect(process.env.MONGO_URL);
         console.log('Connected to MongoDB');
        
    } catch (error) {
        throw error;
    }
   
}
connect();
mongoose.connection.on("disconnect", () => {
    console.log('Disconnected from MongoDB');
})

mongoose.connection.once("connected", () => {
    console.log('Connected to MongoDB');
})

app.use('/users',users);
app.use('/tickets', tickets);

app.get('/',async (req, res)=>{
    res.status(200).send("Api is Working")
})
app.use((err,req,res,next) => {
    const errstatus = err.status || 500;
    const errmsg = err.message || "Something went wrong";
    return res.status(errstatus).json({
        sucess:false,
        status:errstatus,
        message:errmsg,
    })

})
app.listen(port);