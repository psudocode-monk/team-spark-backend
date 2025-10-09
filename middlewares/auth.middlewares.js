import jwt from 'jsonwebtoken'
import { User } from '../models/user.models.js'

export const authUserMiddleware = async (req, res, next) => {
  const token = req.cookies.token
  if (!token) {
    return res.status(401).send({ message: 'No token provided' })
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.id)

    if (!user) {
      return res.status(401).send({ message: 'User not found' })
    }

    req.user = user

    next()
  } catch (err) {
    return res.status(401).send({ message: 'Invalid token' })
  }
}

export const authAgentMiddleware = async (req, res, next) => {}
