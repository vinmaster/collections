<template>
  <div class="container">
    <div class="row" v-show="isEmpty">
      <div class="col s12">
        <img v-bind:src="'https://image.tmdb.org/t/p/w780' + movie.backdrop_path" />
        <h3 class="indigo-text">{{ movie.original_title }}</h3>

        <div class="row">
          <div class="col s12">
            <ul class="collapsible" data-collapsible="accordion">
              <li>
                <div class="collapsible-header">Overview</div>
                <div class="collapsible-body" v-html="movie.overview"></div>
              </li>
            </ul>
          </div>
        </div>

        <div class="row">
          <div class="col m6 s12">
            <img class="responsive-img" v-bind:src="'https://image.tmdb.org/t/p/w342' + movie.poster_path" />
          </div>

          <ul class="collection col m6 s12" style="margin-top: 0px;">
            <li class="collection-item">
              <span class="indigo-text" style="font-weight: bold;">Rating: </span>
              <span>{{ movie.vote_average }} by {{ movie.vote_count }} Users</span>
            </li>
            <li class="collection-item">
              <span class="indigo-text" style="font-weight: bold;">Tagline: </span>
              <span>{{ movie.tagline }}</span>
            </li>
            <li class="collection-item">
              <span class="indigo-text" style="font-weight: bold;">Released: </span>
              <span>{{ movie.release_date }}</span>
            </li>
            <li class="collection-item">
              <span class="indigo-text" style="font-weight: bold;">Runtime: </span>
              <span>{{ movie.runtime }} minutes</span>
            </li>
            <li class="collection-item">
              <span class="indigo-text" style="font-weight: bold;">Production Companies: </span>
              <span v-if="movie.production_companies">{{ movie.production_companies.map((m) => m.name ).join(', ') }} </span>
            </li>
            <li class="collection-item">
              <a class="indigo-text" style="font-weight: bold;" v-bind:href="'https://www.imdb.com/title/' + movie.imdb_id">IMDB Link</a>
            </li>
          </ul>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'movie',
  mounted() {
    $('.collapsible').collapsible()
    this.fetchData()
  },
  watch: {
    '$route': 'fetchData'
  },
  computed: {
    ...mapGetters([
      'movies',
    ]),
    movie() {
      const id = this.$route.params.id
      const movie = this.movies[id] ? this.movies[id] : {}
      console.log(movie)
      return movie
    },
    isEmpty() {
      return this.movie.original_title != undefined
    }
  },
  methods: {
    ...mapActions([
      'fetchMovie',
    ]),
    fetchData() {
      this.fetchMovie(this.$route.params.id)
    }
  },
  data() {
    return {}
  }
}
</script>

<style scoped>
span.badge {
  float: none !important;
  padding: 3px;
}
</style>
