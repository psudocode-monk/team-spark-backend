import { Router } from 'express'

import {
  loginUser,
  logoutUser,
  registerUser,
  sendResetPasswordMail,
  resetPassword,
  varifyResetPasswordToken
} from '../controllers/auth.controllers.js'

const authRouter = Router()

// user auth routes

authRouter.post('/user/register', registerUser)
authRouter.post('/user/login', loginUser)
authRouter.get('/user/logout', logoutUser)

// route to send the mail to the user for reseting the password
authRouter.post('/user/forget',sendResetPasswordMail)

// only to varify the token for the reset of the password. 
authRouter.get('/user/reset-password/:token',varifyResetPasswordToken)
// reset the password if the new Credentials are Provided.. 

authRouter.post('/user/reset-password/:token',resetPassword)

export default authRouter