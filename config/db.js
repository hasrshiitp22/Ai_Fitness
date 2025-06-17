
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(MONGOOSEURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1); 
  }
};

module.exports = connectDB;
