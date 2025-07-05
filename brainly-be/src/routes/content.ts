import Router from 'express';
import { ContentModel } from '../models/model';

const contentRouter = Router();


contentRouter.get('/all-content', async (req,res) => {
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

contentRouter.post('/create', async(req,res) => {
    const {title, link, type} = req.body;
    const userId = req.userId;

    try {

        const content = await  ContentModel.create({
            title,
            link,
            type,
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

contentRouter.get('/:contentId', async (req,res) => {
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

contentRouter.put('/update/:contentId', async(req,res) => {
    const contentId = req.params.contentId;
    const {title, link, type} = req.body;
    const userId = req.userId;

    try {

        const content = await ContentModel.findByIdAndUpdate(
           contentId,
           { 
                link,
                title, 
                type
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