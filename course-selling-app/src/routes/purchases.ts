import { Request, Response, Router } from "express";

const purchaseRouter = Router();

purchaseRouter.post('/create', (req:Request, res: Response) => {

    res.status(200).json({
        message : "successful"
    })
})

export default purchaseRouter;