import { Schema } from 'mongoose'
import bcrypt from 'bcrypt-nodejs'

const userSchema = new Schema({
  username: String,
  password: String,
})

userSchema.pre('save', function(next) {
  let user = this
  let saltRounds = 5

  if (!user.isModified('password')) return next()

  bcrypt.genSalt(saltRounds, (err, salt) => {
    if (err) return next(err)
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) return next(err)
      user.password = hash;
      next()
    })
  })
})

export default userSchema
