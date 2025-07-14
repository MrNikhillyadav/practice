import mongoose from 'mongoose'

async function ConnectDB(){
    try{
        await mongoose.connect(process.env.DATABASE_URI || "")
        console.log("DB connected");

    }
    catch(e){
        console.log( "DB connection error",e)
        process.exit(1);
    }

}

export default ConnectDB;

export const JWT_ADMIN_PASSWORD = process.env.JWT_ADMIN_PASSWORD;
export const JWT_USER_PASSWORD = process.env.JWT_USER_PASSWORD;
export const PORT = process.env.PORT;
