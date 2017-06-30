<template>
  <div id="app">
    <nav>
      <div class="indigo nav-wrapper">
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/my">My Boardgames</router-link></li>
          <li class="right"><router-link to="/about">About</router-link></li>
          <li class="right"><router-link to="/search"><i class="material-icons">search</i></router-link></li>
        </ul>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
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
