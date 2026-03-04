const express = require('express');
const router = express.Router();
const {
    getAnnouncement,
    getAllAnnouncements,
    createAnnouncement,
    updateAnnouncement,
    deleteAnnouncement,
} = require('../controllers/announcementController');
const { protect, requireRole } = require('../middleware/authMiddleware');

// Public — header uses this
router.get('/', getAnnouncement);

// Admin only
router.get('/all', protect, requireRole('admin'), getAllAnnouncements);
router.post('/', protect, requireRole('admin'), createAnnouncement);
router.put('/:id', protect, requireRole('admin'), updateAnnouncement);
router.delete('/:id', protect, requireRole('admin'), deleteAnnouncement);

module.exports = router;
