import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify} from 'hono/jwt'
import { addProduct,updateProduct } from '@npmuserhahaha/ecommerce-common/product'


export const productRouter = new Hono<{
  Bindings :{
    DATABASE_URL : string;
    JWT_SECRET :string;
  },
  Variables : {
    userId : string;
   
  }
}>()

productRouter.get('/bulk',async (c)=>{
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate()) 
 const AllProduct = await prisma.product.findMany();
    return c.json({
      AllProduct
    })
})  

productRouter.get('/:id', async (c)=>{
  const id = parseInt(c.req.param('id'))
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate()) 
try{
const product = await prisma.product.findFirst({
  where :{id : id}
  

})
return c.json({
  product
})}
catch(e){
  return c.json("Product not found ")
}
})

// productRouter.use("/*",async (c,next)=>{
//   const authHeader  = c.req.header("authorization") || "" // so the default type become string 
//   const user = await verify(authHeader , c.env.JWT_SECRET);
//   if(user){
//     c.set("userId",String(user.id)); // "c" does not have userID it have req , json and body 
//    await next();
//   }else{
//     c.status(403);
//     return c.json({
//       msg : "You are not Logged in "
//     })
//   }
// })

// productRouter.post('/', async (c)=>{
//   const body = await c.req.json();
//   const {success} = addProduct.safeParse(body)
//   if(!success){
//      c.status(411);
//      return c.json({
//       msg : "Inputs are wrong"
//      })
//     } 
//   const userId = c.get("userId")
//   const prisma = new PrismaClient({
//     datasourceUrl: c.env.DATABASE_URL,
// }).$extends(withAccelerate()) 
// const product = await prisma.product.create({
//   data :{
//     title : body.title , 
//     description : body.description , 
//     price : body.price , 
//     image : body.image ,
//     userId : parseInt(userId)
//   }
// })
//     return c.json({
//       id : product.id})
// })
  
// productRouter.put('/',async (c)=>{
//   const body = await c.req.json(); 
//   const {success} = updateProduct.safeParse(body)
//   if(!success){
//      c.status(411);
//      return c.json({
//       msg : "Inputs are wrong"
//      })
//     } 
//   const prisma = new PrismaClient({
//     datasourceUrl: c.env.DATABASE_URL,
// }).$extends(withAccelerate()) 

// const product = await prisma.product.update({
//     where:{id : body.id},
//   data :{
//     title : body.title , 
//     description : body.description , 
//     price : body.price , 
//     image : body.image ,
//   }
// })
//     return c.json({
//       id : product.id})
// })
  


// productRouter.delete('/:id',async (c)=>{
//   const id = c.req.param('id')
//   const prisma = new PrismaClient({
//     datasourceUrl : c.env.DATABASE_URL
//   }).$extends(withAccelerate())
//   try{
//     const product = await prisma.product.delete({
//       where : {id: parseInt(id)},
      
//     })
//     return c.json({
//       message :`Deleted product is ${product?.title} and product id is ${product?.id}`
//     })
//   }
//   catch(e){
//     return c.json("Product not found")
//   }
// })
  
