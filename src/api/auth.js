import { Router } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt-nodejs'
import User from '../models/userModel'

const auth = Router()

auth.get('/test', (req, res) => {
  res.json({ message: 'Hello sweetie' })
})

auth.post('/login', (req, res) => {
	if (!req.body.username || !req.body.password) {
		return res.json({ errorMessage: 'Login unsuccessful. Missing required fields.' })
	}
	User.findOne({ username: req.body.username })
	.then(user => {
		console.log(user)
		if(!user) return res.json({ errorMessage: 'No user' })
		bcrypt.compare(req.body.password, user.password, (err, result) => {
			if(result) {
				const token = jwt.sign({id: req.body.username}, process.env.JWT_SECRET)
				return res.json({ message: 'ok', token })
			}
			else {
				return res.json({ errorMessage: 'Bad password' })
			}
		})
	})
	.catch((err) => {
		console.log(err)
		return res.json(err)
	})
})

auth.post('/register', (req, res) => {
	if (!req.body.username || !req.body.password) {
		return res.json({ errorMessage: 'Sign-up unsuccessful. Missing required fields.' })
	}
	User.findOne({ username: req.body.username })
	.then(user => {
		if(user) return res.json({ errorMessage: 'User with this name exists' })
	})
	.then(() => {
		let user = new User({ username: req.body.username, password: req.body.password })
		user.save((err) => {
			if(err) console.log(err)
		})
		res.json(user)
	})
})

auth.get('/isLogged', (req, res) => {
  jwt.verify(req.headers['authorization'], process.env.JWT_SECRET, (err, decoded) => {
    if(err) return res.status(401).json({ message: 'Not logged', isLogged: false })
    else return res.status(200).json({ message: 'Logged' , isLogged: true })
  })
})

export default auth
