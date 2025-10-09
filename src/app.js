<<<<<<< HEAD
import express from 'express'
import cookieParser from 'cookie-parser'
import authRouter from '../routes/auth.routes.js'

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRouter)

=======
import express from 'express'
import cookieParser from 'cookie-parser'
import authRouter from '../routes/auth.routes.js'

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRouter)

//demo route.. 
app.get('/',(req,res)=>{
    res.send("<h1>This is the Backend of The Project Bharat Yatra -by Team Spark.. </h1>")
})

>>>>>>> 6e0319bb10720f2f1f48d962d5a2aa4c9d66acc9
export default app