import userSchema from '../schemas/userSchema'
import mongoose from 'mongoose'

const User = mongoose.model('user', userSchema)
export default User
