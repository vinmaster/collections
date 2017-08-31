/* eslint-env mocha */

const app = require(process.cwd() + '/src/server')
const chai = require('chai')
const request = require('supertest')
const SpecHelper = require(process.cwd() + '/test/specHelper')
const User = require(process.cwd() + '/src/server/models/user')
const Movie = require(process.cwd() + '/src/server/models/movie')

const expect = chai.expect

describe('users controller', () => {
  afterEach(() => SpecHelper.dropDatabase())

  describe('POST /api/users/register', () => {
    it('should register user', () => {
      async function wrap() {
        const username = 'test username'
        const res = await request(app)
          .post('/api/users/register')
          .send({
            username: username,
            password: 'test password',
          })
        const user = await User.findOne()
        expect(res.status).equal(200)
        expect(res.body.response.password).not.equal('test password')
        expect(user.username).equal(username)
      }
      return wrap()
    })

    it('should not register duplicate username', () => {
      async function wrap() {
        const username = 'test username'
        const password = 'test password'
        await new User({ username, password }).save()
        const res = await request(app)
          .post('/api/users/register')
          .send({ username, password })
        const user = await User.findOne()
        const users = await User.find()
        expect(res.status).equal(400)
        expect(user.username).equal(username)
        expect(users.length).equal(1)
      }
      return wrap()
    })
  })

  describe('POST /api/users/login', () => {
    it('should return true when logged in', () => {
      async function wrap() {
        const user = new User({
          username: 'test username',
          password: 'test password',
        })
        await user.save()
        return request(app)
          .post('/api/users/login')
          .send({
            username: 'test username',
            password: 'test password',
          })
          .then((res) => {
            expect(res.status).equal(200)
            expect(res.body.response.success).equal(true)
            expect(res.body.response.accessToken).not.equal(null)
          })
      }
      return wrap()
    })

    it('should return false when given wrong username', () => {
      async function wrap() {
        const user = new User({
          username: 'test username',
          password: 'test password',
        })
        await user.save()
        return request(app)
          .post('/api/users/login')
          .send({
            username: 'wrong username',
            password: 'wrong password',
          })
          .then((res) => {
            expect(res.status).equal(200)
            expect(res.body.response.success).equal(false)
            expect(res.body.response.accessToken).equal(null)
          })
      }
      return wrap()
    })

    it('should return false when given wrong password', () => {
      async function wrap() {
        const user = new User({
          username: 'test username',
          password: 'test password',
        })
        await user.save()
        return request(app)
          .post('/api/users/login')
          .send({
            username: 'test username',
            password: 'wrong password',
          })
          .then((res) => {
            expect(res.status).equal(200)
            expect(res.body.response.success).equal(false)
            expect(res.body.response.accessToken).equal(null)
          })
      }
      return wrap()
    })
  })

  describe('POST /api/users/logout', () => {
    it('should return success true when user is logged in', () => {
      async function wrap() {
        const user = new User({
          username: 'test username',
          password: 'test password',
        })
        await user.save()
        return request(app)
          .post('/api/users/logout')
          .send({
            accessToken: user.accessToken,
          })
          .then((res) => {
            expect(res.statusCode).equal(200)
            expect(res.body.response.success).equal(true)
          })
      }
      return wrap()
    })

    it('should return success false when user is not logged in', () => {
      return request(app)
        .post('/api/users/logout')
        .then((res) => {
          expect(res.statusCode).equal(400)
          expect(res.body.error.message).equal('User not found')
        })
    })
  })

  describe('PUT /api/users/:id', () => {
    it('should update user attributes', () => {
      async function wrap() {
        const user = new User({
          username: 'test username',
          password: 'test password',
          moviesWatchList: [],
        })
        await user.save()
        const movie = await new Movie().save()
        const moviesWatchList = [movie._id]
        return request(app)
          .put(`/api/users/${user.id}`)
          .send({
            moviesWatchList,
            accessToken: user.accessToken,
          })
          .then((res) => {
            expect(res.statusCode).equal(200)
            expect(res.body.response.moviesWatchList[0]).eql(moviesWatchList[0].toString())
          })
      }
      return wrap()
    })
  })

  describe('POST /api/users/collections/addToWatchlist', () => {
    it('should add movie to watchlist', () => {
      async function wrap() {
        let user = new User({
          username: 'test username',
          password: 'test password',
          accessToken: 'test',
          moviesWatchList: [],
        })
        await user.save()
        const id = 12345
        const movie = await new Movie({ id }).save()
        const res = await request(app)
          .post('/api/users/collections/addToWatchlist')
          .send({
            id: id,
            accessToken: user.accessToken,
          })
        expect(res.statusCode).equal(200)
        user = await User.findOne()
        expect(user.moviesWatchList[0].toString()).equal(movie._id.toString())
        expect(user.moviesWatchList.length).equal(1)
        return
      }
      return wrap()
    })

    it('should add movie to watchlist only once', () => {
      async function wrap() {
        let user = new User({
          username: 'test username',
          password: 'test password',
          accessToken: 'test',
          moviesWatchList: [],
        })
        await user.save()
        const id = 12345
        await new Movie({ id }).save()
        await request(app)
          .post('/api/users/collections/addToWatchlist')
          .send({
            id: id,
            accessToken: user.accessToken,
          })
        await request(app)
          .post('/api/users/collections/addToWatchlist')
          .send({
            id: id,
            accessToken: user.accessToken,
          })
        user = await User.findOne()
        expect(user.moviesWatchList.length).equal(1)
      }
      return wrap()
    })
  })

  describe('POST /api/users/collections/removeFromWatchlist', () => {
    it('should remove movie to watchlist', () => {
      async function wrap() {
        let user = new User({
          username: 'test username',
          password: 'test password',
          accessToken: 'test',
          moviesWatchList: [],
        })
        await user.save()
        const id = 12345
        const movie = await new Movie({ id }).save()
        user = await User.findOne()
        user.moviesWatchList.push(movie)
        await user.save()
        const res = await request(app)
          .post('/api/users/collections/removeFromWatchlist')
          .send({
            id: id,
            accessToken: user.accessToken,
          })
        expect(res.statusCode).equal(200)
        user = await User.findOne()
        expect(user.moviesWatchList.length).equal(0)
        return
      }
      return wrap()
    })
  })


})
