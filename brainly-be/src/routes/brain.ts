import Router from 'express';
import { ContentModel, LinkModel, UserModel } from '../models/model';
import { nanoid } from 'nanoid';

const brainRouter = Router();

brainRouter.post('/share',async(req,res) => {
    const share = req.body.share;
    const userId = req.userId;

    try {
        if(share){
            const user = await LinkModel.findOne({
                userId
            });

            const hash = nanoid();

            const link = await LinkModel.create({
                hash,
                userId,
            })

            console.log("link", link);
            if(!link){

                res.json({
                    message : "Link not created!"
                });
                return;
            }

            res.json({
                link : link
            })

        }
        else{
            await LinkModel.deleteOne({
                userId 
             })

            res.json({
                message : "hash removed!"
            })

        }
    }
    catch(e){

        res.json({
            error : "error occured"
        })
        return;
    }
})

brainRouter.get('/share/:sharelink',async(req,res) => {
    const hash = req.params.sharelink;

    try{
        const brainHash = await LinkModel.findOne({
            hash
        })

        if(!brainHash){
            res.json({
                message : "hash not found"
            })
        }

        const content = await ContentModel.find({
            userId : brainHash?.userId 
        })

        if(!content){
            res.json({
                message : "content not found"
            })
            return;
        }

        res.json({
            content
        })
    }
    catch(e){

        res.status(501).json({
            message : "link not working!"
        })
        return;

    }
    
})

brainRouter.post('/share-by-id/:contentId',async(req,res) => {
    const contentId = req.params.contentId;
    const userId = req.userId;

    try {
        if(contentId){
            const hash = nanoid();

            const link = await LinkModel.create({
                hash,
                userId,
                contentId
            })

            console.log("link", link);
            if(!link){

                res.json({
                    message : "Link not created!"
                });
                return;
            }

            res.json({
                link : link
            })

        }
    }
    catch(e){

        res.json({
            error : "error occured"
        })
        return;
    }
})

brainRouter.get('/share-by-id/:contentId',async(req,res) => {
    const hash = req.params.contentId;

    try{
        const brainHash = await LinkModel.findOne({
            hash
        })

        if(!brainHash){

            res.json({
                message : "hash not found"
            })
        }

        const content = await ContentModel.findById({
            _id : brainHash?.contentId 
        })

        if(!content){
            res.json({
                message : "content not found"
            })
            return;
        }

        res.json({
            content
        })
    }
    catch(e){

        res.status(501).json({
            message : "link not working!"

        })
        return;

    }
    
})

export default brainRouter;