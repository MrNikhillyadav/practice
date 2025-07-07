import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const  UserSchema = new Schema({ 
    username : {type : String},
    email : {type : String, required : true, unique : true},
    password : {type : String}
})


const contentType = new Schema({
    title : String,
    link : String,
    type : String,
    userId : {type : Schema.Types.ObjectId, ref : "User", required : true},
})


const LinkSchema = new Schema({
    hash : String,
    userId : {type : Schema.Types.ObjectId, ref : "User", required : true },
    contentId : {type : Schema.Types.ObjectId, ref : "Content"}
})



export const ContentModel = mongoose.model("Content", contentType);
export const UserModel =mongoose.model("User", UserSchema);
export const LinkModel = mongoose.model("Link", LinkSchema)