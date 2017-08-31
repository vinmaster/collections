import Vue from 'vue'
import Vuex from 'vuex'
import Api from 'store/api'
import createLogger from 'client/lib/logger'
import boardgames from './modules/boardgames'
import movies from './modules/movies'
import router from 'client/routes'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const types = {
  FETCHING: 'FETCHING',
  FETCHED: 'FETCHED',
  FETCHED_SEARCH: 'FETCHED_SEARCH',
  SEARCH_QUERY: 'SEARCH_QUERY',
  LOGIN: 'LOGIN',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAIL: 'LOGIN_FAIL',
  LOGOUT: 'LOGOUT',
  MY_COLLECTIONS: 'MY_COLLECTIONS',
  COLLECTIONS_CHANGED: 'COLLECTIONS_CHANGED',
}

const state = {
  isLoading: false,
  error: null,
  search: [],
  searchQuery: '',
  accessToken: localStorage.getItem('accessToken') || '',
  loginError: '',
  collections: {},
}

const getters = {
  isLoading: (state) => state.isLoading,
  search: (state) => state.search,
  searchQuery: (state) => state.searchQuery,
  accessToken: (state) => state.accessToken,
  loginError: (state) => state.loginError,
  collections: (state) => state.collections,
}

const actions = {
  fetching({ commit }) {
    commit(types.FETCHING)
  },
  fetched({ commit }) {
    commit(types.FETCHED)
  },
  login({ commit }, { username, password }) {
    commit(types.FETCHING)
    Api.login(username, password).then((response) => {
      commit(types.FETCHED)
      if (response.data.response.success) {
        commit(types.LOGIN_SUCCESS, { accessToken: response.data.response.accessToken })
      } else {
        commit(types.LOGIN_FAIL, { error: 'Login failed' })
      }
    }).catch((err) => {
      commit(types.FETCHED)
      commit(types.LOGIN_FAIL, { error: err.response.data.error })
    })
  },
  logout({ commit }) {
    commit(types.LOGOUT)
  },
  fetchMyCollections({ commit, state }) {
    commit(types.FETCHING)
    Api.getMyCollections(state.accessToken).then((response) => {
      commit(types.FETCHED)
      if (response.data.status === 200) {
        commit(types.MY_COLLECTIONS, { collections: response.data.response })
      }
    }).catch((err) => {
      commit(types.FETCHED)
      console.error(err.response)
    })
  },
  addToWatchlist({ commit, state, dispatch }, id) {
    Api.addToWatchlist(state.accessToken, id).then((response) => {
      commit(types.FETCHED)
      if (response.data.status === 200) {
        dispatch('fetchMyCollections')
      }
    }).catch((err) => {
      commit(types.FETCHED)
      console.error(err.response)
    })
  },
  removeFromWatchlist({ commit, state, dispatch }, id) {
    Api.removeFromWatchlist(state.accessToken, id).then((response) => {
      commit(types.FETCHED)
      if (response.data.status === 200) {
        dispatch('fetchMyCollections')
      }
    }).catch((err) => {
      commit(types.FETCHED)
      console.error(err.response)
    })
  },
}

const mutations = {
  [types.FETCHING](state) {
    state.isLoading = true
  },
  [types.FETCHED](state) {
    state.isLoading = false
  },
  [types.FETCHED_SEARCH](state, { boardgames }) {
    state.search = boardgames
  },
  [types.SEARCH_QUERY](state, query) {
    state.searchQuery = query
  },
  [types.LOGIN_SUCCESS](state, { accessToken }) {
    state.accessToken = accessToken
    localStorage.setItem('accessToken', accessToken)
    router.push({ path: '/my' })
  },
  [types.LOGIN_FAIL](state, { error }) {
    state.loginError = error
  },
  [types.LOGOUT](state) {
    state.accessToken = ''
    localStorage.removeItem('accessToken')
  },
  [types.MY_COLLECTIONS](state, { collections }) {
    state.collections = collections
  },
}

const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  modules: {
    boardgames,
    movies,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})

// Hot reload each modules
if (module.hot) {
  module.hot.accept([
    './modules/boardgames',
    './modules/movies',
  ], () => {
    store.hotUpdate({
      modules: {
        boardgames: require('./modules/boardgames').default,
        movies: require('./modules/movies').default,
      }
    })
  })
}

export default store
