import z from "zod";

export const signupInput = z.object({
    name : z.string(),
    email : z.string().email(),
    password : z.string().min(6)
})

export const signinInput = z.object({
    email : z.string().email(),
    password : z.string().min(6) 
})


export type SignupInput = z.infer<typeof signupInput>
export type SigninInput = z.infer<typeof signinInput>
