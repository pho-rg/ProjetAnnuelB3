const mongoose = require('mongoose');
const config = require('./config'); // Make sure this file exports MONGODB_URL

const connectDB = async () => {
    try {
        await mongoose.connect(config.MONGODB_URL, {});
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
};

module.exports = connectDB;