import { Router } from 'express'

import {
  loginUser,
  logoutUser,
  registerUser
} from '../controllers/auth.controllers.js'

const authRouter = Router()

// user auth routes

authRouter.post('/user/register', registerUser)
authRouter.post('/user/login', loginUser)
authRouter.get('/user/logout', logoutUser)

export default authRouter