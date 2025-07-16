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

export const PORT = process.env.PORT;
export const JWT_SECRET = process.env.JWT_SECRET;
