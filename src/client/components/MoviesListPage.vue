<template>
  <div class="container row">

    <div class="col s12">
      <div class="icon-block">
        <h5 class="left">{{ title }}</h5>
      </div>
    </div>

    <div class="col s12 center">
      <div class="preloader-wrapper big active" v-show="isLoading">
        <div class="spinner-layer spinner-blue-only">
          <div class="circle-clipper left">
            <div class="circle"></div>
          </div><div class="gap-patch">
            <div class="circle"></div>
          </div><div class="circle-clipper right">
            <div class="circle"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="row" v-show="!isLoading">
      <div class="col m4 s12" v-for="movie in movieList">
        <div class="z-depth-4" style="margin-bottom: 20px;">
          <router-link v-bind:to="'/movies/' + movie.id">
            <div class="card">
              <div class="card-image">
                <img height="350" v-bind:src="'https://image.tmdb.org/t/p/w342' + movie.poster_path" />
              </div>
            </div>
            <div class="card-content" style="height: 100px; padding-left: 10px;">
              <div class="indigo-text"><b>{{ movie.original_title }}</b></div>
              <div class="indigo-text"><b>Rating: </b><span class="new badge blue" data-badge-caption="">{{ movie.vote_average }}</span></div>
              <div class="indigo-text"><b>Released: </b>{{ movie.release_date }}</div>
            </div>
          </router-link>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'home',
  watch: {
    '$route': 'fetchData',
  },
  mounted() {
    this.fetchData()
  },
  data() {
    return {
      title: '',
    }
  },
  computed: {
    ...mapGetters([
      'movieList',
      'isLoading',
    ]),
  },
  methods: {
    ...mapActions([
      'fetchNowPlaying',
      'fetchPopular',
      'fetchTopRated',
      'fetchUpcoming',
    ]),
    fetchData() {
      if (this.$route.path === '/movies/now_playing') {
        this.title = 'Now Playing'
        this.fetchNowPlaying()
      } else if (this.$route.path === '/movies/popular') {
        this.title = 'Popular'
        this.fetchPopular()
      } else if (this.$route.path === '/movies/top_rated') {
        this.title = 'Top Rated'
        this.fetchTopRated()
      } else if (this.$route.path === '/movies/upcoming') {
        this.title = 'Upcoming'
        this.fetchUpcoming()
      }
    }
  }
}
</script>

<style scoped>
span.badge {
  float: none !important;
  padding: 3px;
}
</style>
