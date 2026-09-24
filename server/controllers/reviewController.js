const asyncHandler = require('express-async-handler');
const supabase = require('../config/supabase');

// @desc    Get reviews for a product
// @route   GET /api/reviews/:productId
// @access  Public
const getProductReviews = asyncHandler(async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('reviews')
            .select('*')
            .eq('product_id', req.params.productId)
            .order('created_at', { ascending: false });

        if (!error && data) {
            return res.json(data.map(r => ({
                _id: r.id,
                id: r.id,
                product: r.product_id,
                name: r.name,
                rating: r.rating,
                comment: r.comment,
                company: r.company,
                createdAt: r.created_at
            })));
        }
    } catch (e) {}

    res.json([]);
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

    const newRev = {
        _id: `rev-${Date.now()}`,
        id: `rev-${Date.now()}`,
        product: productId,
        name,
        rating: Number(rating),
        comment,
        company: company || '',
        createdAt: new Date().toISOString()
    };

    try {
        const { data, error } = await supabase.from('reviews').insert([{
            product_id: productId,
            name,
            rating: Number(rating),
            comment,
            company: company || ''
        }]).select().single();

        if (!error && data) {
            return res.status(201).json({
                _id: data.id,
                id: data.id,
                product: data.product_id,
                name: data.name,
                rating: data.rating,
                comment: data.comment,
                company: data.company,
                createdAt: data.created_at
            });
        }
    } catch (e) {}

    res.status(201).json(newRev);
});

// @desc    Get all reviews (recent/featured)
// @route   GET /api/reviews
// @access  Public
const getAllReviews = asyncHandler(async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('reviews')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(30);

        if (!error && data) {
            return res.json(data.map(r => ({
                _id: r.id,
                id: r.id,
                product: r.product_id,
                name: r.name,
                rating: r.rating,
                comment: r.comment,
                company: r.company,
                createdAt: r.created_at
            })));
        }
    } catch (e) {}

    res.json([]);
});

module.exports = {
    getProductReviews,
    getAllReviews,
    createProductReview,
};
