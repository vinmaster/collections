<template>
  <div class="container">
    <div class="row" v-show="isEmpty">
      <div class="col s12">
        <h3 class="indigo-text">{{ boardgame.name }}</h3>

        <div class="row">
          <div class="col s12">
            <ul class="collapsible" data-collapsible="accordion">
              <li>
                <div class="collapsible-header">Description</div>
                <div class="collapsible-body" v-html="boardgame.description"></div>
              </li>
            </ul>
          </div>
        </div>

        <div class="row">
          <div class="col m6 s12">
            <img class="responsive-img" v-bind:src="boardgame.image" />
          </div>

          <ul class="collection col m6 s12" style="margin-top: 0px;">
            <li class="collection-item">
              <span class="indigo-text" style="font-weight: bold;">Rating: </span>
              <span>{{ boardgame.average }} by {{ boardgame.usersrated }} Users</span>
            </li>
            <li class="collection-item">
              <span class="indigo-text" style="font-weight: bold;">Ranking: </span>
              <span v-for="r in boardgame.ranks" class="new badge blue" v-bind:data-badge-caption="r.friendlyname">#{{ r.value }}</span>
            </li>
            <li class="collection-item">
              <span class="indigo-text" style="font-weight: bold;">Designer: </span>
              <span v-for="d in boardgame.designer">{{ d.value }}</span>
            </li>
            <li class="collection-item">
              <span class="indigo-text" style="font-weight: bold;">Artist: </span>
              <span v-for="a in boardgame.artist">{{ a.value }}</span>
            </li>
            <li class="collection-item">
              <span class="indigo-text" style="font-weight: bold;">Year Published: </span>
              <span>{{ boardgame.yearpublished }}</span>
            </li>
            <li class="collection-item">
              <span class="indigo-text" style="font-weight: bold;"># of Players: </span>
              <span>{{ boardgame.minplayers }} - {{ boardgame.maxplayers }} players</span>
            </li>
            <li class="collection-item">
              <span class="indigo-text" style="font-weight: bold;">Game length: </span>
              <span>{{ boardgame.minplaytime }} - {{ boardgame.maxplaytime }} minutes</span>
            </li>
            <li class="collection-item">
              <span class="indigo-text" style="font-weight: bold;">Weight (Difficulty): </span>
              <span>{{ boardgame.averageweight }}/5</span>
            </li>
            <li class="collection-item">
              <span class="indigo-text" style="font-weight: bold;">Category: </span>
              <div class="chip" v-for="c in boardgame.category">
                {{ c.value }}
              </div>
            </li>
            <li class="collection-item">
              <span class="indigo-text" style="font-weight: bold;">Mechanic: </span>
              <div class="chip" v-for="c in boardgame.mechanic">
                {{ c.value }}
              </div>
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
  name: 'boardgame',
  mounted() {
    this.fetchData()
  },
  watch: {
    '$route': 'fetchData'
  },
  computed: {
    ...mapGetters([
      'boardgames',
    ]),
    boardgame() {
      const id = this.$route.params.id
      const boardgame = this.boardgames[id] ? this.boardgames[id] : {}
      return boardgame
    },
    isEmpty() {
      return this.boardgame.name != undefined
    }
  },
  methods: {
    ...mapActions([
      'fetchBoardgame',
    ]),
    fetchData() {
      this.fetchBoardgame(this.$route.params.id)
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
