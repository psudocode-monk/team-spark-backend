import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/user.models.js'
import {transporter} from '../services/mailTransporter.js'
import crypto from 'crypto'

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body
  try {

    // Check if user already exists

    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return res.status(400).send({ message: 'User already exists' })
    }

    // Hash the password

    const hashedPassword = await bcrypt.hash(password, 10)

    // Create a new user

    const newUser = new User({ name, email, password: hashedPassword })
    await newUser.save()

    // Generate a JWT token

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' })

    // Set token in HTTP-only cookie

    res.cookie('token', token, { httpOnly: true })

    res.status(201).send({ user: { id: newUser._id, name: newUser.name, email: newUser.email } })

  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

export const loginUser = async (req, res) => {
  const { email, password } = req.body
  try {
    // Find the user by email
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).send({ message: 'Invalid credentials' })
    }

    // Compare the password

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).send({ message: 'Invalid credentials' })
    }

    // Generate a JWT token

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' })

    // Set token in HTTP-only cookie
    res.cookie('token', token, { httpOnly: true })

    res.status(200).send({ message:"success",user: { id: user._id, name: user.name, email: user.email } })

  } catch (error) {
    res.status(500).send({ message: 'Server error' })
  }
}

export const logoutUser = (req, res) => {
  res.clearCookie('token')
  res.status(200).send({ message: 'Logged out successfully' })
}

export const sendResetPasswordMail = async (req,res)=>{

  // this is for sending a email to the user to reset the password of their account.
  const {email} = req.body

  // Try to find the user in the Database 
  try{

    const user = await User.findOne({email})

    if (user) {
        //  Generate token
        const resetToken = crypto.randomBytes(32).toString('hex')
        user.passwordResetToken = resetToken

        //  Set expiration (10 minutes from now)
        user.passwordResetExpires = Date.now() + 10 * 60 * 1000
        await user.save();

        //  Create the reset URL
        const resetURL = `http://localhost:${process.env.PORT || 3000}api/auth/user/reset-password/${resetToken}`

        const mailOptions = {
            from: 'Team Spark <team.spark.sih.2025@gmail.com>',
            to: user.email,                           
            subject: 'Password Reset Link',           
            html: `<p>You requested a password reset. Please click the link below to reset your password:</p>
                  <a href="${resetURL}">Reset Password</a>
                  <p>This link will expire in 10 minutes.</p>` 
        };

        await transporter.sendMail(mailOptions)

        
      }
      
      //  Send success response to the user
      res.status(200).json({ message: "If an account with that email exists, a password reset link has been sent." });
  }
  catch(error){
    res.status(500).json({message:"Internal Server Error"})
    console.error(error)
  }
}

export const varifyResetPasswordToken = async(req,res)=>{
  // this is for the frontend to check the validity of the token to reset the password
    const {token} = req.params

    try{
        const user = await User.findOne({ 
            passwordResetToken: token,
            passwordResetExpires: { $gt: Date.now() } 
        })

      if(!user)
          res.status(401).json({message:"Token to reset the password is expired"})
      
      res.status(200).json({message:"varified"})

    }catch(error){
      res.status(500).json({message:"Internal Server Error"})
    }
}

export const resetPassword = async(req,res)=>{
    // this actually reset the password of the user 
  const { password, confirmPassword } = req.body;
    const { token } = req.params;


        try {

        const user = await User.findOne({ 
            passwordResetToken: token,
            passwordResetExpires: { $gt: Date.now() } 
        });

        // If token is invalid or expired, send an error
        if (!user) {
            return res.status(400).json({ message: "Password reset token is invalid or has expired." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        user.password = hashedPassword;
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;

        await user.save();

        res.status(200).json({ message: "Password has been reset successfully." });

    } catch (error) {
        res.status(500).json({ message: "An internal server error occurred." });
        console.error(error);
    }

}