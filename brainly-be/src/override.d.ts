export { };
import { Request } from 'express';

declare global {
    namespace Express {
        export interface Request {
            userId? : string,
            user? :string
        }
    }

}