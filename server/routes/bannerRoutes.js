const express = require('express');
const router = express.Router();
const {
    getBanners,
    getAllBannersAdmin,
    createBanner,
    updateBanner,
    deleteBanner,
} = require('../controllers/bannerController');
const { protect, requireRole } = require('../middleware/authMiddleware');

// Public — homepage uses this
router.get('/', getBanners);

// Admin routes — require authentication
router.get('/all', protect, requireRole('admin'), getAllBannersAdmin);
router.post('/', protect, requireRole('admin'), createBanner);
router.put('/:id', protect, requireRole('admin'), updateBanner);
router.delete('/:id', protect, requireRole('admin'), deleteBanner);

module.exports = router;
