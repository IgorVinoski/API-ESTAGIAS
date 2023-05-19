import express from 'express'
import 'dotenv/config'
import { teste } from './teste'
import { userRouter } from './routes/userRoute'

const app = express()

app.use(express.json())

app.get('/teste', teste)

app.use('/user', userRouter)

app.listen(3000, () => console.log('RODANDO! '))
