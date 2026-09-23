const asyncHandler = require('express-async-handler');
const Review = require('../models/reviewModel');
const Product = require('../models/productModel');

// @desc    Get reviews for a product
// @route   GET /api/reviews/:productId
// @access  Public
const getProductReviews = asyncHandler(async (req, res) => {
    const reviews = await Review.find({ product: req.params.productId }).sort({ createdAt: -1 });
    res.json(reviews);
});

// @desc    Create a product review
// @route   POST /api/reviews
// @access  Public
const createProductReview = asyncHandler(async (req, res) => {
    const { productId, name, rating, comment, company } = req.body;

    if (!productId || !name || !rating || !comment) {
        res.status(400);
        throw new Error('Please fill in all required fields (name, rating, comment)');
    }

    const product = await Product.findById(productId);
    if (!product) {
        res.status(404);
        throw new Error('Product not found');
    }

    const review = await Review.create({
        product: productId,
        name,
        rating: Number(rating),
        comment,
        company: company || '',
    });

    res.status(201).json(review);
});

module.exports = {
    getProductReviews,
    createProductReview,
};
