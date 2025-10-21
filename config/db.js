const mongoose = require('mongoose');
MONGOOSEURI='enter your uri here';

const connectDB = async () => {
  try {
    await mongoose.connect(MONGOOSEURI);
    console.log('MongoDB Connected');
  } catch{
   
    process.exit(1);
  }
};

module.exports = connectDB;
