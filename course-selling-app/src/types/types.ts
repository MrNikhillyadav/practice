import { z } from "zod";
import { Types, Document } from "mongoose";

// Mongoose Interfaces and Types
export interface IAdmin {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export type IAdminDocument = IAdmin & Document;

export interface IUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export type IUserDocument = IUser & Document;

export interface ICourse {
  title: string;
  desc: string;
  price: number;
  imageUrl: string;
  creatorId: Types.ObjectId;
}

export type ICourseDocument = ICourse & Document;

export interface IPurchase {
  courseId: Types.ObjectId;
  userId: Types.ObjectId;
}

export type IPurchaseDocument = IPurchase & Document;

// Zod Schemas and Types
export const UserZodSignUpSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z
    .string()
    .min(4, "password too short")
    .max(12, "password too long"),
  firstName: z
    .string()
    .min(2, "firstname too short")
    .max(16, "firstname too large"),
  lastName: z
    .string()
    .min(1, "lastName too short")
    .max(10, "lastName too large")
    .optional(),
});
export type UserSignUpType = z.infer<typeof UserZodSignUpSchema>;

export const UserZodSignInSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z
    .string()
    .min(4, "password too short")
    .max(12, "password too long"),
});
export type UserSignInType = z.infer<typeof UserZodSignInSchema>;

export const AdminZodSignUpSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z
    .string()
    .min(4, "password too short")
    .max(12, "password too long"),
  firstName: z
    .string()
    .min(2, "firstname too short")
    .max(16, "firstname too large"),
  lastName: z
    .string()
    .min(1, "lastName too short")
    .max(10, "lastName too large")
    .optional(),
});
export type AdminSignUpType = z.infer<typeof AdminZodSignUpSchema>;

export const AdminZodSignInSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z
    .string()
    .min(4, "password too short")
    .max(12, "password too long"),
});
export type AdminSignInType = z.infer<typeof AdminZodSignInSchema>;

export const CourseZodSchema = z.object({
  title: z.string(),
  desc: z
    .string()
    .min(10, "description too short!")
    .max(400, "too long description!"),
  price: z.number(),
  imageUrl: z.string(),
  creatorId: z
    .string()
    .regex(
      /^[a-f\d]{24}$/i,
      "invalid creatorId : must be of 24 characters hex id",
    )
    .optional(),
});
export type CourseInputType = z.infer<typeof CourseZodSchema>;

export const PurchaseZodSchema = z.object({
  courseId: z
    .string()
    .regex(
      /^[a-f\d]{24}$/i,
      "invalid courseId : must be of 24 characters hex id",
    ),
  userId: z
    .string()
    .regex(
      /^[a-f\d]{24}$/i,
      "invalid userId : must be of 24 characters hex id",
    ),
});
export type PurchaseInputType = z.infer<typeof PurchaseZodSchema>;
