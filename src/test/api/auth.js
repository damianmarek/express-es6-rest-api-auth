import chai from 'chai'
import chaiHttp from 'chai-http'
import server from '../../index'
import User from '../../models/userModel'

let should = chai.should()

chai.use(chaiHttp)

describe('Auth', () => {

  beforeEach((done) => {
    User.remove({}).then(() => {
      done()
    }).catch(err => {
      done()
    })
  })


  describe('/POST register', () => {

    it('it should not register user without username', done => {
      let user = {
          password: 'password'
        }
      chai.request(server)
      .post('/api/auth/register')
      .send(user)
      .end((err, res) => {
        res.should.have.status(400)
        res.body.should.have.property('message')
        done()
      })
    })

    it('it should not register user without password', done => {
      let user = {
          username: 'username'
        }
      chai.request(server)
      .post('/api/auth/register')
      .send(user)
      .end((err, res) => {
        res.should.have.status(400)
        res.body.should.have.property('message')
        done()
      })
    })

    it('it should not register user with too short username', done => {
      let user = {
        username: 'us',
        password: 'password'
      }
      chai.request(server)
      .post('/api/auth/register')
      .send(user)
      .end((err, res) => {
        res.should.have.status(400)
        res.body.should.have.property('message')
        done()
      })
    })

    it('it should not register user with too short password', done => {
      let user = {
        username: 'username',
        password: 'mar'
      }
      chai.request(server)
      .post('/api/auth/register')
      .send(user)
      .end((err, res) => {
        res.should.have.status(400)
        res.body.should.have.property('message')
        done()
      })
    })
  })

  describe('/POST login', () => {
    it('it should return jwt on successful login', done => {
      const userData = {
        username: 'username',
        password: 'password'
      }
      const user = new User(userData)
      user.save()

      chai.request(server)
      .post('/api/auth/login')
      .send(userData)
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.have.property('token')
        done()
      })
    })

    it('it should not login with incorrect password', done => {
      const userData = {
        username: 'username',
        password: 'password'
      }
      const wrongUserData = {
        username: 'username',
        password: 'wrongpassword'
      }

      const user = new User(userData)
      user.save()

      chai.request(server)
      .post('/api/auth/login')
      .send(wrongUserData)
      .end((err, res) => {
        res.should.have.status(400)
        res.body.should.have.property('message')
        done()
      })
    })

    it('it should not login to nonexistent account', done => {
      const userData = {
        username: 'username',
        password: 'password'
      }

      chai.request(server)
      .post('/api/auth/login')
      .send(userData)
      .end((err, res) => {
        res.should.have.status(400)
        res.body.should.have.property('message')
        res.body.message.should.be.eql('No user')
        done()
      })
    })

    it('it should not login without username', done => {
      const userData = {
        password: 'password'
      }

      chai.request(server)
      .post('/api/auth/login')
      .send(userData)
      .end((err, res) => {
        res.should.have.status(400)
        res.body.should.have.property('message')
        res.body.message.should.be.eql('Missing required fields')
        done()
      })
    })


    it('it should not login without password', done => {
      const userData = {
        username: 'username'
      }

      chai.request(server)
      .post('/api/auth/login')
      .send(userData)
      .end((err, res) => {
        res.should.have.status(400)
        res.body.should.have.property('message')
        res.body.message.should.be.eql('Missing required fields')
        done()
      })
    })
  })
})
