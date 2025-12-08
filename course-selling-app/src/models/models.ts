import mongoose, { Schema, Types, model } from "mongoose";
import {
  IAdminDocument,
  IUserDocument,
  ICourseDocument,
  IPurchaseDocument,
} from "../types/types";

const userSchema = new Schema<IUserDocument>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: String,
});

const adminSchema = new Schema<IAdminDocument>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: String,
});

const courseSchema = new Schema<ICourseDocument>({
  title: { type: String, required: true },
  desc: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  creatorId: { type: Schema.Types.ObjectId, ref: "Admin", required: true },
});

const purchaseSchema = new Schema<IPurchaseDocument>({
  courseId: { type: Schema.Types.ObjectId, required: true },
  userId: { type: Schema.Types.ObjectId, required: true },
});

export const UserModel = mongoose.model<IUserDocument>("User", userSchema);
export const AdminModel = mongoose.model<IAdminDocument>("Admin", adminSchema);
export const CourseModel = mongoose.model<ICourseDocument>("Courses", courseSchema);
export const PurchaseModel = mongoose.model<IPurchaseDocument>("Purchases", purchaseSchema);
