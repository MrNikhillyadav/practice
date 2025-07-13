import Router, {Request, Response } from 'express';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { UserModel } from '../models/model';
import { JWT_SECRET } from '../config';
import { loginSchema, signUpSchema } from '../types';

const userRouter = Router()

userRouter.get('/', (req:Request, res:Response) => {

    res.json({
        message: "healthy server"
    });
    
});

userRouter.post('/signup', async(req:Request, res:Response) => {
    const parsedData = signUpSchema.safeParse(req.body);

    if(!parsedData.success){
        res.status(400).json({
            message : "Invalid input"
        })
        return;
    }

    const {username,email,password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 5)

    try {

        const user = await UserModel.create({
            username: parsedData.data.username,
            email: parsedData.data.email,
            password : hashedPassword,
        })
    
        res.status(200).json({
            message: "signed up successful!",
            user : user 
        });
    }
    catch(e){

        res.status(501).json({
            error : e
        })
    }
});

userRouter.post('/signin', async(req:Request, res:Response) => {
    const parsedData = loginSchema.safeParse(req.body);

    if(!parsedData.success){
        res.status(400).json({
            message: "Invalid input type"
        })
    }

    try {

        const user = await UserModel.findOne({
            email : parsedData.data?.email,
        })
        
        if(!user){

            res.status(403).json({
                message : 'User not found'
            })

            return;
        }

        const password = parsedData.data?.password
        const UserPassword = user.password

        if( typeof password == "string" && typeof UserPassword == "string" ){
            const decodedPassword = await bcrypt.compare(password, UserPassword);

            if(decodedPassword){
    
                const token =  jwt.sign({
                    id : user._id.toString()
                }, JWT_SECRET)
        
                res.status(200).json({
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
    catch(e) {

        res.json({
            error : e
        })
    }

});

export default userRouter;