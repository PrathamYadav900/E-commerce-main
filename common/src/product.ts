import z from "zod";

export const addProduct = z.object({
    title : z.string(),
    description : z.string(),
    price : z.number(),
    image : z.string()
})

export const updateProduct = z.object({
    id: z.number(),
    title : z.string(),
    description : z.string(),
    price : z.number(),
    image : z.string()
})

export type UpdateProduct = z.infer<typeof updateProduct>
export type AddProduct = z.infer<typeof addProduct>
