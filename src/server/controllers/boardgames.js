const BGG = require(process.cwd() + '/src/server/lib/bgg')
const Util = require(process.cwd() + '/src/server/lib/util')

module.exports = class Boardgames {
  static hot(req, res, next) {
    async function wrap() {
      const obj = await BGG.hot()
      Util.renderJson(res, obj)
    }
    wrap().catch((err) => Util.renderErrorJson(res, err))
  }
  static family(req, res, next) {
    const id = req.params.id
    async function wrap() {
      const obj = await BGG.getFamilyById(id)
      Util.renderJson(res, obj)
    }
    wrap().catch((err) => Util.renderErrorJson(res, err))
  }
  static show(req, res, next) {
    const id = req.params.id
    async function wrap() {
      const obj = await BGG.getById(id)
      Util.renderJson(res, obj)
    }
    wrap().catch((err) => Util.renderErrorJson(res, err))
  }
  static search(req, res, next) {
    let query = null
    if (req.method === 'GET') {
      query = req.query.q
    } else if (req.method === 'POST') {
      query = req.body.q
    }
    if (query === undefined || query === '') {
      return Util.renderBadJson(res, 'Invalid Request')
    }
    async function wrap() {
      const obj = await BGG.search(query)
      Util.renderJson(res, obj)
    }
    wrap().catch((err) => Util.renderErrorJson(res, err))
  }
}
