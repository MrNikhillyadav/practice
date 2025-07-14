import { Request, Response, Router } from "express";

const courseRouter = Router();

courseRouter.post('/create', (req:Request, res: Response) => {

    res.status(200).json({
        message : "successful"
    })
})

export default courseRouter;