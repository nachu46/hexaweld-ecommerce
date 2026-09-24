const asyncHandler = require('express-async-handler');

const getAnnouncement = asyncHandler(async (req, res) => {
    res.json({
        _id: 'ann-1', id: 'ann-1',
        message: '⚡ Welcome to Jaza Trading W.L.L — Qatar Wholesale Industrial Supplier',
        link: '/products',
        isActive: true
    });
});

module.exports = {
    getAnnouncement,
    getAllAnnouncements: asyncHandler(async (req, res) => res.json([])),
    createAnnouncement: asyncHandler(async (req, res) => res.status(201).json({ message: 'Created' })),
    updateAnnouncement: asyncHandler(async (req, res) => res.json({ message: 'Updated' })),
    deleteAnnouncement: asyncHandler(async (req, res) => res.json({ message: 'Deleted' })),
};
