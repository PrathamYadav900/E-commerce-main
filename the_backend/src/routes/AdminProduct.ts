import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import { addProduct, updateProduct } from "@npmuserhahaha/ecommerce-common/product";


export const AdminProduct = new Hono<{
    Bindings:{
        DATABASE_URL: string;
        JWT_SECRET : string; 
    },
    Variables:{
        userId : string;
    }
}>();

AdminProduct.use("/*",async(c,next)=>{
    const authHeader = c.req.header("authorization") || "";
    const user = await verify(authHeader,c.env.JWT_SECRET)
    if(user){
        c.set("userId",String(user.id)) // "c" does not have userID it have req, json and body
        console.log(c)
        await next();
    }else{
        c.status(403);
        console.log("Error is happening in the Admin Middleware")
        return c.json({
            msg :"You are not Logged in"
        })
    }
})

AdminProduct.post("/",async(c)=>{
   try{ const body = await c.req.json();
    const {success} = addProduct.safeParse(body)
    if(!success){
        c.status(411);
        console.log("Error is happening in the post endpoint of AdminProduct try")
        return c.json({
            msg : "Inputs are wrong"
        })
    }
    const userId = c.get("userId")
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const product = await prisma.product.create({
     data :{
        title : body.title,
        description : body.description,
        price : body.price,
        image : body.image,
        userId : parseInt(userId)
     }
    })
    return c.json({
        id : product.id
    })}
    catch(e){
        console.log("Error is happening in the post endpoint of AdminProduct catch",e)
    }
})

AdminProduct.put("/",async(c)=>{
    const body = await c.req.json();
    const {success} = updateProduct.safeParse(body)
    if(!success){
        c.status(411);
        return c.json({
            msg : "Inputs are wrong"
        })
    }
    const userId = c.get("userId")
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const product = await prisma.product.update({
        where : {
            id : body.id
        },
        data :{
            title : body.title,
            description : body.description,
            price : body.price,
            image : body.image,
            userId : parseInt(userId)
        }
    })
    return c.json({
        id : product.id
    })
})

AdminProduct.delete("/:id",async(c)=>{
    const id = c.req.param('id');
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try{
        const product = await prisma.product.delete({
            where : {
                id : parseInt(id)
            },
        })
        return c.json({
            message : `Deleted product with id ${product.id} and title ${product.title}`
        })
    }catch(e){
        c.status(500);
        return c.json({
            msg : "Error while deleting product"
        })
    }
})