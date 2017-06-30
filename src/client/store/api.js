import axios from 'axios'

export default class Api {
  static getHot() {
    return axios.get('/api/boardgames/hot')
  }
  static getBoardgame(id) {
    return axios.get(`/api/boardgames/${id}`)
  }
  static boardgameSearch(query) {
    return axios.post('/api/boardgames/search', { q: query })
  }
}
