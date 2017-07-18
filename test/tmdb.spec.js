/* eslint-env mocha */

const chai = require('chai')
const TMDB = require(process.cwd() + '/src/server/lib/tmdb')

const expect = chai.expect

describe('TMDB', () => {
  describe('#getMovieById', () => {
    it('should not be null', async () => {
      const response = await TMDB.getMovieById(278)
      expect(response).not.equal(null)
    })
  })
})
