import express from 'express'
import { createTransaction } from '../controllers/createTransaction'
import { deleteTransaction } from '../controllers/deleteTransaction'
import { modifyTransaction } from '../controllers/modifyTransaction'
const login = require('../../middleware/login')
const transactionRouter = express.Router()
transactionRouter.post('/create', login.required, createTransaction)
transactionRouter.delete('/delete', login.required, deleteTransaction)
transactionRouter.put('/modify', login.required, modifyTransaction)

export { transactionRouter }
// vou ter o arquivo createTransacion que irá criar a transaçao, insirindo no banco a transação
