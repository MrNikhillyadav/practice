import {z} from 'zod'

export const signUpSchema = z.object({
    username : z
        .string()
        .max(20, "username too large!")
        .min(3, "username too short!"),
    email : z
        .string()
        .email("Invalid email"),
    password: z
        .string()
        .min(3,"password too short!")
        .max(15, "password too large")
})

export const loginSchema = z.object({
    email : z
        .string()
        .email("Invalid email"),
    password: z
        .string()
        .min(3,"password too short!")
        .max(15, "password too large")
})


const CONTENT_TYPES = ["youtube","twitter"] as const;


export const contentSchema = z.object({
    title : z.string(),
    link : z.string(),
    type : z.enum(CONTENT_TYPES)

})
