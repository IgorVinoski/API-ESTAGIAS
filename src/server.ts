import express from 'express'
import 'dotenv/config'
import { userRouter } from './routes/userRoutes'
import { transactionRouter } from './routes/transactionRouter'

const app = express()

app.use(express.json())

app.use('/user', userRouter)
app.use('/transaction', transactionRouter)

app.listen(3000, () => console.log('RODANDO! '))
