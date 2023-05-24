const jwt = require('jsonwebtoken')

exports.required = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const decode = jwt.verify(token, process.env.JWT_KEY)
    req.user = decode
    const user = JSON.parse(
      Buffer.from(token.split('.')[1], 'base64').toString(),
    )
    console.log('User: ', user.cd_user)
    req.user.id = user.cd_user
    next()
  } catch (e) {
    return res.status(401).json({ message: 'falha na autenticação' })
  }
}
exports.optional = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const decode = jwt.verify(token, process.env.JWT_KEY)
    req.user = decode
    next()
  } catch (e) {
    next()
  }
}
