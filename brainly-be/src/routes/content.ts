import Router, {Request,Response} from 'express';
import { ContentModel } from '../models/model';
import { contentSchema} from '../types';

const contentRouter = Router();


contentRouter.get('/all-content', async (req:Request, res:Response) => {
    const userId = req.userId;
    
    const contents = await ContentModel.find({
        userId
    });
    
    if(!contents) {
        res.json({
            message : "Not contents available"
        })
        return;
    }
    
    res.status(200).json({
        contents
    })
})

contentRouter.post('/create', async(req:Request, res:Response) => {
    const parsedData = contentSchema.safeParse(req.body)
    const userId = req.userId;

    if(!parsedData.success){
        res.status(400).json({
            message: "Invalid input"
        })
    }

    try {

        const content = await  ContentModel.create({
            title:parsedData.data?.title,
            link:parsedData.data?.link,
            type:parsedData.data?.type,
            userId
        })
    
        if(!content) {
    
            res.status(404).json({
                message : 'No content found!'
            })
        }
    
        res.json({
            message : "created new brain",
            content: content,
        })

    }
    catch(e){

        res.status(501 ).json({
            error : "Oops...couldn't creat post. Try again later"
        })
    }
})

contentRouter.get('/:contentId', async (req:Request, res:Response) => {
    const userId = req.userId;
    const contentId = req.params.contentId;

    const contents = await ContentModel.findById({
        _id : contentId.toString()
    });
    
    if(!contents) {
        res.json({
            message : "Not contents available"
        })
        return;
    }

    res.status(200).json({
        contents
    })
})

contentRouter.delete('/remove/:contentId', async(req,res) => {
    const contentId = req.params.contentId;
    const userId = req.userId;

    try {

        const content = await  ContentModel.findByIdAndDelete({
           _id : contentId,
        })

        console.log("content:")
    
        if(!content) {
    
            res.status(404).json({
                message : 'content not found!'
            })
        }
    
        res.json({
            message : "deleted!",
        })

    }
    catch(e){

        res.status(501 ).json({
            error : "Oops...couldn't delete. Try again later"
        })
    }
})

contentRouter.put('/update/:contentId', async(req:Request, res:Response) => {
    const contentId = req.params.contentId;
    const userId = req.userId;
    const parsedData = contentSchema.safeParse(req.body)

    if(!parsedData.success){
        res.status(400).json({
            message: "Invalid input"
        })
    }

    try {

        const content = await ContentModel.findByIdAndUpdate(
           contentId,
           { 
            title:parsedData.data?.title,
            link:parsedData.data?.link,
            type:parsedData.data?.type,
            }
        )

        console.log("updated content:")
    
        if(!content) {
    
            res.status(404).json({
                message : 'content not found!'
            })
        }
    
        res.json({
            message : "updated content!",
        })

    }
    catch(e){

        res.status(501 ).json({
            error : "Oops...couldn't update. Try again later"
        })
    }
})



export default contentRouter;