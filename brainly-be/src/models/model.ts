import mongoose from 'mongoose';
import { Schema } from 'mongoose';
import { contentSchema } from '../types';

const  UserSchema = new Schema({ 
    username : {type : String},
    email : {type : String, required : true, unique : true},
    password : {type : String}
})

const ContentSchema = new Schema({
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


export const ContentModel = mongoose.model("Content", ContentSchema);
export const UserModel =mongoose.model("User", UserSchema);
export const LinkModel = mongoose.model("Link", LinkSchema)