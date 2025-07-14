import { Request, Response, Router } from "express";

const userRouter = Router();

userRouter.post('/create', (req:Request, res: Response) => {

    res.status(200).json({
        message : "successful"
    })
})

export default userRouter;