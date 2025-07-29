import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bcrypt from "bcrypt"
import { UserModel } from './model/model';
import Jwt from "jsonwebtoken"

const app = express();

mongoose.connect("mongodb+srv://nikyadav20032003:e0u1Gam4rdA2ap6f@cluster0.orazjtw.mongodb.net/demo")
.then(() => console.log("db connected!"))
.catch(() => console.log("error connecting to db"))


app.use(express.json());
app.use(cors());


app.get('/health',(req,res) =>  {

    res.json({
        message : "healthy"
    })
})

app.post('/signup',async(req,res) =>  {

    const {email, password} = req.body;

    const hashPassword = await bcrypt.hash(password, 5)
    console.log('hashPassword: ', hashPassword);

    //enter to db
    const user = await UserModel.create({
        email,
        password : hashPassword
    })

    
    res.json({
        message : "signed up"
    })
})


app.post('/signin',async(req,res) =>  {

    const {email, password} = req.body;

    const user = await UserModel.findOne({
        email,
    })

    if(!user){
        res.json({
            message : "user not found"
        })
    }

    const token = Jwt.sign({
        userId : user?._id.toString()
    },'JWT_SECRET')

    res.json({
        message : "signed in",
        token :  token
    })
})

app.use(authMiddleware)
app.post('/dashboard',(req,res) =>  {

    res.json({
        message : "signed in"
    })
})


app.listen(3000,() => {
    console.log("listening on port 3000")
})

export default app;