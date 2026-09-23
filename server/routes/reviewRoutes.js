const express = require('express');
const router = express.Router();
const { getProductReviews, createProductReview } = require('../controllers/reviewController');

router.route('/:productId').get(getProductReviews);
router.route('/').post(createProductReview);

module.exports = router;
