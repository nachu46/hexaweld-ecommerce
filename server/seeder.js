const mongoose = require('mongoose');
const dotenv = require('dotenv');
// const users = require('./data/users'); // Not using raw user data directly for password reason
const products = require('./data/products');
const categories = require('./data/categories');
const brands = require('./data/brands');
const User = require('./models/userModel');
const Product = require('./models/productModel');
const Category = require('./models/categoryModel');
const Brand = require('./models/brandModel');
const Enquiry = require('./models/enquiryModel');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const importData = async () => {
    try {
        await Enquiry.deleteMany();
        await Product.deleteMany();
        await Category.deleteMany();
        await Brand.deleteMany();
        await User.deleteMany();

        const adminUser = await User.create({
            name: 'Jaza Trading Admin',
            email: 'admin@jazatrading.com',
            password: 'password123',
            isAdmin: true,
        });

        console.log('Admin User Created');

        // Insert categories and brands first
        const createdCategories = await Category.insertMany(categories);
        const sampleBrands = brands.map(b => ({ ...b, user: adminUser._id }));
        await Brand.insertMany(sampleBrands);

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

        console.log('Data & Brands Imported!');
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
