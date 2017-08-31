<template>
  <div class="container row">
    <h1>My Collections</h1>

    <div class="row" v-show="!isLoading">
      <div class="col m4 s12" v-for="movie in collections.moviesWatchList">
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
  name: 'my',
  watch: {
    '$route': 'fetchData',
  },
  mounted() {
    this.fetchData()
  },
  computed: {
    ...mapGetters([
      'collections',
      'isLoading',
    ]),
  },
  methods: {
    ...mapActions([
      'fetchMyCollections',
    ]),
    fetchData() {
      this.fetchMyCollections()
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
