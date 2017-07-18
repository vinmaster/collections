<template>
  <div class="container">
    <div class="row">
      <h3 class="col s12 center indigo-text">Home</h3>
      <div class="center">
        <div class="col m6 s12">
          <router-link class="indigo btn-large waves-effect waves-light home-buttons" to="/boardgames">Boardgames</router-link>
        </div>
        <div class="col m6 s12">
          <router-link class="indigo btn-large waves-effect waves-light home-buttons" to="/movies/now_playing">Movies</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'home',
}
</script>

<style scoped>
.home-buttons {
  width: 100%;
}
</style>
