const mongoose = require('mongoose');

const enquirySchema = mongoose.Schema({
    // Product info
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: false,
    },
    productName: { type: String, default: '' },
    SKU: { type: String, default: '' },
    productUrl: { type: String, default: '' },

    // Customer info
    customerName: { type: String, default: '' },
    customerPhone: { type: String, default: '' },
    customerEmail: { type: String, default: '' },
    message: { type: String, default: '' },

    // Tracking
    source: {
        type: String,
        enum: ['whatsapp', 'form', 'quick_view'],
        default: 'form',
    },
    timestamp: { type: Date, default: Date.now },
}, {
    timestamps: true,
});

const Enquiry = mongoose.model('Enquiry', enquirySchema);

module.exports = Enquiry;
