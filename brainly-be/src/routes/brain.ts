import Router from 'express';
import { ContentModel, LinkModel, UserModel } from '../models/model';
import { nanoid } from 'nanoid';

const brainRouter = Router();

brainRouter.post('/share',async(req,res) => {
    const share = req.body.share;
    const userId = req.userId;

    if(share){

        try {

            const existingUser = await LinkModel.findOne({
                userId
            });

            console.log('existingUser: ', existingUser);

            if(existingUser){

                const existingHash = await LinkModel.find({
                    hash : existingUser.hash
                })

                res.json({
                    existingHash 
                })
                return;
            }

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
        catch(e){

            res.json({
                error : "error occured! try later"
            })
        }
    }
    else{

        await LinkModel.deleteOne({
            userId 
         })

        res.json({
            message : "hash removed!"
        })

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

brainRouter.post('/share-by-id',async(req,res) => {
    const {contentId, share} = req.body;
    const userId = req.userId;

    if(share){

        try {

            const content = await ContentModel.findById({
                _id : contentId
            })
            console.log('content: ', content);
                
            const hash = nanoid();

            const link = await LinkModel.create({
                hash,
                userId,
                contentId : content?._id
            })

            console.log("link", link);

            if(!link){

                res.json({
                    message : "Link not created!"
                });
                return;
            }

            res.json({
                link : link.hash
            })

        }
        catch(e){

            res.json({
                error : "error occured"
            })
            return;
        }
    }
    else{

        await LinkModel.findByIdAndDelete({
            contentId
        })

        res.json({
            message : "hash removed for contentId"
        })

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