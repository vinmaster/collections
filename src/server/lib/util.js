const CircularJSON = require('circular-json')
const Logger = require(process.cwd() + '/src/server/lib/logger')
const User = require(process.cwd() + '/src/server/models/user')

class Util {
  static asyncMiddleware(fn) {
    return (req, res, next) => {
      Promise.resolve(fn(req, res, next)).catch((err) => Util.renderErrorJson(res, err))
    }
  }

  static authenticate(req, res, next) {
    async function wrap() {
      const accessToken = req.query.accessToken || req.body.accessToken
      const user = await User.findOne({ accessToken })
      if (user) {
        req.user = user
        next()
      } else {
        next(Util.createError('User not found'))
      }
    }
    return wrap()
  }

  // Success JSON
  static renderJson(res, response, meta = null) {
    return res.json({
      status: 200,
      response: response,
      meta: meta,
      error: null
    })
  }

  static renderBadJson(res, message) {
    Util.renderErrorJson(res, Util.createError(message))
  }

  static renderErrorJson(res, err) {
    if (!(err instanceof Error)) { err = Util.createError(err, 500) }

    const status = err.status || 500
    if (status === 404) {
      // Don't show stack to public
      err.stack = undefined
    } else {
      Logger.error(err)
    }

    return res.status(status).json({
      status: status,
      response: null,
      meta: null,
      error: {
        message: err.message,
        obj: CircularJSON.stringify(err),
        stack: err.stack
      }
    })
  }

  // Function for creating Error object
  static createError(message, status = 400) {
    if (message instanceof Error) {
      return message
    }

    const err = new Error(message)
    err.status = status
    return err
  }
}

module.exports = Util
