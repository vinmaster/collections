// Load dotenv
require(process.cwd() + '/src/server')
const mongoose = require(process.cwd() + '/src/server/lib/mongoose')

const SpecHelper = {
  nsError: (err) => {
    if (err && err.message !== 'ns not found') { throw err }
  },
  dropDatabase: () => {
    return mongoose.connection.db.dropDatabase()
  },
  catchError: (err) => {
    console.log(err)
    throw err
  },
}

module.exports = SpecHelper
