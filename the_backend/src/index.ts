import { Hono } from 'hono'
import { userRouter } from './routes/user'
import { productRouter } from './routes/product'
import { cors } from 'hono/cors'
import { AdminProduct } from './routes/AdminProduct'

const app = new Hono<{}>()
app.use('/*', cors())
app.route('/api/v1/user',userRouter)
app.route('/api/v1/product',productRouter)
app.route('/api/v1/admin/product',AdminProduct)
app.get('/', (c) => {
  return c.text('Hello Hono on 1/15/2025!')
})


export default app
