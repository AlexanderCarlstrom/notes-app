const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Note = require('./Note').Note;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  notes: {
    type: [Note],
    required: true,
    default: []
  }
});

userSchema.set('timestamps', true);

module.exports = User = mongoose.model('users', userSchema, 'User');
