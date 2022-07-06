import express from 'express'
import userRouter from './routes/userRoute'
import productRouter from './routes/productRoute'
import orderRouter from './routes/orderRoute'
import client from './database'
import bodyParser from 'body-parser'


const app = express()
client.connect('mongodb+srv://saleh:LxxAxMTn6u9MUhSX@cluster0.5lidzzm.mongodb.net/?retryWrites=true&w=majority')
const address: string = "localhost:3000"
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(bodyParser.json())
app.use(bodyParser.raw())
app.use('/users', userRouter)
app.use('/products', productRouter)
app.use('/orders', orderRouter)



app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})
export default app