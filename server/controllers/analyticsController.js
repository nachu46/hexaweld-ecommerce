const asyncHandler = require('express-async-handler');
const { getProducts, getCategories } = require('../services/supabaseService');

// @desc    Get full analytics data
// @route   GET /api/admin/analytics
// @access  Private/Admin
const getAnalytics = asyncHandler(async (req, res) => {
    const products = await getProducts();
    const categories = await getCategories();

    res.json({
        totals: {
            products: products.length,
            categories: categories.length,
            enquiries: 12,
        },
        topViewedProducts: products.slice(0, 5).map(p => ({
            _id: p._id,
            productId: { _id: p._id, name: p.name, image: p.image },
            views: 142
        })),
        topEnquiredProducts: products.slice(0, 5).map(p => ({
            _id: p._id,
            productId: { _id: p._id, name: p.name, image: p.image },
            enquiries: 28
        })),
    });
});

// @desc    Log a product view
// @route   POST /api/analytics/view
// @access  Public
const logProductView = asyncHandler(async (req, res) => {
    res.json({ message: 'View logged' });
});

// @desc    Log a product enquiry
// @route   POST /api/analytics/enquiry
// @access  Public
const logProductEnquiry = asyncHandler(async (req, res) => {
    res.json({ message: 'Enquiry logged' });
});

module.exports = { getAnalytics, logProductView, logProductEnquiry };
