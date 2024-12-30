const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected');
    return conn;
  } catch (err) {
    console.error('❌ MongoDB Error:', err.message);
    process.exit(1); 
  }
};

module.exports = connectDB;