const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notesSchema = new Schema({
  title: {
    type: String
  },
  content: {
    type: String
  }
});

notesSchema.set('timestamps', true);

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
    type: [notesSchema],
    default: []
  }
});

userSchema.set('timestamps', true);

module.exports = User = mongoose.model('users', userSchema, 'User');
