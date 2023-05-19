import express from 'express'
import { createTransaction } from '../controllers/createTransaction'
const login = require('../../middleware/login')
const transactionRouter = express.Router()
transactionRouter.post('/create', login.required, createTransaction)

export { transactionRouter }
// vou ter o arquivo createTransacion que irá criar a transaçao, insirindo no banco a transação
