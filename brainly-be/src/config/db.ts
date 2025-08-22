import mongoose from "mongoose";
import { ENV } from './env';

async function ConnectDB() {

    try {

        await mongoose.connect(ENV.DATABASE_URI || "undefined");
        console.log('db connected');
    } 
    catch (e) {

        console.error("error", e);
        process.exit(1); 
    }
}

export default ConnectDB;
