import { Request, Response, Router } from "express";

const adminRouter = Router();

adminRouter.post('/create', (req:Request, res: Response) => {

    res.status(200).json({
        message : "successful"
    })
})

export default adminRouter;