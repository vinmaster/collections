import axios from 'axios'

export default class Api {
  static login(username, password) {
    return axios.post('/api/users/login', { username, password })
  }
  static getHotBoardgames() {
    return axios.get('/api/boardgames/hot')
  }
  static getBoardgame(id) {
    return axios.get(`/api/boardgames/${id}`)
  }
  static boardgameSearch(query) {
    return axios.post('/api/boardgames/search', { q: query })
  }
  static getNowPlaying() {
    return axios.get('/api/movies/now_playing')
  }
  static getPopular() {
    return axios.get('/api/movies/popular')
  }
  static getTopRated() {
    return axios.get('/api/movies/top_rated')
  }
  static getUpcoming() {
    return axios.get('/api/movies/upcoming')
  }
  static getMovie(id) {
    return axios.get(`/api/movies/${id}`)
  }
  static getMyCollections(accessToken) {
    return axios.get('/api/users/collections', {
      params: { accessToken },
    })
  }
  static addToWatchlist(accessToken, id) {
    return axios.post('/api/users/collections/addToWatchlist', { accessToken, id })
  }
  static removeFromWatchlist(accessToken, id) {
    return axios.post('/api/users/collections/removeFromWatchlist', { accessToken, id })
  }
}
