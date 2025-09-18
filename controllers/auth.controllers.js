import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/user.models.js'

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

    res.status(200).send({ user: { id: user._id, name: user.name, email: user.email } })

  } catch (error) {
    res.status(500).send({ message: 'Server error' })
  }
}

export const logoutUser = (req, res) => {
  res.clearCookie('token')
  res.status(200).send({ message: 'Logged out successfully' })
}