import { Request, Response, Router } from "express";
import bcrypt from 'bcrypt'
import jwt  from "jsonwebtoken";
import { JWT_ADMIN_PASSWORD } from "../config";
import { UserZodSignInSchema, UserZodSignUpSchema } from "../types/types";
import { PurchaseModel, UserModel } from "../models/models";
import userAuthMiddleware from "../middlewares/userAuth";

const userRouter = Router();

userRouter.get('/', (req:Request, res:Response) => {

    res.json({
        message: "healthy server"
    });
    
});


userRouter.post('/signup', async(req:Request, res: Response) => {
    const parsedData = UserZodSignUpSchema.safeParse(req.body);
    const password = parsedData.data?.password || "" 

    if(!parsedData.success){
        res.status(403).json({
            message : "Invalid input"
        })
        return;
    }
    const hashedPassword = await bcrypt.hash(password,5)

    try {

        const user = await UserModel.create({
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

userRouter.post('/signin', async(req:Request, res: Response) => {
    const parsedData = UserZodSignInSchema.safeParse(req.body);

    const password = parsedData.data?.password;
    const email = parsedData.data?.email ;

    if(!parsedData.success){
        res.json({
            message : "Invalid input"
        })
        return;
    }

    try {

        const admin = await UserModel.findOne({
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

userRouter.get('/purchases',userAuthMiddleware, async(req: Request, res:Response) => {
    const userId = req.userId;

    const purchases = await PurchaseModel.findById({userId}).populate("courses")
    console.log('purchases: ', purchases);
})

export default userRouter;