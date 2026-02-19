const asyncHandler = require('express-async-handler');
const Product = require('../models/productModel');
const XLSX = require('xlsx');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// ─── Helper: compute related products ───────────────────────────────────────
const computeRelated = async (product, limit = 6) => {
    const tagFilter = product.tags && product.tags.length > 0
        ? { tags: { $in: product.tags } }
        : {};

    const related = await Product.find({
        _id: { $ne: product._id },
        $or: [
            { category: product.category },
            tagFilter,
        ],
    })
        .limit(limit)
        .select('_id name image images price SKU category');

    return related.map(r => r._id);
};

// ─── Helper: build slug ──────────────────────────────────────────────────────
const buildSlug = (name) =>
    name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

// ─────────────────────────────────────────────────────────────────────────────
// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
// ─────────────────────────────────────────────────────────────────────────────
const getProducts = asyncHandler(async (req, res) => {
    const keyword = req.query.keyword
        ? { name: { $regex: req.query.keyword, $options: 'i' } }
        : {};

    const tagFilter = req.query.tag ? { tags: req.query.tag } : {};
    const category = req.query.category ? { category: req.query.category } : {};

    const products = await Product.find({ ...keyword, ...category, ...tagFilter })
        .populate('category', 'name')
        .sort({ createdAt: -1 });

    res.json(products);
});

