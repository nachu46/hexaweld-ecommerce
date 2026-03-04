const Announcement = require('../models/announcementModel');

// @desc  Get active announcement (public — used by header)
// @route GET /api/announcement
const getAnnouncement = async (req, res) => {
    try {
        const anns = await Announcement.find({ isActive: true }).sort({ updatedAt: -1 });
        res.json(anns);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @desc  Get all announcements (admin)
// @route GET /api/announcement/all
const getAllAnnouncements = async (req, res) => {
    try {
        const list = await Announcement.find().sort({ updatedAt: -1 });
        res.json(list);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @desc  Create announcement
// @route POST /api/announcement
const createAnnouncement = async (req, res) => {
    try {
        const ann = await Announcement.create(req.body);
        res.status(201).json(ann);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// @desc  Update announcement (including isActive toggle)
// @route PUT /api/announcement/:id
const updateAnnouncement = async (req, res) => {
    try {
        const ann = await Announcement.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!ann) return res.status(404).json({ message: 'Announcement not found' });
        res.json(ann);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// @desc  Delete announcement
// @route DELETE /api/announcement/:id
const deleteAnnouncement = async (req, res) => {
    try {
        const ann = await Announcement.findByIdAndDelete(req.params.id);
        if (!ann) return res.status(404).json({ message: 'Announcement not found' });
        res.json({ message: 'Deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getAnnouncement, getAllAnnouncements, createAnnouncement, updateAnnouncement, deleteAnnouncement };
