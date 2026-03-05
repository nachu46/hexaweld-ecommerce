const mongoose = require('mongoose');

const variantSchema = mongoose.Schema({
    name: { type: String, required: true },   // e.g. "Amperage", "Size", "Model"
    value: { type: String, required: true },  // e.g. "200A", "Large", "MIG-250"
});

const productSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },

    // ── Basic Info ──────────────────────────────────────────────────────────
    name: { type: String, required: true },
    description: { type: String, required: true },
    brand: { type: String, default: '' },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },

    // ── SKU / Barcode ────────────────────────────────────────────────────────
    SKU: { type: String, unique: true, sparse: true },
    barcode: { type: String, default: '' },

    // ── Images ───────────────────────────────────────────────────────────────
    image: { type: String, default: '' },          // primary (backwards compat)
    images: [{ type: String }],                     // all images ordered array

    // ── Pricing ──────────────────────────────────────────────────────────────
    price: { type: Number, default: 0 },
    comparePrice: { type: Number, default: 0 },    // "compare at" / RRP
    costPerItem: { type: Number, default: 0 },     // cost of goods

    // ── Inventory ────────────────────────────────────────────────────────────
    stock: { type: Number, default: 0 },
    trackInventory: { type: Boolean, default: false },

    // ── Variants ─────────────────────────────────────────────────────────────
    variants: [variantSchema],

    // ── Features ─────────────────────────────────────────────────────────────
    features: [{ type: String }],

    // ── Specifications (key-value object) ────────────────────────────────────
    specifications: { type: mongoose.Schema.Types.Mixed, default: {} },

    // ── Tags ─────────────────────────────────────────────────────────────────
    tags: [{ type: String }],

    // ── Related Products ─────────────────────────────────────────────────────
    relatedProducts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    }],

    // ── SEO ──────────────────────────────────────────────────────────────────
    seoTitle: { type: String, default: '' },
    seoDescription: { type: String, default: '' },
    seoKeywords: { type: String, default: '' },
    slug: { type: String, default: '' },

    // ── Analytics ────────────────────────────────────────────────────────────
    views: { type: Number, default: 0 },
    enquiries: { type: Number, default: 0 },

    // ── Enquiry Mode ─────────────────────────────────────────────────────────
    enquiryOnly: { type: Boolean, default: true },  // hides price, shows "Contact for Price"

}, {
    timestamps: true,
});

// Auto-generate slug from name if not set
productSchema.pre('save', async function () {
    if (!this.slug && this.name) {
        this.slug = this.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
