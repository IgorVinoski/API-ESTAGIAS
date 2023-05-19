import express from 'express'
import { registrationUser } from '../controllers/registrationUser'
import { loginUser } from '../controllers/loginUser'

const userRouter = express.Router()

userRouter.post('/create', registrationUser)

userRouter.post('/login', loginUser)

export { userRouter }
