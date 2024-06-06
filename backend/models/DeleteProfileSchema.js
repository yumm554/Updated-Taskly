const { default: mongoose } = require('mongoose');

const deleteProfileSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'email is required'],
    unique: true,
  },
});

module.exports =
  mongoose.models.deleteProfile ||
  mongoose.model('deleteProfile', deleteProfileSchema);
