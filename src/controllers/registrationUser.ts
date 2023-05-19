import knex from '../../database/db'

const bcrypt = require('bcrypt')

export async function registrationUser(req, res) {
  const hash = await bcrypt.hash(
    req.body.password,
    10, // 10,
    // async (errBcrypt, hash) => {
    //   if (errBcrypt) {
    //     return res.status(500).send({ error: errBcrypt })
    //   }
    //   console.log(hash)
    //   return hash
    // },
  )
  const existEmail = await knex('tbl_dti_user')
    .select('ds_email')
    .where('ds_email', `${req.body.email}`)
  if (!existEmail[0]) {
    await knex('tbl_dti_user')
      .insert({
        nm_user: req.body.name,
        ds_email: req.body.email,
        ds_password: hash,
        dt_birth: req.body.birth,
      })
      .then(() => {
        console.log(`Inserting the user: ${req.body.name}`)
      })
      .catch((e) => {
        console.log('ERROR ENTERING THE USER => ')
        console.log(e)
      })
    return res.status(201).send()
  } else {
    return res.status(400).json({ message: 'This email already exists' })
  }
}
