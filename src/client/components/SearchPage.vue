<template>
  <div class="container">
    <div class="row">
      <h3 class="col s12 center indigo-text">Search Boardgames</h3>

      <form class="col s12">
        <div class="row">
          <div class="input-field col m10 s12">
            <input id="icon_prefix" type="text" class="validate" v-model="query">
            <label for="icon_prefix">Enter boardgame name here</label>
          </div>
          <button class="btn col m2 s12" v-on:click="onSearch">Search<i class="material-icons right">search</i></button>
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

      <div class="row" v-show="search.length > 0">
        <h5>Result for &quot;{{ searchQuery }}&quot;</h5>
        <table class="striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Year Published</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="boardgame in paginatedSearch">
              <td>{{ boardgame.name }}</td>
              <td>{{ boardgame.yearpublished }}</td>
              <td><router-link class="indigo btn" v-bind:to="'/boardgames/' + boardgame.id">View</router-link></td>
            </tr>
          </tbody>
        </table>

        <ul class="center pagination">
          <li v-bind:class="{ disabled: currentPage === 1 }"><a href="#" v-on:click.prevent="move('prev')"><i class="material-icons">chevron_left</i></a></li>
          <li v-for="page in pages" v-bind:class="pageClass(page)" v-on:click.prevent="move(page)"><a href="#">{{ page }}</a></li>
          <li v-bind:class="{ disabled: currentPage === pages }"><a href="#" v-on:click.prevent="move('next')"><i class="material-icons">chevron_right</i></a></li>
        </ul>
      </div>

    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'search',
  computed: {
    ...mapGetters([
      'search',
      'searchQuery',
      'isLoading',
    ]),
    paginatedSearch() {
      const begin = (this.currentPage - 1) * this.pageSize
      const end = begin + this.pageSize
      return this.search.slice(begin, end)
    },
    pages() {
      return Math.ceil(this.search.length / this.pageSize)
    },
  },
  methods: {
    ...mapActions([
      'boardgameSearch',
    ]),
    onSearch(event) {
      event.preventDefault()
      this.boardgameSearch(this.query)
    },
    pageClass(pageNum) {
      if (pageNum === this.currentPage) {
        return 'active'
      } else {
        return 'wave-effect'
      }
    },
    move(action) {
      if (action === 'prev' && this.currentPage > 1) {
        this.currentPage--
      } else if (action === 'next' && this.currentPage < this.pages) {
        this.currentPage++
      } else {
        this.currentPage = action
      }
    },
  },
  data() {
    return {
      query: '',
      pageSize: 10,
      currentPage: 1,
    }
  }
}
</script>

<style scoped>
</style>
