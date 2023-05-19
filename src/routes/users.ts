import knex from '../../database/db'

const bcrypt = require('bcrypt')

export async function cadastroUsuario(req, res) {
  bcrypt.hash(req.body.password, 10, async (errBcrypt, hash) => {
    if (errBcrypt) {
      return res.status(500).send({ error: errBcrypt })
    }
    await knex('tbl_dti_user')
      .insert({
        nm_user: req.body.name,
        ds_email: req.body.email,
        ds_password: hash,
        dt_birth: req.body.birth,
      })
      .then(() => {
        console.log(`Inserindo o usuário: ${req.body.name}`)
      })
      .catch((e) => {
        console.log('ERRO AO INSERIR O USUÁRIO => ')
        console.log(e)
      })
  })

  return res.status(201).send()
}
