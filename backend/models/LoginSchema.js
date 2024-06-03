const { default: mongoose } = require('mongoose')

const loginSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
})

module.exports = mongoose.models.Login || mongoose.model('Login', loginSchema)
