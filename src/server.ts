import express from 'express'
import userRouter from './routes/userRoute'
import productRouter from './routes/productRoute'
import orderRouter from './routes/orderRoute'
import client from './database'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import cors from 'cors'
import wishlistRouter from './routes/wishlistRoute'

const app = express()
dotenv.config()
client.connect(process.env.CONNECTION_URL!)
const address: string = process.env.PORT || '3000'
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(bodyParser.json())
app.use(bodyParser.raw())
app.use(cors());
app.use('/users', userRouter)
app.use('/products', productRouter)
app.use('/orders', orderRouter)
app.use('/wishlist', wishlistRouter)

app.get('/', (req, res)=>{
  res.send('Hello to GoodGame API');
});

app.listen(address, function () {
    console.log(`starting app on: ${address}`)
})
export default app