const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  // Optional user info fields:
  name: String,
  age: Number,
  height: Number,
  weight: Number,
  targetWeight: Number,
  diet: String,
});

module.exports = mongoose.model('User', userSchema);
