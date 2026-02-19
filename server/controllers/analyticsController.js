const asyncHandler = require('express-async-handler');
const Analytics = require('../models/analyticsModel');
const Product = require('../models/productModel');
const Category = require('../models/categoryModel');
const Enquiry = require('../models/enquiryModel');

// @desc    Get full analytics data
// @route   GET /api/admin/analytics
// @access  Private/Admin
const getAnalytics = asyncHandler(async (req, res) => {
    const totalProducts = await Product.countDocuments();
    const totalCategories = await Category.countDocuments();
    const totalEnquiries = await Enquiry.countDocuments();

    const topViewedProducts = await Analytics.find()
        .sort({ views: -1 })
        .limit(10)
        .populate('productId', 'name image');

    const topEnquiredProducts = await Analytics.find()
        .sort({ enquiries: -1 })
        .limit(10)
        .populate('productId', 'name image');

    res.json({
        totals: {
            products: totalProducts,
            categories: totalCategories,
            enquiries: totalEnquiries,
        },
        topViewedProducts,
        topEnquiredProducts,
    });
});

// @desc    Log a product view (called from frontend on product page load)
// @route   POST /api/analytics/view
// @access  Public
const logProductView = asyncHandler(async (req, res) => {
    const { productId, productName } = req.body;

    if (!productId) {
        res.status(400);
        throw new Error('Product ID is required');
    }

    // Increment views in Product model
    await Product.findByIdAndUpdate(productId, { $inc: { views: 1 } });

    // Upsert Analytics record
    await Analytics.findOneAndUpdate(
        { productId },
        {
            $inc: { views: 1 },
            $set: { productName, lastViewed: new Date() },
            $setOnInsert: { enquiries: 0 },
        },
        { upsert: true, new: true }
    );

    res.json({ message: 'View logged' });
});

// @desc    Log a product enquiry (called when WhatsApp button clicked)
// @route   POST /api/analytics/enquiry
// @access  Public
const logProductEnquiry = asyncHandler(async (req, res) => {
    const { productId, productName } = req.body;

    if (!productId) {
        res.status(400);
        throw new Error('Product ID is required');
    }

    // Increment enquiries in Product model
    await Product.findByIdAndUpdate(productId, { $inc: { enquiries: 1 } });

    // Upsert Analytics record
    await Analytics.findOneAndUpdate(
        { productId },
        {
            $inc: { enquiries: 1 },
            $set: { productName },
            $setOnInsert: { views: 0 },
        },
        { upsert: true, new: true }
    );

    // Also create an Enquiry document for logging
    const Enquiry = require('../models/enquiryModel');
    await Enquiry.create({ productId, productName, timestamp: new Date() });

    res.json({ message: 'Enquiry logged' });
});

module.exports = { getAnalytics, logProductView, logProductEnquiry };
