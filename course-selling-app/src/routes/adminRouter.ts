import { Request, Response, Router } from "express";
import { AdminModel } from "../models/models";
import bcrypt from 'bcrypt'
import jwt  from "jsonwebtoken";
import { JWT_ADMIN_PASSWORD } from "../config";
import { adminZodSignInSchema, adminZodSignUpSchema } from "../types/types";

const adminRouter = Router();

adminRouter.get('/', (req:Request, res:Response) => {

    res.json({
        message: "healthy server"
    });
    
});


adminRouter.post('/signup', async(req:Request, res: Response) => {
    const parsedData = adminZodSignUpSchema.safeParse(req.body);
    const password = parsedData.data?.password || "" 

    if(!parsedData.success){
        res.status(403).json({
            message : "Invalid input"
        })
        return;
    }
    const hashedPassword = await bcrypt.hash(password,5)

    try {

        const user = await AdminModel.create({
            firstName : parsedData.data?.firstName,
            lastName : parsedData.data?.lastName,
            email : parsedData.data?.email,
            password : hashedPassword
        })
    

        res.status(201).json({
            message : "signed up as Admin"
        })
    }
    catch(error){

        res.status(500).json({
            error : "internal server error"
        })
    }
})

adminRouter.post('/signin', async(req:Request, res: Response) => {
    const parsedData = adminZodSignInSchema.safeParse(req.body);

    const password = parsedData.data?.password;
    const email = parsedData.data?.email ;

    if(!parsedData.success){
        res.json({
            message : "Invalid input"
        })
        return;
    }

    try {

        const admin = await AdminModel.findOne({
            email 
        })

        if(!admin){
            res.status(404).json({
                message : "User not found"
            })
            return;
        }

        const AdminPassword = admin.password

        if( typeof password == "string" && typeof AdminPassword == "string" ){
            const decodedPassword = await bcrypt.compare(password, AdminPassword);

            if(decodedPassword){
    
                const token =  jwt.sign({
                    id : admin._id
                }, JWT_ADMIN_PASSWORD || "")
        
                res.status(201).json({
                    message: "logged in!",
                    token
                });
            }
            else {
    
                res.status(403).json({
                    message: "Incorrect Credentials"
                })
            }
        }
    }
    catch(error){

        res.status(500).json({
            error : "internal server error"
        })
    }
})

export default adminRouter;