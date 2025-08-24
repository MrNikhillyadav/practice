import { NextFunction,Request,Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { ENV } from "../config/env";

interface CustomRequest extends Request {
    userId?: string; 
}

export default async function authMiddleware(req:CustomRequest,res:Response,next:NextFunction){

    try {
        const token = req.headers.authorization?.split(' ')[1];
    
        if(!token) {
    
            res.status(401).json({
                message : 'No token found!'
            })
            return;
        }
    
        const decodedPayload =  await jwt.verify(token,ENV.JWT_SECRET || "" ) as JwtPayload;

        if(!decodedPayload) {
            res.status(403).json({
                message : "Invalid token"
            })
        }
        

        req.userId = decodedPayload.id;
        next();
        
    }
    catch(e){

        res.status(401).json({
            error : e
        })
        return;
    }

}