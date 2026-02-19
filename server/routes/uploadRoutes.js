const path = require('path');
const express = require('express');
const multer = require('multer');
const router = express.Router();

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename(req, file, cb) {
        cb(
            null,
            `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
        );
    },
});

function checkFileType(file, cb) {
    const filetypes = /jpg|jpeg|png|webp/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb('Images only!');
    }
}

const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    },
});

// Single image upload
router.post('/', upload.single('image'), (req, res) => {
    res.send(`/${req.file.path.replace(/\\/g, '/')}`);
});

// Multiple images upload (up to 10)
router.post('/multiple', upload.array('images', 10), (req, res) => {
    const urls = req.files.map(f => `http://localhost:5000/${f.path.replace(/\\/g, '/')}`);
    res.json({ urls });
});

module.exports = router;
