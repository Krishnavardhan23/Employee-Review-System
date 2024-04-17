// mongodb.js

const mongoose = require('mongoose');

const connectionURL = 'mongodb://localhost:27017/ERS';

const connectMongoDb = async () => {
    try {
        await mongoose.connect(connectionURL);
        console.log('Database connection successful');
    } catch (error) {
        console.error('Error connecting to database:', error.message);
        process.exit(1);
    }
};

module.exports = connectMongoDb;
