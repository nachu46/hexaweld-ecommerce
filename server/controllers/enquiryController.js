const asyncHandler = require('express-async-handler');
const Enquiry = require('../models/enquiryModel');
const Product = require('../models/productModel');

// @desc    Create new enquiry (form or whatsapp click tracking)
// @route   POST /api/enquiries
// @access  Public
const createEnquiry = asyncHandler(async (req, res) => {
    const {
        productId, productName, SKU, productUrl,
        customerName, customerPhone, customerEmail,
        message, source,
    } = req.body;

    // Increment product enquiry counter
    if (productId) {
        await Product.findByIdAndUpdate(productId, { $inc: { enquiries: 1 } });
    }

    const enquiry = new Enquiry({
        productId: productId || null,
        productName: productName || '',
        SKU: SKU || '',
        productUrl: productUrl || '',
        customerName: customerName || '',
        customerPhone: customerPhone || '',
        customerEmail: customerEmail || '',
        message: message || '',
        source: source || 'form',
    });

    const created = await enquiry.save();
    res.status(201).json(created);
});

// @desc    Get all enquiries
// @route   GET /api/enquiries
// @access  Private/Admin
const getEnquiries = asyncHandler(async (req, res) => {
    const enquiries = await Enquiry.find({})
        .populate('productId', 'name SKU')
        .sort({ createdAt: -1 });
    res.json(enquiries);
});

module.exports = { createEnquiry, getEnquiries };