// ─────────────────────────────────────────────────────────────────────────────
// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
// ─────────────────────────────────────────────────────────────────────────────
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
        .populate('category', 'name')
        .populate('relatedProducts', 'name image images price SKU category');

    if (product) {
        // Increment view counter
        product.views += 1;
        await product.save();
        res.json(product);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// ─────────────────────────────────────────────────────────────────────────────
// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
// ─────────────────────────────────────────────────────────────────────────────
const deleteProduct = asyncHandler(async (req, res) => {
    if (req.user.role === 'editor') {
        res.status(403);
        throw new Error('Editors are not allowed to delete products');
    }

    const product = await Product.findById(req.params.id);

    if (product) {
        await Product.deleteOne({ _id: product._id });
        res.json({ message: 'Product removed' });
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// ─────────────────────────────────────────────────────────────────────────────
// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin or Editor
// ─────────────────────────────────────────────────────────────────────────────
const createProduct = asyncHandler(async (req, res) => {
    const {
        name, description, brand, image, images, category,
        SKU, barcode,
        price, comparePrice, costPerItem,
        stock, trackInventory,
        specifications, variants, features, tags,
        seoTitle, seoDescription, seoKeywords, slug,
        enquiryOnly,
    } = req.body;

    if (SKU) {
        const existing = await Product.findOne({ SKU });
        if (existing) {
            res.status(400);
            throw new Error(`Product with SKU "${SKU}" already exists. Use update instead.`);
        }
    }

    const product = new Product({
        name,
        user: req.user._id,
        description,
        brand: brand || '',
        image: image || (images && images[0]) || '',
        images: images || [],
        category,
        SKU: SKU || null,
        barcode: barcode || '',
        price: price || 0,
        comparePrice: comparePrice || 0,
        costPerItem: costPerItem || 0,
        stock: stock || 0,
        trackInventory: trackInventory || false,
        specifications: specifications || {},
        variants: variants || [],
        features: features || [],
        tags: tags || [],
        seoTitle: seoTitle || name,
        seoDescription: seoDescription || description,
        seoKeywords: seoKeywords || '',
        slug: slug || buildSlug(name),
        enquiryOnly: enquiryOnly !== undefined ? enquiryOnly : true,
    });

    const createdProduct = await product.save();

    // Compute related products
    const relatedIds = await computeRelated(createdProduct);
    createdProduct.relatedProducts = relatedIds;
    await createdProduct.save();

    res.status(201).json(createdProduct);
});

// ─────────────────────────────────────────────────────────────────────────────
// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin or Editor
// ─────────────────────────────────────────────────────────────────────────────
const updateProduct = asyncHandler(async (req, res) => {
    const {
        name, description, brand, image, images, category,
        SKU, barcode,
        price, comparePrice, costPerItem,
        stock, trackInventory,
        specifications, variants, features, tags,
        seoTitle, seoDescription, seoKeywords, slug,
        enquiryOnly,
    } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
        res.status(404);
        throw new Error('Product not found');
    }

    // If SKU changed, check for conflicts
    if (SKU && SKU !== product.SKU) {
        const conflict = await Product.findOne({ SKU, _id: { $ne: product._id } });
        if (conflict) {
            res.status(400);
            throw new Error(`SKU "${SKU}" is already used by another product`);
        }
    }

    product.name = name || product.name;
    product.description = description || product.description;
    product.brand = brand !== undefined ? brand : product.brand;
    product.image = image || product.image;
    product.images = images !== undefined ? images : product.images;
    product.category = category || product.category;
    product.SKU = SKU !== undefined ? SKU : product.SKU;
    product.barcode = barcode !== undefined ? barcode : product.barcode;
    product.price = price !== undefined ? price : product.price;
    product.comparePrice = comparePrice !== undefined ? comparePrice : product.comparePrice;
    product.costPerItem = costPerItem !== undefined ? costPerItem : product.costPerItem;
    product.stock = stock !== undefined ? stock : product.stock;
    product.trackInventory = trackInventory !== undefined ? trackInventory : product.trackInventory;
    product.specifications = specifications !== undefined ? specifications : product.specifications;
    product.variants = variants !== undefined ? variants : product.variants;
    product.features = features !== undefined ? features : product.features;
    product.tags = tags !== undefined ? tags : product.tags;
    product.seoTitle = seoTitle !== undefined ? seoTitle : product.seoTitle;
    product.seoDescription = seoDescription !== undefined ? seoDescription : product.seoDescription;
    product.seoKeywords = seoKeywords !== undefined ? seoKeywords : product.seoKeywords;
    product.slug = slug || buildSlug(product.name);
    product.enquiryOnly = enquiryOnly !== undefined ? enquiryOnly : product.enquiryOnly;

    // Recompute related products
    const relatedIds = await computeRelated(product);
    product.relatedProducts = relatedIds;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
});

// ─────────────────────────────────────────────────────────────────────────────
// @desc    Export products to Excel (Shopify-compatible)
// @route   GET /api/products/export
// @access  Private/Admin
// ─────────────────────────────────────────────────────────────────────────────
const exportProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({}).populate('category', 'name');

    const rows = products.map((p) => ({
        Title: p.name,
        Description: p.description,
        Brand: p.brand || '',
        Category: p.category?.name || '',
        SKU: p.SKU || '',
        Barcode: p.barcode || '',
        Price: p.price || 0,
        'Compare Price': p.comparePrice || 0,
        'Cost Per Item': p.costPerItem || 0,
        Stock: p.stock || 0,
        'Track Inventory': p.trackInventory ? 'TRUE' : 'FALSE',
        Images: (p.images || []).join(' | '),
        Tags: (p.tags || []).join(', '),
        Features: (p.features || []).join(' | '),
        Specifications: JSON.stringify(p.specifications || {}),
        Variants: (p.variants || []).map(v => `${v.name}:${v.value}`).join(' | '),
        'SEO Title': p.seoTitle || '',
        'SEO Description': p.seoDescription || '',
        'SEO Keywords': p.seoKeywords || '',
        Slug: p.slug || '',
        'Enquiry Only': p.enquiryOnly ? 'TRUE' : 'FALSE',
        'Created At': p.createdAt ? p.createdAt.toISOString() : '',
    }));

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(rows);

    // Column widths
    ws['!cols'] = [
        { wch: 40 }, { wch: 60 }, { wch: 20 }, { wch: 20 },
        { wch: 15 }, { wch: 15 }, { wch: 10 }, { wch: 15 },
        { wch: 15 }, { wch: 10 }, { wch: 15 }, { wch: 60 },
        { wch: 30 }, { wch: 60 }, { wch: 60 }, { wch: 40 },
        { wch: 40 }, { wch: 60 }, { wch: 30 }, { wch: 20 }, { wch: 25 },
    ];

    XLSX.utils.book_append_sheet(wb, ws, 'Products');

    const buffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });

    res.setHeader('Content-Disposition', 'attachment; filename="hexaweld-products.xlsx"');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.send(buffer);
});

