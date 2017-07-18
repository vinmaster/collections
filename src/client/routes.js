import Vue from 'vue'
import Router from 'vue-router'
import HomePage from 'components/HomePage'
import BoardgamesPage from 'components/BoardgamesPage'
import SearchPage from 'components/SearchPage'
import AboutPage from 'components/AboutPage'
import MyCollectionsPage from 'components/MyCollectionsPage'
import BoardgamePage from 'components/BoardgamePage'
import FamilyPage from 'components/FamilyPage'
import MoviesListPage from 'components/MoviesListPage'
import MoviePage from 'components/MoviePage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'home', component: HomePage },
    { path: '/boardgames', component: BoardgamesPage },
    { path: '/search', component: SearchPage },
    { path: '/about', component: AboutPage },
    { path: '/my', component: MyCollectionsPage },
    { path: '/boardgames/:id', component: BoardgamePage },
    { path: '/boardgames/family/:id', component: FamilyPage },
    { path: '/movies/now_playing', component: MoviesListPage },
    { path: '/movies/popular', component: MoviesListPage },
    { path: '/movies/top_rated', component: MoviesListPage },
    { path: '/movies/upcoming', component: MoviesListPage },
    { path: '/movies/:id', component: MoviePage },
  ]
})
