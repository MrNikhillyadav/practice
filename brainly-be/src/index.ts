import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import userRouter from './routes/user';
import ConnectDB from './config';
import contentRouter from './routes/content';
import authMiddleware from './middlewares/authMiddleware';
import brainRouter from './routes/brain';

dotenv.config();

const app = express();
const PORT = process.env.PORT ||3000;

app.use(express.json());
app.use(cors());

app.use('/api/v1/user',  userRouter)
app.use('/api/v1/content', authMiddleware , contentRouter)
app.use('/api/v1/brain', authMiddleware , brainRouter)


ConnectDB().then(() => {

    app.listen(PORT, () => {
        console.log(`server is running on port ${PORT} `);
    });

});
