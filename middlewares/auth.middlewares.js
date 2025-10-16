import jwt from "jsonwebtoken"
import User from "../models/user.models.js"

// Middleware for authenticating normal users & admins
export const authUserMiddleware = async (req, res, next) => {
  const token = req.cookies.token

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." })
  }

  try {
    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // Find the user using the ID stored in token
    const user = await User.findById(decoded.userId).select("-password")
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    // Attach user data to request
    req.user = user
    req.role = user.role  // "user" or "admin"

    next()
  } catch (error) {
    console.error("User Auth Error:", error)
    return res.status(401).json({ message: "Invalid or expired token" })
  }
}

// Middleware for authenticating agents
export const authAgentMiddleware = async (req, res, next) => {
  
}
