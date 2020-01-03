const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users"
  }
}, {
  timestamps: true
});

const NoteModel = mongoose.model("Notes", NoteSchema);

module.exports = NoteModel