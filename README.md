Express & ES6 REST API Auth Boilerplate
==================================

Boilerplate for building REST APIs with ES6 and Express with JWT authentication. It is based on the great boilerplate [express-es6-rest-api](https://github.com/developit/express-es6-rest-api) by [Jason Miller](https://github.com/developit)

- ES6 support via [babel](https://babeljs.io)
- REST resources as middleware via [resource-router-middleware](https://github.com/developit/resource-router-middleware)
- CORS support via [cors](https://github.com/troygoode/node-cors)
- Body Parsing via [body-parser](https://github.com/expressjs/body-parser)
- JWT authentication via [passport](https://github.com/jaredhanson/passport) and [passport-jwt](https://github.com/themikenicholson/passport-jwt)
- Password hashing and salting via [bcrypt](https://github.com/kelektiv/node.bcrypt.js)

> Tip: If you are using [Mongoose](https://github.com/Automattic/mongoose), you can automatically expose your Models as REST resources using [restful-mongoose](https://git.io/restful-mongoose).

Getting Started
---------------

```sh
# clone it
git clone https://github.com/damianmarek/express-es6-rest-api-auth.git
cd express-es6-rest-api-auth

# Make it your own
rm -rf .git && git init && npm init

# Install dependencies
npm install

```
Configuration
-------------
Make `.env` file to store secrets

```
JWT_SECRET = <YOUR_JWT_SECRET>
MONGO_URL = <YOUR_MONGODB_URL>
```
Run server
----------
```sh
# Start development live-reload server
PORT=8080 npm run dev

# Start production server:
PORT=8080 npm start
```
Docker Support
------
First you need to ad ENV variables to Dockerfile

```
ENV JWT_SECRET <YOUR_JWT_SECRET>
ENV MONGO_URL <YOUR_MONGODB_URL>
ENV TEST_MONGO_URL <YOUR_TEST_MONGODB_URL>
```

```sh
cd express-es6-rest-api-auth

Then you can use this commands

# Build your docker
docker build -t es6/api-service .
#            ^      ^           ^
#          tag  tag name      Dockerfile location

# run your docker
docker run -p 8080:8080 es6/api-service
#                 ^            ^
#          bind the port    container tag
#          to your host
#          machine port   

```
License
-------

MIT
