
const mongoose = require('mongoose');
MONGOOSEURI='mongodb+srv://harshr82829:x964VfEYdfEobaZn@cluster0.awu9ezs.mongodb.net/IITP_PROJECT?retryWrites=true&w=majority&appName=Cluster0';
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
