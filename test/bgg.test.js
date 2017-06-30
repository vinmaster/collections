/* eslint-env mocha */

const chai = require('chai')
const BGG = require(process.cwd() + '/src/server/lib/bgg')

const expect = chai.expect

describe('BGG', () => {
  describe('#hot', () => {
    it('should not be null', async () => {
      const response = await BGG.hot()
      expect(response).not.equal(null)
    })
  })

  describe('#search', () => {
    it('should not be null', async () => {
      const response = await BGG.search('Agricola')
      expect(response.length).not.equal(0)
    })
  })

  describe('#normalize', () => {
    it('should have right amount of keys', async () => {
      const response = await BGG.getById(31260)
      const normalized_obj = BGG.normalize(response)
      expect(Object.keys(normalized_obj)).length(20)
    })
  })

  describe('#deepFind', () => {
    it('should find nested string', () => {
      const obj = {
        lvl1: {
          lvl2: {
            lvl3: 'found'
          }
        }
      }
      expect(BGG.deepFind(obj, 'lvl1.lvl2.lvl3')).equal('found')
    })
    it('should return undefined if not found', () => {
      const obj = {
        lvl1: {
          lvl2: {
            lvl3: 'found'
          }
        }
      }
      expect(BGG.deepFind(obj, 'bad.bad.bad')).equal(undefined)
    })
  })
})
