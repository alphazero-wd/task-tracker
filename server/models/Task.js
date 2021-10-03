const mongoose = require('mongoose');
const TaskSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  isImportant: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  creatorId: {
    type: String,
    required: true,
  },
});
const Task = mongoose.model('Task', TaskSchema);
module.exports = Task;
