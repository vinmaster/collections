const express = require('express')
const router = express.Router()
const apiRoutes = express.Router()
const Application = require(process.cwd() + '/src/server/controllers/application')
const Boardgames = require(process.cwd() + '/src/server/controllers/boardgames')
const Util = require(process.cwd() + '/src/server/lib/util')

// TODO DELETE
// router.get('/error', application.error);
// router.get('/test', application.test);

// Render home page
const homeRoutes = ['/', '/search', '/about', '/my', '/boardgames(/:id)?', '/boardgames/family/:id']
router.get(homeRoutes, Application.index)
// router.get('/config', Application.config)
router.get('/db', Application.db)

router.use('/api', apiRoutes)
apiRoutes.get('/boardgames/hot', Boardgames.hot)
apiRoutes.get('/boardgames/search', Boardgames.search)
apiRoutes.post('/boardgames/search', Boardgames.search)
apiRoutes.get('/boardgames/family/:id', Boardgames.family)
apiRoutes.get('/boardgames/:id', Boardgames.show)

// Unmatched routes
router.use((req, res, next) => {
  // Send to error
  next(Util.createError('Not Found', 404))
})

// Matching errors
router.use((err, req, res, next) => {
  Util.renderErrorJson(res, err)
})

module.exports = router
