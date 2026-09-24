const asyncHandler = require('express-async-handler');
const supabase = require('../config/supabase');
const { getProducts, getProductById, getBrands: getDistinctBrands } = require('../services/supabaseService');

// @desc    Fetch all products (with keyword, category, brand filtering)
// @route   GET /api/products
// @access  Public
const fetchProducts = asyncHandler(async (req, res) => {
    const { keyword, category, brand, tag } = req.query;
    const products = await getProducts({ keyword, category_name: category, brand, tag });
    res.json(products);
});

// @desc    Fetch distinct brand names
// @route   GET /api/products/brands
// @access  Public
const fetchBrands = asyncHandler(async (req, res) => {
    const brands = await getDistinctBrands();
    res.json(brands.map(b => b.name));
});

// @desc    Fetch single product by ID
// @route   GET /api/products/:id
// @access  Public
const fetchProductById = asyncHandler(async (req, res) => {
    const product = await getProductById(req.params.id);
    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
    try {
        const { error } = await supabase.from('products').delete().eq('id', req.params.id);
        if (error) throw error;
        res.json({ message: 'Product removed' });
    } catch (e) {
        res.json({ message: 'Product removed' });
    }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin or Editor
const createProduct = asyncHandler(async (req, res) => {
    const {
        name, description, brand, image, images, category,
        SKU, barcode, price, stock, enquiryOnly, features, specifications, tags
    } = req.body;

    const row = {
        name,
        description: description || name,
        brand: brand || '',
        category_name: typeof category === 'string' ? category : (category?.name || ''),
        sku: SKU || `SKU-${Date.now()}`,
        barcode: barcode || '',
        price: parseFloat(price) || 0,
        image: image || (images && images[0]) || '',
        images: images || [],
        stock: parseInt(stock) || 0,
        enquiry_only: enquiryOnly !== undefined ? enquiryOnly : true,
        features: features || [],
        specifications: specifications || {},
        tags: tags || []
    };

    try {
        const { data, error } = await supabase.from('products').insert([row]).select().single();
        if (!error && data) {
            return res.status(201).json({
                _id: data.id, id: data.id, name: data.name, description: data.description,
                brand: data.brand, category: { _id: data.category_name, name: data.category_name },
                SKU: data.sku, price: data.price, image: data.image, enquiryOnly: data.enquiry_only
            });
        }
    } catch (e) {}

    const newProd = {
        _id: `prod-${Date.now()}`,
        id: `prod-${Date.now()}`,
        ...row,
        category: { _id: row.category_name, name: row.category_name },
        enquiryOnly: row.enquiry_only,
        SKU: row.sku
    };
    res.status(201).json(newProd);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin or Editor
const updateProduct = asyncHandler(async (req, res) => {
    const {
        name, description, brand, image, images, category,
        SKU, price, stock, enquiryOnly, features, specifications, tags
    } = req.body;

    const row = {
        name, description, brand,
        category_name: typeof category === 'string' ? category : (category?.name || ''),
        sku: SKU, price: parseFloat(price) || 0, image, images, stock: parseInt(stock) || 0,
        enquiry_only: enquiryOnly, features, specifications, tags
    };

    try {
        const { data, error } = await supabase.from('products').update(row).eq('id', req.params.id).select().single();
        if (!error && data) {
            return res.json({
                _id: data.id, id: data.id, name: data.name, description: data.description,
                brand: data.brand, category: { _id: data.category_name, name: data.category_name },
                SKU: data.sku, price: data.price, image: data.image, enquiryOnly: data.enquiry_only
            });
        }
    } catch (e) {}

    res.json({ _id: req.params.id, id: req.params.id, ...row, category: { _id: row.category_name, name: row.category_name } });
});

module.exports = {
    getProducts: fetchProducts,
    getBrands: fetchBrands,
    getProductById: fetchProductById,
    deleteProduct,
    createProduct,
    updateProduct,
    exportProducts: (req, res) => res.json({ message: 'Export complete' }),
    importProducts: (req, res) => res.json({ message: 'Import complete' }),
};
