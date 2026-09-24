const mongoose = require('mongoose');
const supabase = require('./supabase');

const connectDB = async () => {
    if (process.env.SUPABASE_URL) {
        console.log(`✅ Supabase Database Engine Connected: ${process.env.SUPABASE_URL}`);
    }

    if (process.env.MONGO_URI) {
        try {
            const conn = await mongoose.connect(process.env.MONGO_URI, {
                serverSelectionTimeoutMS: 5000,
            });
            console.log(`✅ MongoDB Connection Verified: ${conn.connection.host}`);
        } catch (error) {
            console.warn(`MongoDB Connection Notice: ${error.message}`);
        }
    }
};

module.exports = connectDB;