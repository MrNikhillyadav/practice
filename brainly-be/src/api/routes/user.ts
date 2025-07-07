import Router from 'express';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { UserModel } from '../models/model';
import { JWT_SECRET } from '../config';

const userRouter = Router()

userRouter.get('/', (req, res) => {

    res.json({
        message: "healthy server"
    });
    
});

userRouter.post('/signup', async(req, res) => {

    const {username,email,password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 5)

    try {

        const user = await UserModel.create({
            username,
            email,
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

userRouter.post('/signin', async(req, res) => {

    const {email, password} = req.body;

    try {

        const user = await UserModel.findOne({
            email,
        })
        
        if(!user){

            res.status(403).json({
                message : 'User not found'
            })

            return;
        }
    
        const decodedPassword = user.password ? await bcrypt.compare(password, user.password):false;
    
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
    catch(e) {

        res.json({
            error : e
        })
    }

});

export default userRouter;