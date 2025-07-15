import * as dotenv from 'dotenv'
dotenv.config()
import express, { Request, response, Response } from 'express';
import cors from 'cors'
import adminRouter from './routes/adminRouter';
import courseRouter from './routes/courseRouter';
import userRouter from './routes/userRouter';
import ConnectDB from './config';
import {PORT} from "./config"

const app = express();

app.use(express.json())
app.use(cors())

app.get('/', (req,res) => {
    res.json({
        message : "server is healthy!"
    })
})

app.use("/api/v1/admin", adminRouter)
app.use("/api/v1/user", userRouter)
app.use("/api/v1/course", courseRouter)


ConnectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`server running on Port`,PORT );
        });
    })
    .catch((error) => {
        console.error('Failed to connect to the database:', error);
    });


export default app;