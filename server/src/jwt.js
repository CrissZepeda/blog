import jwt from 'jsonwebtoken'
const SECRET_KEY = 'react2023'

export const generateToken = (payload) => {
  return jwt.sign(payload, SECRET_KEY)
}

/* export const validateToken = (token) => {
  try {
    return jwt.verify(token, SECRET_KEY)
  } catch (error) {
    return false
  }
} */

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split('.')[1]
  console.log(authHeader)
  if (token == null) return res.status(401).send('Token requeridos')
  jwt.verify(token, TOKEN_KEY, (err, user) => {
    if (err) return res.status(403).send('Token invalido')
    console.log(user)
    req.user = user
    next()
  })
}
