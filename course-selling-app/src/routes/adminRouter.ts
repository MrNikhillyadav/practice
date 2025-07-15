import { Request, Response, Router } from "express";
import { AdminModel, CourseModel } from "../models/models";
import bcrypt from 'bcrypt'
import jwt  from "jsonwebtoken";
import { JWT_ADMIN_PASSWORD } from "../config";
import { adminZodSignInSchema, adminZodSignUpSchema, courseInputType, courseZodSchema } from "../types/types";
import adminAuthMiddleware from "../middlewares/adminAuth";

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

adminRouter.post('/create-course', adminAuthMiddleware, async(req: Request , res:Response) => {
    const parsedData = courseZodSchema.safeParse(req.body);
    const { data } = parsedData; 
    const adminId = req.adminId;

    if(!parsedData.success){
        res.status(403).json({
            message : "Invalid input"
        })
    }

    try{

        const course = await CourseModel.create({
            ...data,
            creatorId: adminId , 
        });


        
        res.status(201).json({
            message : "new course created!"
        })

    }
    catch(error){

        res.status(500).json({
            error : "error in creating course, try later"
        })
    }
})

adminRouter.get('/all-courses', adminAuthMiddleware, async(req: Request , res:Response) => {
    const adminId = req.adminId;

    try{

        const allCourses = await CourseModel.find({
            creatorId: adminId , 
        });

        if(!allCourses){
            
            res.json({
                message : "No course exist yet!"
            })
        }
        
        res.status(201).json({
            allCourses
        })

    }
    catch(error){

        res.status(500).json({
            error : "error in getting course, try later"
        })
    }
})

adminRouter.get('/course/:courseId', adminAuthMiddleware, async(req: Request , res:Response) => {
    const adminId = req.adminId;
    const courseId = req.params.courseId;
    console.log('courseId: ', courseId);

    try{

        const course = await CourseModel.findOne({
            _id : courseId,
            creatorId: adminId ,
        });

        if(!course){

            res.json({
                message : "Course don't exist "
            })
        }

        res.status(201).json({
            course
        })

    }
    catch(error){

        res.status(500).json({
            error : "server error, try later"
        })
    }
})

adminRouter.put('/update-course/:courseId', adminAuthMiddleware, async(req: Request , res:Response) => {
    const parsedData = courseZodSchema.safeParse(req.body);
    const courseId = req.params.courseId;
    const { data } = parsedData; 
    const adminId = req.adminId;

    if(!parsedData.success){
        res.status(403).json({
            message : "Invalid input"
        })
    }

    try{

        const course = await CourseModel.findOneAndUpdate(
            {
                creatorId : adminId,
                _id: courseId
                
            },
            {
            ...data, 
            }
        );

        if(!course){

            res.status(404).json({
                messaage : "No course with this id exist!"
            })
        }

        res.status(201).json({
            message : "course details updated!"
        })

    }
    catch(error){

        res.status(500).json({
            error : "error in updating course, try later"
        })
    }
})

adminRouter.delete('/delete-course/:courseId', adminAuthMiddleware, async(req: Request , res:Response) => {
    const courseId = req.params.courseId;
    const adminId = req.adminId;

    try{

        const course = await CourseModel.findOneAndDelete(
            {
                _id: courseId,
                creatorId : adminId,
            }
        );

        if(!course){
            res.json({
                message : "course with this id doesn't exist"
            })
        }


        res.status(201).json({
            message : "course deleted!"
        })

    }
    catch(error){

        res.status(500).json({
            error : "coudn't deleted course, try later"
        })
    }
})

export default adminRouter;