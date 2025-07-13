import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import userRouter from './routes/user';
import ConnectDB from './config';
import contentRouter from './routes/content';
import authMiddleware from './middlewares/authMiddleware';
import brainRouter from './routes/brain';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/v1/user',  userRouter)
app.use('/api/v1/content', authMiddleware , contentRouter)
app.use('/api/v1/brain', authMiddleware , brainRouter)


ConnectDB()
    .then(() => {
        app.listen(3000, () => {
            console.log('server running on Port 3000');
        });
    })
    .catch((error) => {
        console.error('Failed to connect to the database:', error);
    });

export default app;
