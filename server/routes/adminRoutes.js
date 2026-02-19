const express = require('express');
const router = express.Router();
const { createAdmin, listAdmins, deleteAdmin } = require('../controllers/adminController');
const { getAnalytics } = require('../controllers/analyticsController');
const { protect, requireRole } = require('../middleware/authMiddleware');

// All admin management routes require superadmin role
router.post('/create-admin', protect, requireRole('superadmin'), createAdmin);
router.get('/list-admins', protect, requireRole('superadmin'), listAdmins);
router.delete('/:id', protect, requireRole('superadmin'), deleteAdmin);

// Analytics - accessible by admin and above
router.get('/analytics', protect, requireRole('admin'), getAnalytics);

module.exports = router;
