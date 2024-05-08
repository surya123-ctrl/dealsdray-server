const mongoose = require('mongoose');
const connectionDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log('Connected to database!');
    }
    catch (error) {
        console.log('Error connecting to database!', error);
    }
}

module.exports = connectionDatabase;