import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt'

import initializeDb from './db';
import middleware from './middleware';
import api from './api';
import config from './config';
import passport from 'passport'
import User from './models/userModel'

let app = express();
app.server = http.createServer(app);

// logger
if(process.env.NODE_ENV !== 'test') {
	app.use(morgan('dev'));
}

// 3rd party middleware
app.use(cors({
	exposedHeaders: config.corsHeaders
}));

app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(bodyParser.json({
	limit : config.bodyLimit
}));

app.use(passport.initialize({ session: false }))

const jwtOptions = {
	secretOrKey: config.jwtSecret,
	jwtFromRequest: ExtractJwt.fromHeader('authorization'),
}

passport.serializeUser(function(user, done) {
  done(null, user.username);
})

passport.deserializeUser(function(username, done) {
	User.findOne({ username: username })
	.then((user) => {
		return done(user)
	})
	.catch(done)
})

passport.use('jwt', new JwtStrategy(jwtOptions, (jwt_payload, done) => {
	User.findOne({ username: jwt_payload.id })
	.then(user => {
		if(user) return done(null, user)
		else return done(null, false)
	})
}))

// connect to db
initializeDb( db => {

	// internal middleware
	app.use(middleware({ config, db }));

	// api router
	app.use('/api', api({ config, db }));

	app.server.listen(process.env.PORT || config.port);

	console.log(`Started on port ${app.server.address().port}`);
});

export default app;
