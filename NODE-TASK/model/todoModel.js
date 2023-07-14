const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  id: {
    type: Number,
    default: Date.now(),
  },
  title: {
    type: String,
    required: true,
  },
  context: {
    type: String,
    required: true,
  },

  starred: {
    type: Boolean,
    default: false,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: String,
  },
});

const TodoModel = mongoose.model("Todo", todoSchema);
module.exports = TodoModel;
