const crypto = require('crypto')
const bcrypt = require('bcrypt')
const mongoose = require(process.cwd() + '/src/server/lib/mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const SALT_WORK_FACTOR = 10

const schema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  accessToken: {
    type: String,
    default: null,
  },
  moviesWatchList: {
    type: [mongoose.Schema.Types.ObjectId]
  },
}, {
  timestamps: true
})

schema.pre('save', function(next) {
  const user = this

  // Only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next()

  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err)

    // Hash the password using our new salt
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err)

      // Override the cleartext password with the hashed one
      user.password = hash
      next()
    })
  })
})

schema.statics = {
  generateHex: function(length) {
    return crypto.randomBytes(length / 2).toString('hex')
  },
}

schema.methods = {
  verifyPassword: function(password) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, this.password, function(err, isMatch) {
        if (err) resolve(false)
        else resolve(isMatch)
      })
    })
  },
  generateAccessToken: function() {
    const accessToken = User.generateHex(16)
    return User.findOne({accessToken: accessToken}).then((user) => {
      if (user) {
        return this.generateAccessToken(User.generateHex(16))
      } else {
        this.accessToken = accessToken
        return this.save()
      }
    }).then((user) => user)
  },
}

schema.plugin(uniqueValidator)
const User = mongoose.model('User', schema)
module.exports = User
