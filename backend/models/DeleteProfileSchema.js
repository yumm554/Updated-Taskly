const { default: mongoose } = require('mongoose')

const deleteProfileSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'username is required'],
    unique: true,
  },
})

module.exports =
  mongoose.models.deleteProfile ||
  mongoose.model('deleteProfile', deleteProfileSchema)
