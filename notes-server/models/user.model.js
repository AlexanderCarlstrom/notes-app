const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
  email: { type: String, required: true, max: 100 },
  name: { type: String, required: true, max: 100 },
  passwordHash: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);
