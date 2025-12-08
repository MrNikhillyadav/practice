export { };     
import { Request } from 'express';

//extend existing Express library
declare global {
    namespace Express {
        export interface Request {
            userId? : string,
            user? :string
        }
    }

}