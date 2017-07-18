import Api from 'store/api'
import Vue from 'vue'

const state = {
  movieList: [],
  movies: {},
}

const types = {
  FETCHING: 'FETCHING',
  FETCHED: 'FETCHED',
  FETCHED_NOW_PLAYING: 'FETCHED_NOW_PLAYING',
  FETCHED_POPULAR: 'FETCHED_POPULAR',
  FETCHED_TOP_RATED: 'FETCHED_TOP_RATED',
  FETCHED_UPCOMING: 'FETCHED_UPCOMING',
  FETCHED_MOVIE: 'FETCHED_MOVIE',
  FAIL_FETCH: 'FAIL_FETCH',
}

const getters = {
  movies: (state) => state.movies,
  movieList: (state) => state.movieList,
}

const actions = {
  fetchNowPlaying({ commit }) {
    commit(types.FETCHING, null, { root: true })
    Api.getNowPlaying().then((response) => {
      commit(types.FETCHED, null, { root: true })
      commit(types.FETCHED_NOW_PLAYING, { movies: response.data.response.results })
    }).catch((err) => {
      commit(types.FETCHED, null, { root: true })
      commit(types.FAIL_FETCH, { error: err.response.data.error })
    })
  },
  fetchPopular({ commit }) {
    commit(types.FETCHING, null, { root: true })
    Api.getPopular().then((response) => {
      commit(types.FETCHED, null, { root: true })
      commit(types.FETCHED_POPULAR, { movies: response.data.response.results })
    }).catch((err) => {
      commit(types.FETCHED, null, { root: true })
      commit(types.FAIL_FETCH, { error: err.response.data.error })
    })
  },
  fetchTopRated({ commit }) {
    commit(types.FETCHING, null, { root: true })
    Api.getTopRated().then((response) => {
      commit(types.FETCHED, null, { root: true })
      commit(types.FETCHED_TOP_RATED, { movies: response.data.response.results })
    }).catch((err) => {
      commit(types.FETCHED, null, { root: true })
      commit(types.FAIL_FETCH, { error: err.response.data.error })
    })
  },
  fetchUpcoming({ commit }) {
    commit(types.FETCHING, null, { root: true })
    Api.getUpcoming().then((response) => {
      commit(types.FETCHED, null, { root: true })
      commit(types.FETCHED_UPCOMING, { movies: response.data.response.results })
    }).catch((err) => {
      commit(types.FETCHED, null, { root: true })
      commit(types.FAIL_FETCH, { error: err.response.data.error })
    })
  },
  fetchMovie({ commit }, id) {
    commit(types.FETCHING, null, { root: true })
    Api.getMovie(id).then((response) => {
      commit(types.FETCHED, null, { root: true })
      commit(types.FETCHED_MOVIE, { id: id, movie: response.data.response })
    }).catch((err) => {
      commit(types.FETCHED, null, { root: true })
      commit(types.FAIL_FETCH, { error: err.response.data.error })
    })
  },
}

const mutations = {
  [types.FETCHED_NOW_PLAYING](state, { movies }) {
    state.movieList = movies
  },
  [types.FETCHED_POPULAR](state, { movies }) {
    state.movieList = movies
  },
  [types.FETCHED_TOP_RATED](state, { movies }) {
    state.movieList = movies
  },
  [types.FETCHED_UPCOMING](state, { movies }) {
    state.movieList = movies
  },
  [types.FETCHED_MOVIE](state, { id, movie }) {
    Vue.set(state.movies, id, movie)
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
