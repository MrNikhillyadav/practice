import mongoose from "mongoose";

async function ConnectDB() {

    try {

        await mongoose.connect(process.env.DATABASE_URI || "undefined");
        console.log('db connected');
    } 
    catch (e) {

        console.error("error", e);
        process.exit(1); 
    }
}

export default ConnectDB;
