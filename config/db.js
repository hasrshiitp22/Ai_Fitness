const mongoose = require('mongoose');
MONGOOSEURI='mongodb+srv://harshr82829:x964VfEYdfEobaZn@cluster0.awu9ezs.mongodb.net/IITP_PROJECT?retryWrites=true&w=majority&appName=Cluster0';

const connectDB = async () => {
  try {
    await mongoose.connect(MONGOOSEURI);
    console.log('MongoDB Connected');
  } catch (err) {
    console.error(' Connection Failed:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
