import { Request, Response, Router } from "express";
import { adminSchema } from "../types/types";
import { AdminModel } from "../models/models";
import bcrypt from 'bcrypt'

const adminRouter = Router();

adminRouter.post('/signup', async(req:Request, res: Response) => {
    const parsedData = adminSchema.safeParse(req.body);
    const password = parsedData.data?.password || " "

    if(!parsedData.success){
        res.json({
            message : "Invalid input"
        })
        return;
    }
    const hashedPassword = bcrypt.hash(password,5)

    try {

        const user = await AdminModel.create({
            firstName : parsedData.data?.firstName,
            lastName : parsedData.data?.lastName,
            email : parsedData.data?.email,
            password : hashedPassword
        })
    

        res.status(200).json({
            message : "signed up as Admin"
        })
    }
    catch(error){
        res.status(501).json({
            error : "internal server error"
        })
    }
})

export default adminRouter;