<<<<<<< HEAD
import mongoose from 'mongoose'

const User = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
}, { timestamps: true })

=======
import mongoose from 'mongoose'

const User = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' }, 
  passwordResetToken: {type:String},
  passwordResetExpires: {type:Date},

}, { timestamps: true })

>>>>>>> 6e0319bb10720f2f1f48d962d5a2aa4c9d66acc9
export default mongoose.model('User', User)