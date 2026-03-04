const Banner = require('../models/bannerModel');

// @desc  Get all ACTIVE banners (public — used by homepage)
// @route GET /api/banners
const getBanners = async (req, res) => {
    try {
        const banners = await Banner.find({ isActive: true }).sort({ order: 1, createdAt: 1 });
        res.json(banners);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @desc  Get ALL banners including inactive (admin only)
// @route GET /api/banners/all
const getAllBannersAdmin = async (req, res) => {
    try {
        const banners = await Banner.find().sort({ order: 1, createdAt: 1 });
        res.json(banners);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @desc  Create a banner
// @route POST /api/banners
const createBanner = async (req, res) => {
    try {
        const banner = await Banner.create(req.body);
        res.status(201).json(banner);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// @desc  Update a banner (all fields including isActive toggle)
// @route PUT /api/banners/:id
const updateBanner = async (req, res) => {
    try {
        const banner = await Banner.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!banner) return res.status(404).json({ message: 'Banner not found' });
        res.json(banner);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// @desc  Delete a banner
// @route DELETE /api/banners/:id
const deleteBanner = async (req, res) => {
    try {
        const banner = await Banner.findByIdAndDelete(req.params.id);
        if (!banner) return res.status(404).json({ message: 'Banner not found' });
        res.json({ message: 'Banner deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getBanners, getAllBannersAdmin, createBanner, updateBanner, deleteBanner };
