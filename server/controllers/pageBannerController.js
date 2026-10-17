const asyncHandler = require('express-async-handler');
const supabase = require('../config/supabase');

// Pages whose top banner image can be changed from the admin panel
const PAGE_KEYS = ['about', 'products', 'categories', 'brands', 'certificates', 'services', 'industries', 'career', 'faq', 'contact', 'checkout', 'policies'];

// @desc    Get custom banner images for all pages, as { pageKey: imageUrl }
// @route   GET /api/page-banners
// @access  Public
const getPageBanners = asyncHandler(async (req, res) => {
    const { data, error } = await supabase.from('page_banners').select('page_key, image');
    if (error) {
        // Site falls back to its default images if this fails
        return res.json({});
    }
    const map = {};
    (data || []).forEach((row) => { if (row.image) map[row.page_key] = row.image; });
    res.json(map);
});

// @desc    Set (or clear, with an empty image) the banner image for one page
// @route   PUT /api/page-banners/:key
// @access  Private/Admin
const setPageBanner = asyncHandler(async (req, res) => {
    const { key } = req.params;
    if (!PAGE_KEYS.includes(key)) {
        res.status(400);
        throw new Error(`Unknown page "${key}"`);
    }
    const image = typeof req.body.image === 'string' ? req.body.image.trim() : '';

    const { error } = image
        ? await supabase.from('page_banners').upsert({ page_key: key, image, updated_at: new Date().toISOString() }, { onConflict: 'page_key' })
        : await supabase.from('page_banners').delete().eq('page_key', key);

    if (error) {
        res.status(500);
        throw new Error(`Could not save banner: ${error.message}`);
    }
    res.json({ page: key, image });
});

module.exports = { getPageBanners, setPageBanner, PAGE_KEYS };
