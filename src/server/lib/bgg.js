const axios = require('axios')
const xml2js = require('xml2js')
const util = require('util')
const parseXML = util.promisify(xml2js.parseString)
const Db = require(process.cwd() + '/src/server/lib/db')

const API_URL = 'https://www.boardgamegeek.com/xmlapi2'
const HOT_KEYS = new Map([
  ['id', '$.id'],
  ['rank', '$.rank'],
  ['thumbnail', 'thumbnail.0.$.value'],
  ['name', 'name.0.$.value'],
  ['yearpublished', 'yearpublished.0.$.value'],
])
const ITEM_PATH = 'items.item.0'
const KEYS = new Map([
  ['id', `${ITEM_PATH}.$.id`],
  ['thumbnail', `${ITEM_PATH}.thumbnail.0`],
  ['image', `${ITEM_PATH}.image.0`],
  ['name', `${ITEM_PATH}.name.0.$.value`],
  ['description', `${ITEM_PATH}.description.0`],
  ['yearpublished', `${ITEM_PATH}.yearpublished.0.$.value`],
  ['minplayers', `${ITEM_PATH}.minplayers.0.$.value`],
  ['maxplayers', `${ITEM_PATH}.maxplayers.0.$.value`],
  ['playingtime', `${ITEM_PATH}.playingtime.0.$.value`],
  ['minplaytime', `${ITEM_PATH}.minplaytime.0.$.value`],
  ['maxplaytime', `${ITEM_PATH}.maxplaytime.0.$.value`],
  ['minage', `${ITEM_PATH}.minage.0.$.value`],
  ['usersrated', `${ITEM_PATH}.statistics.0.ratings.0.usersrated.0.$.value`],
  ['average', `${ITEM_PATH}.statistics.0.ratings.0.average.0.$.value`],
  ['owned', `${ITEM_PATH}.statistics.0.ratings.0.owned.0.$.value`],
  ['wanting', `${ITEM_PATH}.statistics.0.ratings.0.wanting.0.$.value`],
  ['wishing', `${ITEM_PATH}.statistics.0.ratings.0.wishing.0.$.value`],
  ['averageweight', `${ITEM_PATH}.statistics.0.ratings.0.averageweight.0.$.value`],
])

class BGG {
  static async hot() {
    if (Db.hot.length !== 0) { return Db.hot }
    const response = await axios.get(`${API_URL}/hot?type=boardgame`)
    const xml = response.data
    const obj = await parseXML(xml)
    const result = BGG.normalize_list(obj)
    Db.hot = result
    return result
  }
  static async getById(id) {
    if (Db.boardgames[id]) { return Db.boardgames[id] }
    const url = `https://www.boardgamegeek.com/xmlapi2/thing?stats=1&videos=1&id=${id}`
    const response = await axios.get(url)
    const xml = response.data
    const obj = await parseXML(xml)
    const result = BGG.normalize(obj)
    Db.boardgames[id] = result
    return result
  }
  static async getFamilyById(id) {
    const url = `https://www.boardgamegeek.com/xmlapi2/family?type=boardgamefamily&id=${id}`
    const response = await axios.get(url)
    const xml = response.data
    const obj = await parseXML(xml)
    return BGG.normalize(obj)
  }
  static async search(query) {
    if (Db.search[query]) { return Db.search[query] }
    const url = `https://www.boardgamegeek.com/xmlapi2/search?type=boardgame&query=${query}`
    const response = await axios.get(url)
    const xml = response.data
    const obj = await parseXML(xml)
    const result = BGG.normalize_list(obj)
    Db.search[query] = result
    return result
  }

  static normalize_list(bgg_obj) {
    const list = []
    const items = BGG.deepFind(bgg_obj, 'items.item')
    for (const item of items) {
      const item_obj = {}
      for (const [key, path] of HOT_KEYS) {
        item_obj[key] = BGG.deepFind(item, path)
      }
      list.push(item_obj)
    }
    return list
  }
  static normalize(bgg_obj) {
    const obj = {}
    for (const [key, path] of KEYS) {
      obj[key] = BGG.deepFind(bgg_obj, path)
    }
    const links = BGG.deepFind(bgg_obj, `${ITEM_PATH}.link`)
    if (links) {
      for (const link of links) {
        const linkName = link.$.type.replace(/boardgame/, '')
        if (!obj[linkName]) {
          obj[linkName] = []
        }
        obj[linkName].push({
          id: link.$.id,
          value: link.$.value
        })
      }
    }
    let videos = BGG.deepFind(bgg_obj, `${ITEM_PATH}.videos.0.video`) || []
    videos = videos.map((v) => {
      const new_video = {}
      const new_video_keys = ['id', 'title', 'category', 'language', 'link', 'username', 'userid', 'postdate']
      for (const video_key of new_video_keys) {
        new_video[video_key] = v.$[video_key]
      }
      return new_video
    })
    let ranks = BGG.deepFind(bgg_obj, `${ITEM_PATH}.statistics.0.ratings.0.ranks.0.rank`) || []
    ranks = ranks.map((r) => {
      const new_rank = {}
      const new_rank_keys = ['type', 'id', 'name', 'friendlyname', 'value', 'bayesaverage']
      for (const video_key of new_rank_keys) {
        new_rank[video_key] = r.$[video_key]
      }
      return new_rank
    })
    obj.videos = videos
    obj.ranks = ranks
    return obj
  }
  static deepFind(obj, path) {
    return path.split('.').reduce((previous, current) => {
      if (previous) {
        return previous[current]
      }
    }, obj)
  }
}

BGG.API_URL = API_URL

module.exports = BGG
