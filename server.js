import dotenv from 'dotenv'
dotenv.config()

import app from './src/app.js'
import { connectDB } from './config/database.config.js'

const port = process.env.PORT || 3000

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log('Server is running on port', port)
    })
  })
  .catch((error) => {
    console.error('Failed to connect to the database:', error)
  })
