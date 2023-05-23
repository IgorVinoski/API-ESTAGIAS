import express from 'express'
import { createTransaction } from '../controllers/createTransaction'
import { deleteTransaction } from '../controllers/deleteTransaction'
import { modifyTransaction } from '../controllers/modifyTransaction'
import { listAllTransactionsByUser } from '../controllers/listAllTransactionsByUser'
import { listOnlyTransaction } from '../controllers/listOnlyTransaction'
const login = require('../../middleware/login')
const transactionRouter = express.Router()
transactionRouter.post('/create', login.required, createTransaction)
transactionRouter.delete(
  '/delete/:cdTransaction',
  login.required,
  deleteTransaction,
)
transactionRouter.put(
  '/modify/:cdTransaction',
  login.required,
  modifyTransaction,
)
transactionRouter.get(
  '/allTransactions',
  login.required,
  listAllTransactionsByUser,
)
transactionRouter.get(
  '/onlyTransaction/:cdTransaction',
  login.required,
  listOnlyTransaction,
)
export { transactionRouter }
