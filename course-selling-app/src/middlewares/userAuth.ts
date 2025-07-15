
import { NextFunction,Request,Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { JWT_USER_PASSWORD } from "../config";



export default async function userAuthMiddleware(req:Request,res:Response,next:NextFunction){

    try {
        const token = req.headers.authorization?.split(' ')[1];
    
        if(!token) {
    
            res.status(403).json({
                message : 'No token found!'
            })
            return;
        }
    
        const decodedPayload =  await jwt.verify(token,JWT_USER_PASSWORD || "" ) as JwtPayload;

        if(!decodedPayload) {
            res.json({
                message : "Invalid token"
            })
        }
        

        req.userId = decodedPayload.id;
        next();
        
    }
    catch (e) {

        res.status(403).json({
            message: 'Authentication as user failed: Invalid or expired token. Please log in again.'
        });
        
        return;
}


}