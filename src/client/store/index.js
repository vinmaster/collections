import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'client/lib/logger'
import boardgames from './modules/boardgames'
import movies from './modules/movies'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const types = {
  FETCHING: 'FETCHING',
  FETCHED: 'FETCHED',
  FETCHED_SEARCH: 'FETCHED_SEARCH',
  SEARCH_QUERY: 'SEARCH_QUERY',
}

const state = {
  isLoading: false,
  error: null,
  search: [],
  searchQuery: '',
}

const getters = {
  isLoading: (state) => state.isLoading,
  search: (state) => state.search,
  searchQuery: (state) => state.searchQuery,
}

const actions = {
  fetching({ commit }) {
    commit(types.FETCHING)
  },
  fetched({ commit }) {
    commit(types.FETCHED)
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
