const express = require('express')
const router = express.Router()
const apiRoutes = express.Router()
const Application = require(process.cwd() + '/src/server/controllers/application')
const Boardgames = require(process.cwd() + '/src/server/controllers/boardgames')
const Movies = require(process.cwd() + '/src/server/controllers/movies')
const Users = require(process.cwd() + '/src/server/controllers/users')
const Util = require(process.cwd() + '/src/server/lib/util')

// TODO DELETE
// router.get('/error', application.error);
// router.get('/test', application.test);

// Render home page
const homeRoutes = ['/', '/login', '/search', '/about', '/my', '/boardgames(/:id)?', '/boardgames/family/:id', '/movies/now_playing', '/movies/popular', '/movies/top_rated', '/movies/upcoming', '/movies(/:id)?']
router.get(homeRoutes, Application.index)
// router.get('/config', Application.config)
router.get('/db', Application.db)

router.use('/api', apiRoutes)

apiRoutes.get('/boardgames/hot', Boardgames.hot)
apiRoutes.get('/boardgames/search', Boardgames.search)
apiRoutes.post('/boardgames/search', Boardgames.search)
apiRoutes.get('/boardgames/family/:id', Boardgames.family)
apiRoutes.get('/boardgames/:id', Boardgames.show)

apiRoutes.get('/movies/now_playing', Movies.nowPlaying)
apiRoutes.get('/movies/popular', Movies.popular)
apiRoutes.get('/movies/top_rated', Movies.topRated)
apiRoutes.get('/movies/upcoming', Movies.upcoming)
apiRoutes.get('/movies/:id', Movies.show)

apiRoutes.post('/users/register', Users.register)
apiRoutes.post('/users/login', Users.login)
apiRoutes.post('/users/logout', Util.authenticate, Users.logout)
apiRoutes.get('/users/collections', Util.authenticate, Users.collections)
apiRoutes.get('/users/collections', Util.authenticate, Util.asyncMiddleware(Users.collections))
apiRoutes.post('/users/collections/addToWatchlist', Util.authenticate, Util.asyncMiddleware(Users.addToWatchlist))
apiRoutes.post('/users/collections/removeFromWatchlist', Util.authenticate, Util.asyncMiddleware(Users.removeFromWatchlist))
apiRoutes.put('/users/:id', Util.authenticate, Users.update)

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
