
import { NextFunction,Request,Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { JWT_ADMIN_PASSWORD } from "../config";



export default async function adminAuthMiddleware(req:Request,res:Response,next:NextFunction){

    try {
        const token = req.headers.authorization?.split(' ')[1];
    
        if(!token) {
    
            res.status(403).json({
                message : 'No token found!'
            })
            return;
        }
    
        const decodedPayload =  await jwt.verify(token,JWT_ADMIN_PASSWORD || "" ) as JwtPayload;

        if(!decodedPayload) {
            res.json({
                message : "Invalid token"
            })
        }
        

        req.adminId = decodedPayload.id;
        next();
        
    }
    catch(e){

        res.status(500).json({
            error : e
        })
        return;
    }

}