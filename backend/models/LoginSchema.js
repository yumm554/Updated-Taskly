const { default: mongoose } = require('mongoose')

const LoginSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('Login', LoginSchema)
