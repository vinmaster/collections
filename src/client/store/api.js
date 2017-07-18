import axios from 'axios'

export default class Api {
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
}
