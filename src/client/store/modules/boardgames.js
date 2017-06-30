import Api from 'store/api'
import Vue from 'vue'

const state = {
  hot: [],
  boardgames: {},
  search: [],
  searchQuery: '',
  isLoading: false,
  error: null,
}

const types = {
  FETCHED_HOT: 'FETCHED_HOT',
  FETCHED_BOARDGAME: 'FETCHED_BOARDGAME',
  FETCHED_SEARCH: 'FETCHED_SEARCH',
  SEARCH_QUERY: 'SEARCH_QUERY',
  FETCHING: 'FETCHING',
  FAIL_FETCH: 'FAIL_FETCH',
}

const getters = {
  boardgames: (state) => state.boardgames,
  hot: (state) => state.hot,
  search: (state) => state.search,
  searchQuery: (state) => state.searchQuery,
  isLoading: (state) => state.isLoading,
  error: (state) => state.error,
}

const actions = {
  fetchHot({ commit }) {
    commit(types.FETCHING)
    Api.getHot().then((response) => {
      commit(types.FETCHED_HOT, { boardgames: response.data.response })
    }).catch((err) => {
      commit(types.FAIL_FETCH, { error: err.response.data.error })
    })
  },
  fetchBoardgame({ commit }, id) {
    commit(types.FETCHING)
    Api.getBoardgame(id).then((response) => {
      commit(types.FETCHED_BOARDGAME, { id: id, boardgame: response.data.response })
    }).catch((err) => {
      commit(types.FAIL_FETCH, { error: err.response.data.error })
    })
  },
  boardgameSearch({ commit }, query) {
    commit(types.FETCHING)
    commit(types.SEARCH_QUERY, query)
    Api.boardgameSearch(query).then((response) => {
      commit(types.FETCHED_SEARCH, { boardgames: response.data.response })
    }).catch((err) => {
      commit(types.FAIL_FETCH, { error: err.response.data.error })
    })
  }
}

const mutations = {
  [types.FETCHED_HOT](state, { boardgames }) {
    state.isLoading = false
    state.hot = boardgames
  },
  [types.FETCHED_BOARDGAME](state, { id, boardgame }) {
    state.isLoading = false
    Vue.set(state.boardgames, id, boardgame)
  },
  [types.FETCHED_SEARCH](state, { boardgames }) {
    state.isLoading = false
    state.search = boardgames
  },
  [types.SEARCH_QUERY](state, query) {
    state.searchQuery = query
  },
  [types.FETCHING](state) {
    state.isLoading = true
  },
  [types.FAIL_FETCH](state, { error }) {
    state.isLoading = false
    state.error = error
    console.error(error)
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
