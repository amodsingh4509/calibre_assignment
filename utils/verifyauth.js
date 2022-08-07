import jwt from 'jsonwebtoken';
import { createError } from './error.js';

export const verifytoken =(req,res,next)=>{

    const token = req.cookies.access_token;

    if(!token)
       return next(createError(403,'Token not found'));
    jwt.verify(token,process.env.TOKEN,(err,user)=>{
        if(err)
            return next(createError(403,'Unauthorized token'));
        req.user = user;
        next();
    })
}

export const verifyAdmin = (req, res, next) => {
    verifytoken(req, res, next,()=>{
        if(req.user.admin === "admin"){
            next();
        }
        else{
            next(createError(403,'Invalid User'));
        }
    });
}