import Api from 'store/api'
import Vue from 'vue'

const state = {
  hot: [],
  boardgames: {},
  search: [],
  searchQuery: '',
  error: null,
}

const types = {
  FETCHING: 'FETCHING',
  FETCHED: 'FETCHED',
  FETCHED_HOT: 'FETCHED_HOT',
  FETCHED_BOARDGAME: 'FETCHED_BOARDGAME',
  FAIL_FETCH: 'FAIL_FETCH',
  FETCHED_SEARCH: 'FETCHED_SEARCH',
  SEARCH_QUERY: 'SEARCH_QUERY',
}

const getters = {
  boardgames: (state) => state.boardgames,
  hotBoardgames: (state) => state.hot,
}

const actions = {
  fetchHotBoardgames({ commit }) {
    commit(types.FETCHING, null, { root: true })
    Api.getHotBoardgames().then((response) => {
      commit(types.FETCHED, null, { root: true })
      commit(types.FETCHED_HOT, { boardgames: response.data.response })
    }).catch((err) => {
      commit(types.FETCHED, null, { root: true })
      commit(types.FAIL_FETCH, { error: err.response.data.error })
    })
  },
  fetchBoardgame({ commit }, id) {
    commit(types.FETCHING, null, { root: true })
    Api.getBoardgame(id).then((response) => {
      commit(types.FETCHED, null, { root: true })
      commit(types.FETCHED_BOARDGAME, { id: id, boardgame: response.data.response })
    }).catch((err) => {
      commit(types.FETCHED, null, { root: true })
      commit(types.FAIL_FETCH, { error: err.response.data.error })
    })
  },
  boardgameSearch({ commit }, query) {
    commit(types.FETCHING, null, { root: true })
    commit(types.SEARCH_QUERY, query, { root: true })
    Api.boardgameSearch(query).then((response) => {
      commit(types.FETCHED, null, { root: true })
      commit(types.FETCHED_SEARCH, { boardgames: response.data.response }, { root: true })
    }).catch((err) => {
      commit(types.FETCHED, null, { root: true })
      commit(types.FAIL_FETCH, { error: err.response.data.error })
    })
  }
}

const mutations = {
  [types.FETCHED_HOT](state, { boardgames }) {
    state.hot = boardgames
  },
  [types.FETCHED_BOARDGAME](state, { id, boardgame }) {
    Vue.set(state.boardgames, id, boardgame)
  },
  [types.FAIL_FETCH](state, { error }) {
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
