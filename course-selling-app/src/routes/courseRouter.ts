import { Request, Response, Router } from "express";
import userAuthMiddleware from "../middlewares/userAuth";
import { CourseModel, PurchaseModel } from "../models/models";

const courseRouter = Router();

courseRouter.post('/purchase/:courseId', userAuthMiddleware, async(req:Request, res: Response) => {
    const userId = req.userId;
    const courseId = req.params.courseId;

    try{
        const course = await PurchaseModel.create({
            userId,
            courseId
        })
        
            res.status(201).json({
                message : `purchased course with courseId: ${courseId}`
            })
    }
    catch(error){

        res.status(500).json({
            error: "server error"
        })
    }
})

courseRouter.get('/preview', userAuthMiddleware, async (req:Request ,res:Response) => {
    const userId = req.userId;
    
    try{
        const courses = await CourseModel.find({})

        if( !courses){

            res.status(404).json({
                message : "No courses found!"
            })
            return;
        }

        res.status(200).json({
            courses 
        })
    }
    catch(error){

        res.status(500).json({
            error : "internal server error"
        })
    }
})

export default courseRouter;