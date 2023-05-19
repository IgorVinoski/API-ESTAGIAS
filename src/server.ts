import express from 'express'
import 'dotenv/config'
import { teste } from './teste'
import { cadastroUsuario } from './routes/users'

const app = express()

app.use(express.json())

app.get('/teste', teste)
app.post('/cadastro', cadastroUsuario)

app.listen(3000, () => console.log('RODANDO! '))
