const { default: mongoose } = require('mongoose')

const UpdateProfileSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('UpdateProfile', UpdateProfileSchema)
