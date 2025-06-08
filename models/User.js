
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
 username: { type: String },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: String,
  age: Number,
  weight: Number,
  height: Number,
  targetWeight: Number,
  diet: String
});

module.exports = mongoose.model('User', userSchema);
