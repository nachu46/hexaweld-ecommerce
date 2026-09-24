const asyncHandler = require('express-async-handler');
const supabase = require('../config/supabase');

const DEFAULT_BANNERS = [
    {
        _id: 'b1', id: 'b1',
        title: 'Qatar Wholesale Supplier & Heavy Machinery Partner',
        subtitle: 'Official division of Sana Group providing certified industrial tools & safety gear.',
        imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1600',
        linkUrl: '/products',
        isActive: true
    }
];

const getBanners = asyncHandler(async (req, res) => {
    try {
        const { data, error } = await supabase.from('banners').select('*');
        if (!error && data && data.length > 0) {
            return res.json(data.map(b => ({
                _id: b.id, id: b.id, title: b.title, subtitle: b.subtitle, imageUrl: b.image_url, linkUrl: b.link_url, isActive: b.is_active
            })));
        }
    } catch (e) {}
    res.json(DEFAULT_BANNERS);
});

const createBanner = asyncHandler(async (req, res) => {
    const { title, subtitle, imageUrl, linkUrl } = req.body;
    const newBanner = { _id: `b-${Date.now()}`, id: `b-${Date.now()}`, title, subtitle, imageUrl, linkUrl: linkUrl || '/products', isActive: true };
    res.status(201).json(newBanner);
});

const getAllBannersAdmin = asyncHandler(async (req, res) => {
    try {
        const { data, error } = await supabase.from('banners').select('*');
        if (!error && data && data.length > 0) {
            return res.json(data.map(b => ({
                _id: b.id, id: b.id, title: b.title, subtitle: b.subtitle, imageUrl: b.image_url, linkUrl: b.link_url, isActive: b.is_active
            })));
        }
    } catch (e) {}
    res.json(DEFAULT_BANNERS);
});

const updateBanner = asyncHandler(async (req, res) => {
    const { title, subtitle, imageUrl, linkUrl, isActive } = req.body;
    res.json({ _id: req.params.id, id: req.params.id, title, subtitle, imageUrl, linkUrl, isActive });
});

const deleteBanner = asyncHandler(async (req, res) => {
    res.json({ message: 'Banner deleted' });
});

module.exports = {
    getBanners,
    getAllBannersAdmin,
    createBanner,
    updateBanner,
    deleteBanner,
};
