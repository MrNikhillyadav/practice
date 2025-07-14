import  mongoose, { Schema, Types, model, Document } from "mongoose";

export interface IAdmin {
    email : string,
    password : string,
    firstName : string,
    lastName : string
}

export type IAdminDocument = IAdmin & Document;

export interface IUser {
    email : string,
    password : string,
    firstName : string,
    lastName : string
}

export type IUserDocument = IUser & Document;

export interface ICourse {
    title : string,
    desc : string,
    price : number,
    imageUrl : string,
    creatorId : Types.ObjectId
}

export type ICourseDocument = ICourse & Document;

export interface IPurchase {
    courseId : Types.ObjectId,
    userId : Types.ObjectId

}

export type IPurchaseDocument = IPurchase & Document;

const userSchema = new Schema <IUserDocument> ({
    email : {type: String, required : true, unique : true},
    password : String,
    firstName : {type: String, required : true},
    lastName : String
})

const adminSchema = new Schema<IAdminDocument>({
    email : {type: String, required : true, unique : true},
    password : String,
    firstName : {type: String, required : true},
    lastName : String
})

const courseSchema = new Schema<ICourseDocument>({
    title : {type: String, required : true},
    desc : {type: String, required : true, unique : true},
    price : {type: Number, required : true},
    imageUrl :{type: String, required : true},
    creatorId : { type : Schema.Types.ObjectId, ref :"User", required: true }
})

const purchaseSchema = new Schema<IPurchaseDocument>({
    courseId : {type : Schema.Types.ObjectId, ref: "Course",required : true},
    userId : {type : Schema.Types.ObjectId, ref: "User",required : true}
})

export const UserModel = mongoose.model<IUserDocument>("User",userSchema);
export const AdminModel = mongoose.model<IAdminDocument>("Admin",adminSchema);
export const CourseModel = mongoose.model<ICourseDocument>("Courses",courseSchema);
export const PurchaseModel = mongoose.model<IPurchaseDocument>("Purchases",purchaseSchema);