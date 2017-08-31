const mongoose = require(process.cwd() + '/src/server/lib/mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const schema = new mongoose.Schema({
  adult: Boolean,
  backdrop_path: String,
  budget: Number,
  genres: mongoose.Schema.Types.Mixed,
  homepage: String,
  id: Number,
  imdb_id: String,
  original_language: String,
  original_title: String,
  overview: String,
  popularity: Number,
  poster_path: String,
  production_companies: mongoose.Schema.Types.Mixed,
  production_countries: mongoose.Schema.Types.Mixed,
  release_date: String,
  revenue: Number,
  runtime: Number,
  spoken_languages: mongoose.Schema.Types.Mixed,
  status: String,
  tagline: String,
  title: String,
  video: Boolean,
  vote_average: Number,
  vote_count: Number,
}, {
  timestamps: true
})

schema.statics = {
}

schema.methods = {
}

schema.plugin(uniqueValidator)
const Movie = mongoose.model('Movie', schema)
module.exports = Movie
