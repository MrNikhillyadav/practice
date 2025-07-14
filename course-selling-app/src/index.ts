import * as dotenv from 'dotenv'
dotenv.config()
import express, { Request, response, Response } from 'express';
import cors from 'cors'
import adminRouter from './routes/admin';
import courseRouter from './routes/course';
import purchaseRouter from './routes/purchases';
import userRouter from './routes/user';
import ConnectDB from './config/config';

const app = express();

app.use(express.json())
app.use(cors())

app.use("api/v1/admin/", adminRouter)
app.use("api/v1/user/", userRouter)
app.use("api/v1/course/", courseRouter)
app.use("api/v1/purchase/", purchaseRouter)

ConnectDB()
.then((PORT) => {
    app.listen(prompt, () => {
        console.log(`server running at PORT ${PORT}`)
    })
})
.catch((error) => {
    console.error("Failed to connect to server")
})


export default app;