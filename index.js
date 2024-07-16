import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

const app=express()
app.use(express.json())
app.use(cors())
mongoose.connect('mongodb+srv://rvfaheem:4xdu8L07kqALzp7K@cluster0.prmklkx.mongodb.net/ArtisanMarket')
  .then(() => console.log('Connected!'));
  app.use('/uploads', express.static('uploads'));
import authRouter from './routes/auth.js'
import adminRouter from './routes/admin.js'
import userRouter from './routes/user.js'
import artistRouter from './routes/artist.js'
import organiserRouter from './routes/organiser.js'
import deliveryRouter from './routes/delivery.js'

app.use('/',authRouter)
app.use('/admin',adminRouter)
app.use('/user',userRouter)
app.use('/artist',artistRouter)
app.use('/organiser',organiserRouter)
app.use('/delivery',deliveryRouter)


app.listen(4000)
