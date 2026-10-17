const express = require('express');
const router = express.Router();
const { getPageBanners, setPageBanner } = require('../controllers/pageBannerController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/', getPageBanners);
router.put('/:key', protect, admin, setPageBanner);

module.exports = router;
