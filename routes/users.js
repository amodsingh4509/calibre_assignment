import express from 'express';
import Users from '../models/Users.js';
import jwt from 'jsonwebtoken'
import { verifyAdmin } from '../utils/verifyauth.js';


const routes = express.Router();

routes.post('/new',async (req,res,next)=>{

    try {
        const newuser = await Users.create(req.body);

        const token = jwt.sign({id:newuser._id,role:newuser.role},process.env.TOKEN);
        res.cookie('access_token',token,{httpOnly:true}).status(200).send("User created successfully")
        
    } catch (error) {
        next(error);
    }
})
routes.get('/new', (req,res)=>{
    res.status(200).json({ message: 'New Post' });
})

export default routes;