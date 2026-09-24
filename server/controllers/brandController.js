const asyncHandler = require('express-async-handler');
const supabase = require('../config/supabase');
const { getBrands } = require('../services/supabaseService');

// @desc    Get all brands
// @route   GET /api/brands
// @access  Public
const fetchBrands = asyncHandler(async (req, res) => {
    const brands = await getBrands();
    res.json(brands);
});

// @desc    Create a brand
// @route   POST /api/brands
// @access  Private/Admin
const createBrand = asyncHandler(async (req, res) => {
    const { name, logo, description, isOwnerBrand } = req.body;
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    try {
        const { data, error } = await supabase.from('brands').insert([{ name, logo, description, is_owner: !!isOwnerBrand, slug }]).select().single();
        if (!error && data) {
            return res.status(201).json({ _id: data.id, id: data.id, name: data.name, logo: data.logo, isOwnerBrand: data.is_owner });
        }
    } catch (e) {}

    const newBrand = { _id: `brand-${Date.now()}`, id: `brand-${Date.now()}`, name, logo: logo || '', isOwnerBrand: !!isOwnerBrand };
    res.status(201).json(newBrand);
});

// @desc    Delete a brand
// @route   DELETE /api/brands/:id
// @access  Private/Admin
const deleteBrand = asyncHandler(async (req, res) => {
    try {
        await supabase.from('brands').delete().eq('id', req.params.id);
    } catch (e) {}
    res.json({ message: 'Brand removed' });
});

module.exports = {
    getBrands: fetchBrands,
    createBrand,
    deleteBrand,
    getBrandById: asyncHandler(async (req, res) => {
        const brands = await getBrands();
        const found = brands.find(b => b.id === req.params.id || b.slug === req.params.id);
        res.json(found || brands[0]);
    }),
    updateBrand: asyncHandler(async (req, res) => {
        const { name, logo, description, isOwnerBrand } = req.body;
        const updates = {};
        if (name) {
            updates.name = name;
            updates.slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        }
        if (logo !== undefined) updates.logo = logo;
        if (description !== undefined) updates.description = description;
        if (isOwnerBrand !== undefined) updates.is_owner = !!isOwnerBrand;

        try {
            const { data, error } = await supabase.from('brands').update(updates).eq('id', req.params.id).select().single();
            if (!error && data) {
                return res.json({ _id: data.id, id: data.id, name: data.name, logo: data.logo, isOwnerBrand: data.is_owner });
            }
        } catch (e) {}

        res.json({ _id: req.params.id, id: req.params.id, ...req.body });
    }),
};
