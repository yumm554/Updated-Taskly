const { mongoose } = require('mongoose');

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: mongoose.Schema.Types.String,
    required: true,
    ref: 'Login',
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Task', TaskSchema);
