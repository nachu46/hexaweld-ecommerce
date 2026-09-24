const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/productModel');
const connectDB = require('./config/db');
const supabase = require('./config/supabase');

dotenv.config();

const clearAllDemoProducts = async () => {
    console.log('🧹 Clearing all demo products...');

    // 1. Clear Mongo Products
    try {
        await connectDB();
        const deleteResult = await Product.deleteMany({});
        console.log(`✅ Cleared ${deleteResult.deletedCount} demo products from MongoDB database.`);
    } catch (err) {
        console.error('Notice clearing MongoDB products:', err.message);
    }

    // 2. Clear Supabase Products
    try {
        const { data, error } = await supabase
            .from('products')
            .delete()
            .neq('id', '00000000-0000-0000-0000-000000000000');

        if (error) {
            console.log('Supabase Notice:', error.message);
        } else {
            console.log('✅ Cleared demo products from Supabase products table.');
        }
    } catch (err) {
        console.log('Supabase Notice:', err.message);
    }

    console.log('🎉 Demo products cleanup completed!');
    process.exit(0);
};

clearAllDemoProducts();
