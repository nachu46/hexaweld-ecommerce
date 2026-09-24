const asyncHandler = require('express-async-handler');
const { getProducts, getCategories } = require('../services/supabaseService');
const supabase = require('../config/supabase');

// @desc    Get full analytics data
// @route   GET /api/admin/analytics
// @access  Private/Admin
const getAnalytics = asyncHandler(async (req, res) => {
    const products = await getProducts();
    const categories = await getCategories();

    // Fetch real enquiries count & data from Supabase
    let totalEnquiries = 0;
    let enquiriesList = [];
    try {
        const { data: enqs, error } = await supabase.from('enquiries').select('*');
        if (!error && enqs) {
            totalEnquiries = enqs.length;
            enquiriesList = enqs;
        }
    } catch (e) {}

    // Group real enquiries by product if available
    const productEnquiryCounts = {};
    enquiriesList.forEach(e => {
        const pName = e.product_name || '';
        if (pName) {
            productEnquiryCounts[pName] = (productEnquiryCounts[pName] || 0) + 1;
        }
    });

    const topEnquired = Object.entries(productEnquiryCounts).map(([name, count]) => ({
        productName: name,
        name: name,
        enquiries: count
    })).slice(0, 5);

    // If real products exist, map them cleanly
    const topViewed = (products || []).slice(0, 5).map(p => ({
        _id: p._id || p.id,
        name: p.name,
        productName: p.name,
        views: 0
    }));

    res.json({
        totals: {
            products: (products || []).length,
            categories: (categories || []).length,
            enquiries: totalEnquiries,
        },
        topViewedProducts: topViewed,
        topEnquiredProducts: topEnquired,
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
