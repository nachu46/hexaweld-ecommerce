const express = require('express');
const router = express.Router();
const { logProductView, logProductEnquiry } = require('../controllers/analyticsController');

// Public analytics endpoints - called from frontend
router.post('/view', logProductView);
router.post('/enquiry', logProductEnquiry);

module.exports = router;
