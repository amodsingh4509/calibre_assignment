import express, { application } from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import tickets from './routes/tickets.js';
import users from './routes/users.js';
import mongoose from 'mongoose';
import morgan from 'morgan'

const app = express();
app.use(cookieParser());
app.use(express.json())
dotenv.config();
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

app.get('/',morgan("combined"),async (req, res)=>{
    res.status(200).send("Api is Working")
})

app.listen(port);