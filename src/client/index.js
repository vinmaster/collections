import Vue from 'vue'
import App from 'client/App'
import router from 'client/routes'
import store from 'client/store'
import { sync } from 'vuex-router-sync'

sync(store, router)

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
