import Vue from 'vue'
import Router from 'vue-router'
import HomePage from 'components/HomePage'
import SearchPage from 'components/SearchPage'
import AboutPage from 'components/AboutPage'
import MyPage from 'components/MyPage'
import BoardgamePage from 'components/BoardgamePage'
import FamilyPage from 'components/FamilyPage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'home', component: HomePage },
    { path: '/search', component: SearchPage },
    { path: '/about', component: AboutPage },
    { path: '/my', component: MyPage },
    { path: '/boardgames/:id', component: BoardgamePage },
    { path: '/boardgames/family/:id', component: FamilyPage },
  ]
})
