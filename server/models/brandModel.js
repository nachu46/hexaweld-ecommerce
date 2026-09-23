const mongoose = require('mongoose');

const brandSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        slug: {
            type: String,
            required: true,
            lowercase: true,
        },
        description: {
            type: String,
            default: '',
        },
        category: {
            type: String,
            default: '',
        },
        badgeTag: {
            type: String,
            default: 'REGISTERED',
        },
        logo: {
            type: String,
            default: '',
        },
        banner: {
            type: String,
            default: '',
        },
        images: [
            {
                type: String,
            }
        ],
        website: {
            type: String,
            default: '',
        },
        displayOrder: {
            type: Number,
            default: 0,
        },
        isRegistered: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

const Brand = mongoose.model('Brand', brandSchema);

module.exports = Brand;
