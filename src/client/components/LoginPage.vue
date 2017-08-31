<template>
  <div class="container">
    <div class="row">
      <h3 class="col s12 center indigo-text">Login</h3>

      <form class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <span class="red-text">{{ loginError }}</span>
          </div>
          <div class="input-field col s12">
            <input id="icon_prefix" type="text" class="validate" v-model="username">
            <label for="icon_prefix">Username</label>
          </div>
          <div class="input-field col s12">
            <input id="icon_prefix" type="password" class="validate" v-model="password">
            <label for="icon_prefix">Password</label>
          </div>
          <div class="input-field col s12">
            <button class="btn col s12" v-on:click.prevent="onSubmit({ username, password })">Login</button>
          </div>
        </div>
      </form>

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

    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'login',
  computed: {
    ...mapGetters([
      'isLoading',
      'accessToken',
      'loginError',
    ]),
  },
  methods: {
    ...mapActions([
      'login',
    ]),
    onSubmit() {
      event.preventDefault()
      this.login({ username: this.username, password: this.password })
      this.username = ''
      this.password = ''
      Materialize.updateTextFields()
    },
  },
  data() {
    return {
      username: '',
      password: '',
    }
  }
}
</script>

<style scoped>
</style>