// ─────────────────────────────────────────────────────────────────────────────
// @desc    Import products from Excel (upsert by SKU)
// @route   POST /api/products/import
// @access  Private/Admin
// ─────────────────────────────────────────────────────────────────────────────
const importProducts = asyncHandler(async (req, res) => {
    if (!req.file) {
        res.status(400);
        throw new Error('No file uploaded');
    }

    const workbook = XLSX.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const rows = XLSX.utils.sheet_to_json(sheet);

    // Clean up temp file
    fs.unlink(req.file.path, () => { });

    const Category = require('../models/categoryModel');
    const User = require('../models/userModel');

    // Use the requesting user as the owner
    const userId = req.user._id;

    const results = { created: 0, updated: 0, errors: [] };

    for (const row of rows) {
        try {
            const sku = row['SKU'] ? String(row['SKU']).trim() : '';
            const name = row['Title'] ? String(row['Title']).trim() : '';
            const description = row['Description'] ? String(row['Description']).trim() : '';

            if (!name) continue; // skip empty rows

            // Resolve category by name
            let categoryId = null;
            if (row['Category']) {
                const cat = await Category.findOne({ name: { $regex: new RegExp(`^${row['Category'].trim()}$`, 'i') } });
                if (cat) categoryId = cat._id;
            }

            // Parse images
            const images = row['Images']
                ? row['Images'].split('|').map(s => s.trim()).filter(Boolean)
                : [];

            // Parse tags
            const tags = row['Tags']
                ? row['Tags'].split(',').map(s => s.trim()).filter(Boolean)
                : [];

            // Parse features
            const features = row['Features']
                ? row['Features'].split('|').map(s => s.trim()).filter(Boolean)
                : [];

            // Parse specifications (stored as JSON string)
            let specifications = {};
            if (row['Specifications']) {
                try {
                    specifications = JSON.parse(row['Specifications']);
                } catch {
                    specifications = {};
                }
            }

            // Parse variants  "Name:Value | Name2:Value2"
            const variants = row['Variants']
                ? row['Variants'].split('|').map(s => {
                    const [n, v] = s.split(':').map(x => x.trim());
                    return n && v ? { name: n, value: v } : null;
                }).filter(Boolean)
                : [];

            const productData = {
                name,
                description: description || name,
                brand: row['Brand'] ? String(row['Brand']).trim() : '',
                SKU: sku,
                barcode: row['Barcode'] ? String(row['Barcode']).trim() : '',
                price: parseFloat(row['Price']) || 0,
                comparePrice: parseFloat(row['Compare Price']) || 0,
                costPerItem: parseFloat(row['Cost Per Item']) || 0,
                stock: parseInt(row['Stock']) || 0,
                trackInventory: row['Track Inventory'] === 'TRUE',
                image: images[0] || '',
                images,
                tags,
                features,
                specifications,
                variants,
                seoTitle: row['SEO Title'] || name,
                seoDescription: row['SEO Description'] || description,
                seoKeywords: row['SEO Keywords'] || '',
                slug: row['Slug'] || buildSlug(name),
                enquiryOnly: row['Enquiry Only'] !== undefined
                    ? String(row['Enquiry Only']).toUpperCase() !== 'FALSE'
                    : true,
                ...(categoryId && { category: categoryId }),
            };

            if (sku) {
                // Upsert by SKU
                const existing = await Product.findOne({ SKU: sku });
                if (existing) {
                    await Product.findByIdAndUpdate(existing._id, { $set: productData });
                    results.updated++;
                } else {
                    if (!categoryId) {
                        // Category required for new products — use the first available
                        const firstCat = await Category.findOne();
                        if (firstCat) productData.category = firstCat._id;
                    }
                    await Product.create({ ...productData, user: userId });
                    results.created++;
                }
            } else {
                // No SKU — match by exact name or create new
                const existing = await Product.findOne({ name });
                if (existing) {
                    await Product.findByIdAndUpdate(existing._id, { $set: productData });
                    results.updated++;
                } else {
                    if (!categoryId) {
                        const firstCat = await Category.findOne();
                        if (firstCat) productData.category = firstCat._id;
                    }
                    await Product.create({ ...productData, user: userId });
                    results.created++;
                }
            }
        } catch (err) {
            results.errors.push({ row: row['Title'] || 'Unknown', error: err.message });
        }
    }

    res.json({
        message: `Import complete: ${results.created} created, ${results.updated} updated`,
        ...results,
    });
});

module.exports = {
    getProducts,
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct,
    exportProducts,
    importProducts,
};
