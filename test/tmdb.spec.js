/* eslint-env mocha */

const chai = require('chai')
const TMDB = require(process.cwd() + '/src/server/lib/tmdb')
const SpecHelper = require(process.cwd() + '/test/specHelper')

const expect = chai.expect

describe('TMDB', () => {
  afterEach(() => SpecHelper.dropDatabase())

  describe('#getMovieById', () => {
    it('should not be null', async () => {
      const response = await TMDB.getMovieById(278)
      expect(response).not.equal(null)
    })
  })
})
