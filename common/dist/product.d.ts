import z from "zod";
export declare const addProduct: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodString;
    price: z.ZodNumber;
    image: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    description: string;
    price: number;
    image: string;
}, {
    title: string;
    description: string;
    price: number;
    image: string;
}>;
export declare const updateProduct: z.ZodObject<{
    id: z.ZodNumber;
    title: z.ZodString;
    description: z.ZodString;
    price: z.ZodNumber;
    image: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    description: string;
    price: number;
    image: string;
    id: number;
}, {
    title: string;
    description: string;
    price: number;
    image: string;
    id: number;
}>;
export type UpdateProduct = z.infer<typeof updateProduct>;
export type AddProduct = z.infer<typeof addProduct>;
