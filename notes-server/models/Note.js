const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notesSchema = new Schema({
  title: {
    type: String,
    default: 'New Note',
    required: true
  },
  content: {
    type: String,
    required: false,
    default: ''
  }
});

notesSchema.set('timestamps', true);

module.exports = Note = mongoose.model('Note', notesSchema);
