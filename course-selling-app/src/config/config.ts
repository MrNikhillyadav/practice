import { Response } from 'express';
import mongoose from 'mongoose'

async function ConnectDB(){
    try{
        await mongoose.connect(process.env.DATABASE_URI || "")
        console.log("DB connected");

    }
    catch(e){
        console.log( "DB connection error, try again later")
        process.exit(1);
    }

}

export default ConnectDB;