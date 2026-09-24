const express = require('express');
const router = express.Router();
const { getProductReviews, getAllReviews, createProductReview } = require('../controllers/reviewController');

router.route('/').get(getAllReviews).post(createProductReview);
router.route('/:productId').get(getProductReviews);

module.exports = router;
