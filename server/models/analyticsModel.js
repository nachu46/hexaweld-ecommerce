const mongoose = require('mongoose');

const analyticsSchema = mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
        unique: true,
    },
    productName: {
        type: String,
        required: true,
    },
    views: {
        type: Number,
        default: 0,
    },
    enquiries: {
        type: Number,
        default: 0,
    },
    lastViewed: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true,
});

const Analytics = mongoose.model('Analytics', analyticsSchema);

module.exports = Analytics;
