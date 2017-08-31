const axios = require('axios')
const moment = require('moment')
const Db = require(process.cwd() + '/src/server/lib/db')
const Movie = require(process.cwd() + '/src/server/models/movie')

const API_URL = 'https://api.themoviedb.org/3'

class TMDB {
  static makeRequest(url) {
    return axios.get(url, { params: { api_key: process.env.TMDB_API_KEY } })
  }

  static async nowPlaying() {
    if (Object.keys(Db.nowPlaying).length !== 0) { return Db.nowPlaying }
    const url = `${API_URL}/movie/now_playing`
    const response = await TMDB.makeRequest(url)
    const json = response.data
    Db.nowPlaying = json
    return json
  }

  static async popular() {
    if (Object.keys(Db.popular).length !== 0) { return Db.popular }
    const url = `${API_URL}/movie/popular`
    const response = await TMDB.makeRequest(url)
    const json = response.data
    Db.popular = json
    return json
  }

  static async topRated() {
    if (Object.keys(Db.topRated).length !== 0) { return Db.topRated }
    const url = `${API_URL}/movie/top_rated`
    const response = await TMDB.makeRequest(url)
    const json = response.data
    Db.topRated = json
    return json
  }

  static async upcoming() {
    if (Object.keys(Db.upcoming).length !== 0) { return Db.upcoming }
    const url = `${API_URL}/movie/upcoming`
    const response = await TMDB.makeRequest(url)
    const json = response.data
    Db.upcoming = json
    return json
  }

  static async getMovieById(id) {
    let movie = await Movie.findOne({ id: id })
    let isFromToday = false
    if (movie) {
      isFromToday = moment(movie.updatedAt).isSame(new Date(), 'day')
    }
    if (!movie || !isFromToday) {
      const url = `${API_URL}/movie/${id}`
      const response = await TMDB.makeRequest(url)
      const json = response.data
      // Check if new or needs update
      if (!movie) {
        movie = new Movie(json)
      } else {
        movie.set(json)
      }
      await movie.save()
    }
    return movie
  }

  static async getSimilarMovies(id) {
    if (Db.similar[id]) { return Db.similar[id] }
    const url = `${API_URL}/movie/${id}/similar`
    const response = await TMDB.makeRequest(url)
    const json = response.data
    Db.similar[id] = json
    return json
  }

  static async getRecommendationsMovies(id) {
    if (Db.recommendations[id]) { return Db.recommendations[id] }
    const url = `${API_URL}/movie/${id}/recommendations`
    const response = await TMDB.makeRequest(url)
    const json = response.data
    Db.recommendations[id] = json
    return json
  }
}

TMDB.API_URL = API_URL

module.exports = TMDB
