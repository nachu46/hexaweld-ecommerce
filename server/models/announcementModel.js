const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema(
    {
        badge: { type: String, default: 'PROMO' },       // Left badge label e.g. "PROMO", "SALE"
        message: { type: String, required: true },         // Main announcement text
        linkText: { type: String, default: 'Shop Now' },  // CTA link label
        linkUrl: { type: String, default: '/products' },  // CTA link destination
        isActive: { type: Boolean, default: true },        // Show/hide the bar
        bgColor: { type: String, default: '#0F172A' },    // Background colour
        textColor: { type: String, default: '#ffffff' },  // Text colour
        accentColor: { type: String, default: '#F97316' },// Badge / link colour
    },
    { timestamps: true }
);

module.exports = mongoose.model('Announcement', announcementSchema);
