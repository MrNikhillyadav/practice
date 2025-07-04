import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt'
import * as dotenv from 'dotenv';
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose';
import { UserModel } from './models/model';

dotenv.config();

const PORT = process.env.PORT || 3000;
console.log('PORT: ', PORT);
const app = express();

app.use(express.json());
app.use(cors());

async function ConnectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://nikyadav20032003:e0u1Gam4rdA2ap6f@cluster0.orazjtw.mongodb.net/brain");
        console.log('db connected');
    } catch (e) {
        console.error("error", e);
        process.exit(1); // Exit if DB connection fails
    }
}

app.get('/api/v1/', (req, res) => {

    res.json({
        message: "healthy server"
    });
    
});

app.post('/api/v1/signup', async(req, res) => {

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

app.post('/api/v1/signin', async(req, res) => {

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
            }, 'JWT_SECRET')
    
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

ConnectDB().then(() => {

    app.listen(PORT, () => {
        console.log(`server is running on port ${PORT} `);
    });

});
