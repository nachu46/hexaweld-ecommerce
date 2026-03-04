const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema(
    {
        label: { type: String, default: '' },          // Badge text e.g. "NEW ARRIVALS"
        title: { type: String, required: true },        // Big hero heading
        subtitle: { type: String, default: '' },        // Sub-heading below title
        buttonText: { type: String, default: 'Shop Now' },
        buttonLink: { type: String, default: '/products' },
        bgGradient: { type: String, default: 'from-[#0F172A] to-[#1E3A5F]' }, // Tailwind gradient classes
        accentColor: { type: String, default: '#F97316' }, // Hex colour for badge / CTA
        image: { type: String, default: '' },           // Optional background image URL
        isActive: { type: Boolean, default: true },     // Toggle on/off
        order: { type: Number, default: 0 },            // Display sort order
    },
    { timestamps: true }
);

module.exports = mongoose.model('Banner', bannerSchema);
