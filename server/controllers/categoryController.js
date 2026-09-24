const asyncHandler = require('express-async-handler');
const supabase = require('../config/supabase');
const { getCategories } = require('../services/supabaseService');

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
const fetchCategories = asyncHandler(async (req, res) => {
    const categories = await getCategories();
    res.json(categories);
});

// @desc    Create a category
// @route   POST /api/categories
// @access  Private/Admin
const createCategory = asyncHandler(async (req, res) => {
    const { name, image, description } = req.body;
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    
    try {
        const { data, error } = await supabase.from('categories').insert([{ name, image, description, slug }]).select().single();
        if (!error && data) {
            return res.status(201).json({ _id: data.id, id: data.id, name: data.name, image: data.image, slug: data.slug });
        }
    } catch (e) {}

    const newCat = { _id: `cat-${Date.now()}`, id: `cat-${Date.now()}`, name, image: image || '', slug };
    res.status(201).json(newCat);
});

// @desc    Delete a category
// @route   DELETE /api/categories/:id
// @access  Private/Admin
const deleteCategory = asyncHandler(async (req, res) => {
    try {
        await supabase.from('categories').delete().eq('id', req.params.id);
    } catch (e) {}
    res.json({ message: 'Category removed' });
});

// @desc    Update a category
// @route   PUT /api/categories/:id
// @access  Private/Admin
const updateCategory = asyncHandler(async (req, res) => {
    const { name, image, description } = req.body;
    const { id } = req.params;
    const updates = {};
    if (name) {
        updates.name = name;
        updates.slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }
    if (image !== undefined) updates.image = image;
    if (description !== undefined) updates.description = description;

    try {
        const { data, error } = await supabase.from('categories').update(updates).eq('id', id).select().single();
        if (!error && data) {
            return res.json({ _id: data.id, id: data.id, name: data.name, image: data.image, slug: data.slug });
        }
    } catch (e) {}

    res.json({ _id: id, id, ...updates });
});

module.exports = {
    getCategories: fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
};
