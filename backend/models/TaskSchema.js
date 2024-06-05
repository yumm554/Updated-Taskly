const { mongoose } = require('mongoose');

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: mongoose.Schema.Types.String,
    required: true,
    ref: 'Login',
  },
  dateCreated: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Task', TaskSchema);
