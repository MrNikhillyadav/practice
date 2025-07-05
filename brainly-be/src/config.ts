import mongoose from "mongoose";


console.log('DATABASE_URI', process.env.DATABASE_URI)

async function ConnectDB() {

    try {

        await mongoose.connect(process.env.MONGO_URI || "mongodb+srv://nikyadav20032003:e0u1Gam4rdA2ap6f@cluster0.orazjtw.mongodb.net/brain");
        console.log('db connected');
    } 
    catch (e) {

        console.error("error", e);
        process.exit(1); 
    }
}

export default ConnectDB;

export const JWT_SECRET = "DFHHQIEIR4568"