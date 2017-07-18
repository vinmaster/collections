<template>
  <div class="container row">
    <div style="margin: 50px 0px">
      <h5 class="indigo-text header center">&quot;{{ title.text }}&quot;</h5>
      <h6 class="indigo-text right">- {{ title.author }}<a href="#" v-on:click.prevent="roll"><i class="material-icons indigo-text">refresh</i></a></h6>
    </div>

    <div class="col s12">
      <div class="icon-block">
        <h5 class="left">Hot Boardgames</h5>
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

    <div class="row">
      <div class="col m4 s12" v-for="boardgame in hotBoardgames">
        <div class="z-depth-4" style="margin-bottom: 20px;">
          <router-link v-bind:to="'/boardgames/' + boardgame.id">
            <div class="card">
              <div class="card-image">
                <img width="100" height="200" v-bind:src="boardgame.thumbnail" />
              </div>
            </div>
            <div class="card-content" style="height: 100px; padding-left: 10px;">
              <div class="indigo-text"><b>{{ boardgame.name }}</b></div>
              <div class="indigo-text"><b>Rank: </b><span class="new badge blue" data-badge-caption="">#{{ boardgame.rank }}</span></div>
              <div class="indigo-text"><b>Year Published: </b>{{ boardgame.yearpublished }}</div>
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
  name: 'boardgames',
  mounted() {
    this.fetchHotBoardgames()
    this.roll()
  },
  data() {
    return {
      quotes: [
        {
          text: 'Maybe life is a board game, but I never get to roll the dice.',
          author: 'Tim Wynne-Jones'
        },
        {
          text: 'I think it\'s wrong that only one company makes the game Monopoly.',
          author: 'Steven Wright',
        },
        {
          text: 'I try to seduce the lock',
          author: 'Unknown',
        },
        {
          text: 'Why is the skeleton having an existential crisis',
          author: 'Unknown',
        },
        {
          text: 'You can\'t set water on fire just because you rolled a critical',
          author: 'Unknown',
        },
      ],
      quoteIndex: 0,
    }
  },
  computed: {
    ...mapGetters([
      'hotBoardgames',
      'isLoading',
    ]),
    title() {
      return this.quotes[this.quoteIndex]
    },
  },
  methods: {
    ...mapActions([
      'fetchHotBoardgames',
    ]),
    roll() {
      const min = 0
      const max = this.quotes.length
      this.quoteIndex = Math.floor(Math.random() * (max - min)) + min
    },
  }
}
</script>

<style scoped>
span.badge {
  float: none !important;
  padding: 3px;
}
</style>
