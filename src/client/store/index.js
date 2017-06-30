import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'client/lib/logger'
import boardgames from './modules/boardgames'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  modules: {
    boardgames,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})

// Hot reload each modules
if (module.hot) {
  module.hot.accept([
    './modules/boardgames',
  ], () => {
    store.hotUpdate({
      modules: {
        boardgames: require('./modules/boardgames').default,
      }
    })
  })
}

export default store
