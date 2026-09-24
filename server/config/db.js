const mongoose = require('mongoose');
const supabase = require('./supabase');

const connectDB = async () => {
    if (process.env.SUPABASE_URL) {
        console.log(`✅ Supabase Database Active: ${process.env.SUPABASE_URL}`);
    }

    if (process.env.MONGO_URI) {
        try {
            const conn = await mongoose.connect(process.env.MONGO_URI, {
                serverSelectionTimeoutMS: 3000,
            });
            console.log(`MongoDB Connected: ${conn.connection.host}`);
        } catch (error) {
            console.warn(`MongoDB Notice: ${error.message} — Server running on Supabase / local storage engine.`);
        }
    } else {
        console.log('⚡ Server running 100% on Supabase Database (MongoDB disabled).');
    }
};

module.exports = connectDB;