const asyncHandler = require('express-async-handler');
const supabase = require('../config/supabase');

// Home page slider. Rows live in the `banners` table; when there are none the
// site shows its own built-in slides.

const toClient = (b) => ({
    _id: b.id,
    id: b.id,
    title: b.title,
    subtitle: b.subtitle || '',
    image: b.image_url || '',
    imageUrl: b.image_url || '',
    buttonText: b.button_text || 'View Products',
    buttonLink: b.link_url || '/products',
    linkUrl: b.link_url || '/products',
    isActive: b.is_active !== false,
    order: b.sort_order || 0,
});

// Accepts the admin form fields (image/buttonLink) and the older names (imageUrl/linkUrl).
// Only fields that are present in the request are included, so partial updates work.
const toRow = (body) => {
    const row = {};
    if (body.title !== undefined) row.title = String(body.title).trim();
    if (body.subtitle !== undefined) row.subtitle = body.subtitle;
    const image = body.image ?? body.imageUrl;
    if (image !== undefined) row.image_url = image || '';
    const link = body.buttonLink ?? body.linkUrl;
    if (link !== undefined) row.link_url = link || '/products';
    if (body.buttonText !== undefined) row.button_text = body.buttonText;
    if (body.isActive !== undefined) row.is_active = Boolean(body.isActive);
    if (body.order !== undefined) row.sort_order = parseInt(body.order, 10) || 0;
    return row;
};

const fetchAll = async (activeOnly) => {
    let query = supabase.from('banners').select('*').order('sort_order', { ascending: true }).order('created_at', { ascending: true });
    if (activeOnly) query = query.eq('is_active', true);
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return (data || []).map(toClient);
};

// @route GET /api/banners  (public — active slides only)
const getBanners = asyncHandler(async (req, res) => {
    try {
        res.json(await fetchAll(true));
    } catch (e) {
        res.json([]); // home page falls back to its built-in slides
    }
});

// @route GET /api/banners/all  (admin)
const getAllBannersAdmin = asyncHandler(async (req, res) => {
    try {
        res.json(await fetchAll(false));
    } catch (e) {
        res.status(500);
        throw new Error(`Could not load banners: ${e.message}`);
    }
});

// @route POST /api/banners  (admin)
const createBanner = asyncHandler(async (req, res) => {
    const row = toRow(req.body);
    if (!row.title) {
        res.status(400);
        throw new Error('Title is required');
    }
    if (row.image_url === undefined) row.image_url = '';
    const { data, error } = await supabase.from('banners').insert([row]).select().single();
    if (error) {
        res.status(500);
        throw new Error(`Could not save banner: ${error.message}`);
    }
    res.status(201).json(toClient(data));
});

// @route PUT /api/banners/:id  (admin)
const updateBanner = asyncHandler(async (req, res) => {
    const row = toRow(req.body);
    if (row.title === '') {
        res.status(400);
        throw new Error('Title is required');
    }
    const { data, error } = await supabase.from('banners').update(row).eq('id', req.params.id).select();
    if (error) {
        res.status(500);
        throw new Error(`Could not update banner: ${error.message}`);
    }
    if (!data || data.length === 0) {
        res.status(404);
        throw new Error('Banner not found');
    }
    res.json(toClient(data[0]));
});

// @route DELETE /api/banners/:id  (admin)
const deleteBanner = asyncHandler(async (req, res) => {
    const { data, error } = await supabase.from('banners').delete().eq('id', req.params.id).select('id');
    if (error) {
        res.status(500);
        throw new Error(`Could not delete banner: ${error.message}`);
    }
    if (!data || data.length === 0) {
        res.status(404);
        throw new Error('Banner not found');
    }
    res.json({ message: 'Banner deleted' });
});

module.exports = {
    getBanners,
    getAllBannersAdmin,
    createBanner,
    updateBanner,
    deleteBanner,
};
