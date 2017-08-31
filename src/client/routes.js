import Vue from 'vue'
import Router from 'vue-router'
import HomePage from 'components/HomePage'
import LoginPage from 'components/LoginPage'
import BoardgamesPage from 'components/BoardgamesPage'
import SearchPage from 'components/SearchPage'
import AboutPage from 'components/AboutPage'
import MyCollectionsPage from 'components/MyCollectionsPage'
import BoardgamePage from 'components/BoardgamePage'
import FamilyPage from 'components/FamilyPage'
import MoviesListPage from 'components/MoviesListPage'
import MoviePage from 'components/MoviePage'
import store from 'client/store'

Vue.use(Router)

const authenticate = (to, from, next) => {
  if (localStorage.getItem('accessToken')) {
    next()
  } else {
    next('/login')
  }
}

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'home', component: HomePage },
    { path: '/login', component: LoginPage },
    { path: '/logout', beforeEnter: (to, from, next) => {
      store.dispatch('logout')
      next({ path: '/' })
    }},
    { path: '/boardgames', component: BoardgamesPage },
    { path: '/search', component: SearchPage },
    { path: '/about', component: AboutPage },
    { path: '/my', component: MyCollectionsPage, beforeEnter: authenticate },
    { path: '/boardgames/:id', component: BoardgamePage },
    { path: '/boardgames/family/:id', component: FamilyPage },
    { path: '/movies/now_playing', component: MoviesListPage },
    { path: '/movies/popular', component: MoviesListPage },
    { path: '/movies/top_rated', component: MoviesListPage },
    { path: '/movies/upcoming', component: MoviesListPage },
    { path: '/movies/:id', component: MoviePage },
  ]
})
