
import Jwt from "jsonwebtoken"

export function authMiddleware(req,res,next){

    const token = req.headers.token
    const decoded = Jwt.verify(token,"JWT_SECRET");

    if(!decoded){
        res.json({
            message : "Invalid token"
        })
    }

}