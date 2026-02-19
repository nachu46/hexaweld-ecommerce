const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {
    getProducts,
    getProductById,
    deleteProduct,
    updateProduct,
    createProduct,
    exportProducts,
    importProducts,
} = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware');

// Multer config for Excel import (stores temp file)
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) =>
        cb(null, `import-${Date.now()}${path.extname(file.originalname)}`),
});
const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const allowed = /xlsx|xls|csv/;
        if (allowed.test(path.extname(file.originalname).toLowerCase())) {
            cb(null, true);
        } else {
            cb(new Error('Only .xlsx, .xls, .csv files are allowed'));
        }
    },
});

// Export — must come BEFORE /:id routes so "export" isn't treated as an id
router.get('/export', protect, admin, exportProducts);

// Import
router.post('/import', protect, admin, upload.single('file'), importProducts);

// Standard CRUD
router.route('/')
    .get(getProducts)
    .post(protect, admin, createProduct);

router.route('/:id')
    .get(getProductById)
    .delete(protect, admin, deleteProduct)
    .put(protect, admin, updateProduct);

module.exports = router;
