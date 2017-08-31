const Util = require(process.cwd() + '/src/server/lib/util')
const Logger = require(process.cwd() + '/src/server/lib/logger')
const User = require(process.cwd() + '/src/server/models/user')
const Movie = require(process.cwd() + '/src/server/models/movie')

module.exports = class Users {
  static register(req, res, next) {
    async function wrap() {
      const username = req.body.username
      const password = req.body.password
      const user = new User({ username, password })
      try {
        await user.save()
      } catch (e) {
        throw Util.createError(e.message)
      }
      Util.renderJson(res, user)
    }
    wrap().catch((err) => Util.renderErrorJson(res, err))
  }

  static login(req, res, next) {
    async function wrap() {
      const username = req.body.username
      const password = req.body.password
      const user = await User.findOne({ username })
      if (user && await user.verifyPassword(password)) {
        if (!user.accessToken) {
          await user.generateAccessToken()
        }
        Util.renderJson(res, {
          success: true,
          accessToken: user.accessToken,
        })
      } else {
        Util.renderJson(res, {
          success: false,
          accessToken: null,
        })
      }
    }
    wrap().catch((err) => Util.renderErrorJson(res, err))
  }

  static logout(req, res, next) {
    async function wrap() {
      const user = req.user
      user.accessToken = null
      await user.save()
      Util.renderJson(res, { success: true })
    }
    wrap().catch((err) => Util.renderErrorJson(res, err))
  }

  static update(req, res, next) {
    async function wrap() {
      const id = req.params.id
      Logger.info('[USER UPDATE] Updating user: ' + id.toString())
      const user = await User.findById(id)
      const attributes = ['moviesWatchList']
      for (const key of attributes) {
        if (req.body[key] !== undefined) {
          user[key] = req.body[key]
        }
      }
      await user.save()
      Util.renderJson(res, user)
    }
    wrap().catch((err) => Util.renderErrorJson(res, err))
  }

  static async collections(req, res, next) {
    let user = req.user
    user = await User.findById(user.id).populate({
      path: 'moviesWatchList',
      model: 'Movie',
    })
    Util.renderJson(res, { moviesWatchList: user.moviesWatchList })
  }

  static async addToWatchlist(req, res, next) {
    let user = req.user
    const id = req.body.id
    const movie = await Movie.findOne({ id })
    user = await user.populate({
      path: 'moviesWatchList',
      model: 'Movie',
    })
    const isIncluded = user.moviesWatchList.indexOf(movie._id) !== -1
    if (!isIncluded) {
      user.moviesWatchList.push(movie)
      await user.save()
    }
    Util.renderJson(res, { moviesWatchList: user.moviesWatchList })
  }

  static async removeFromWatchlist(req, res, next) {
    let user = req.user
    const id = req.body.id
    const movie = await Movie.findOne({ id })
    user = await user.populate({
      path: 'moviesWatchList',
      model: 'Movie',
    })
    const isIncluded = user.moviesWatchList.indexOf(movie._id) !== -1
    if (isIncluded) {
      user.moviesWatchList.pull(movie._id)
      await user.save()
    }
    Util.renderJson(res, { moviesWatchList: user.moviesWatchList })
  }
}
