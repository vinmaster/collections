<template>
  <div id="app">
    <nav>
      <div class="indigo nav-wrapper">
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li v-show="!isLoggedIn"><router-link to="/login">Login</router-link></li>
          <li v-show="isLoggedIn"><router-link to="/logout">Logout</router-link></li>
          <li><router-link to="/boardgames">Boardgames</router-link></li>
          <li><a class="dropdown-button" href="#!" data-activates="movies_dropdown">Movies<i class="material-icons right">arrow_drop_down</i></a></li>
          <li class="right"><router-link to="/search"><i class="material-icons">search</i></router-link></li>
          <li class="right"><router-link to="/my">My Collections</router-link></li>
          <li class="right"><router-link to="/about">About</router-link></li>
        </ul>
      </div>
    </nav>
    <ul id="movies_dropdown" class="dropdown-content">
      <li><router-link to="/movies/now_playing">Now Playing</router-link></li>
      <li><router-link to="/movies/popular">Popular</router-link></li>
      <li><router-link to="/movies/top_rated">Top Rated</router-link></li>
      <li><router-link to="/movies/upcoming">Upcoming</router-link></li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'app',
  computed: {
    ...mapGetters([
      'accessToken',
    ]),
    isLoggedIn() {
      return this.accessToken !== ''
    },
  },
  mounted() {
    $(".dropdown-button").dropdown()
  }
}
</script>

<style>
html, body {
  height: 100%;
  margin: 0px;
}

#app {
  height: 100%;
}
</style>
