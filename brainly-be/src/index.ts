import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import userRouter from './routes/user';
import contentRouter from './routes/content';
import authMiddleware from './middlewares/authMiddleware';
import brainRouter from './routes/brain';
import { ENV } from './config/env';
import ConnectDB from './config/db';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/v1/user',  userRouter)
app.use('/api/v1/content', authMiddleware , contentRouter)
app.use('/api/v1/brain', authMiddleware , brainRouter)


const startServer = async() => {
    try {
        await ConnectDB();
        if(ENV.NODE_ENV !== "production"){
             app.listen(ENV.PORT, () => {
                console.log(`server running on Port:`,ENV.PORT );
            });
        }
    }
    catch(error) {
        console.error('Failed to connect to the database:', error);
        process.exit(1);
    };
}

startServer();   

export default app;
