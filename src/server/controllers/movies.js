const TMDB = require(process.cwd() + '/src/server/lib/tmdb')
const Util = require(process.cwd() + '/src/server/lib/util')

module.exports = class Movies {
  static nowPlaying(req, res, next) {
    async function wrap() {
      const obj = await TMDB.nowPlaying()
      Util.renderJson(res, obj)
    }
    wrap().catch((err) => Util.renderErrorJson(res, err))
  }
  static popular(req, res, next) {
    async function wrap() {
      const obj = await TMDB.popular()
      Util.renderJson(res, obj)
    }
    wrap().catch((err) => Util.renderErrorJson(res, err))
  }
  static topRated(req, res, next) {
    async function wrap() {
      const obj = await TMDB.topRated()
      Util.renderJson(res, obj)
    }
    wrap().catch((err) => Util.renderErrorJson(res, err))
  }
  static upcoming(req, res, next) {
    async function wrap() {
      const obj = await TMDB.upcoming()
      Util.renderJson(res, obj)
    }
    wrap().catch((err) => Util.renderErrorJson(res, err))
  }
  static show(req, res, next) {
    const id = req.params.id
    async function wrap() {
      const obj = await TMDB.getMovieById(id)
      Util.renderJson(res, obj)
    }
    wrap().catch((err) => Util.renderErrorJson(res, err))
  }
}
