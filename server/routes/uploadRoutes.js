const express = require('express');
const multer = require('multer');
const router = express.Router();
const path = require('path');

// Conditional storage: Use Cloudinary if configured, otherwise fallback to local disk
let storage;
const useCloudinary = process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET;

if (useCloudinary) {
    const { storage: cloudinaryStorage } = require('../config/cloudinary');
    storage = cloudinaryStorage;
} else {
    const uploadDir = path.join(__dirname, '../../client/public/uploads');

    // Ensure the destination directory exists
    const fs = require('fs');
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    storage = multer.diskStorage({
        destination(req, file, cb) {
            cb(null, uploadDir);
        },
        filename(req, file, cb) {
            cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
        },
    });
}

const checkFileType = (file, cb) => {
    const filetypes = /jpg|jpeg|png|webp/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb('Images only!');
    }
};

const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    },
});

// Single image upload
router.post('/', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).send({ message: 'No file uploaded' });
    }

    // If using Cloudinary, it returns req.file.path as the URL
    // If local, return the relative path
    const filePath = useCloudinary ? req.file.path : `/uploads/${req.file.filename}`;
    res.send(filePath);
});


// Multiple images upload (up to 10)
router.post('/multiple', upload.array('images', 10), (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).send({ message: 'No files uploaded' });
    }
    const urls = req.files.map(f => useCloudinary ? f.path : `/uploads/${f.filename}`);
    res.json({ urls });
});

module.exports = router;
