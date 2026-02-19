const mongoose = require('mongoose');
const dotenv = require('dotenv');
// const users = require('./data/users'); // Not using raw user data directly for password reason
const products = require('./data/products');
const categories = require('./data/categories');
const User = require('./models/userModel');
const Product = require('./models/productModel');
const Category = require('./models/categoryModel');
const Enquiry = require('./models/enquiryModel');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const importData = async () => {
    try {
        await Enquiry.deleteMany();
        await Product.deleteMany();
        await Category.deleteMany();
        await User.deleteMany();

        // Create Admin User manually to trigger pre-save hook or hash it
        // Actually, User.insertMany does NOT trigger pre-save middleware.
        // So we use User.create or loop.
        const adminUser = await User.create({
            name: 'Hexaweld Admin',
            email: 'admin@hexaweld.com',
            password: 'password123',
            isAdmin: true,
        });

        console.log('Admin User Created');

        // Insert categories first
        const createdCategories = await Category.insertMany(categories);

        // Map category names to IDs for products
        const sampleProducts = products.map((product) => {
            const category = createdCategories.find(c => c.name === product.category);
            return {
                ...product,
                user: adminUser._id,
                category: category ? category._id : createdCategories[0]._id // Fallback
            };
        });

        await Product.insertMany(sampleProducts);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Enquiry.deleteMany();
        await Product.deleteMany();
        await Category.deleteMany();
        await User.deleteMany();

        console.log('Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
