import knex from '../../database/db'
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

export async function loginUser(req, res) {
  const existEmail = await knex('tbl_dti_user')
    .select('*')
    .where('ds_email', `${req.body.email}`)

  if (!existEmail[0]) {
    return res.status(401).json({ message: 'Authentication failed.' })
  }
  console.log(existEmail[0].ds_password)
  bcrypt.compare(
    req.body.password,
    existEmail[0].ds_password,
    (err, result) => {
      if (err) {
        return res.status(401).json({ message: 'Authentication failed.' })
      }
      if (result) {
        const token = jwt.sign(
          {
            cd_user: existEmail[0].cd_user,
            nm_user: existEmail[0].nm_user,
            ds_email: existEmail[0].ds_email,
          },
          process.env.JWT_KEY,
          {
            expiresIn: '1h',
          },
        )
        res.status(200).json({
          message: 'autenticado com sucsso',
          token,
          id: existEmail[0].cd_user,
        })
      } else {
        return res.status(401).json({ message: 'Authentication failed.' })
      }
    },
  )
}
