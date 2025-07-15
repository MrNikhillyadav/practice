import {z} from 'zod'

export const UserZodSignUpSchema = z.object({
    email : z.string().email("Invalid email"),
    password : z.string().min(4,"password too short").max(12,"password too long"),
    firstName : z.string().min(2,"firstname too short").max(16,"firstname too large"),
    lastName : z.string().min(1,"lastName too short").max(10,"lastName too large").optional(),
})
export type UserSignUpType = z.infer<typeof UserZodSignUpSchema>

export const UserZodSignInSchema = z.object({
    email : z.string().email("Invalid email"),
    password : z.string().min(4,"password too short").max(12,"password too long"),
})
export type UserSignInType = z.infer<typeof UserZodSignInSchema>

export const adminZodSignUpSchema = z.object({
    email : z.string().email("Invalid email"),
    password : z.string().min(4,"password too short").max(12,"password too long"),
    firstName : z.string().min(2,"firstname too short").max(16,"firstname too large"),
    lastName : z.string().min(1,"lastName too short").max(10,"lastName too large").optional(),
})
export type AdminSignUpType = z.infer<typeof adminZodSignUpSchema>

export const adminZodSignInSchema = z.object({
    email : z.string().email("Invalid email"),
    password : z.string().min(4,"password too short").max(12,"password too long"),
})
export type AdminSignInType = z.infer<typeof adminZodSignInSchema>

export const courseZodSchema = z.object({
    title : z.string(),
    desc : z.string().min(10,"description too short!").max(400,"too long description!"),
    price : z.number(),
    imageUrl : z.string(),
    creatorId : z
    .string()
    .regex(/^[a-f\d]{24}$/i, "invalid creatorId : must be of 24 characters hex id")
    .optional()
})
export type courseInputType = z.infer<typeof courseZodSchema>


export const purchaseZodSchema = z.object({
    courseId : z
        .string()
        .regex(/^[a-f\d]{24$/i,"invalid creatorId : must be of 24 characters hex id"), 
    userId : z
        .string()
        .regex(/^[a-f\d]{24$/i,"invalid creatorId : must be of 24 characters hex id"),

})
export type PurchaseInputType = z.infer<typeof purchaseZodSchema>