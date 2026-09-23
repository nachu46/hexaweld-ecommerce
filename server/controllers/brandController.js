const asyncHandler = require('express-async-handler');
const Brand = require('../models/brandModel');

// @desc    Fetch all brands
// @route   GET /api/brands
// @access  Public
const getBrands = asyncHandler(async (req, res) => {
    const brands = await Brand.find({}).sort({ displayOrder: 1, createdAt: -1 });
    res.json(brands);
});

// @desc    Fetch single brand by ID or Slug
// @route   GET /api/brands/:id
// @access  Public
const getBrandById = asyncHandler(async (req, res) => {
    const param = req.params.id.trim();
    const isObjectId = param.match(/^[0-9a-fA-F]{24}$/);
    let brand;

    if (isObjectId) {
        brand = await Brand.findById(param);
    }

    if (!brand) {
        brand = await Brand.findOne({ slug: param.toLowerCase() });
    }

    if (!brand) {
        brand = await Brand.findOne({ name: { $regex: new RegExp(`^${param}$`, 'i') } });
    }

    if (brand) {
        res.json(brand);
    } else {
        res.status(404);
        throw new Error('Brand not found');
    }
});

// @desc    Create a new brand with images
// @route   POST /api/brands
// @access  Private/Admin
const createBrand = asyncHandler(async (req, res) => {
    const {
        name,
        slug,
        description,
        category,
        badgeTag,
        logo,
        banner,
        images,
        website,
        displayOrder,
        isRegistered,
    } = req.body;

    if (!name) {
        res.status(400);
        throw new Error('Brand name is required');
    }

    const brandExists = await Brand.findOne({ name: { $regex: new RegExp(`^${name.trim()}$`, 'i') } });
    if (brandExists) {
        res.status(400);
        throw new Error('A brand with this name already exists');
    }

    const generatedSlug = slug
        ? slug.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-')
        : name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-');

    const brand = new Brand({
        user: req.user._id,
        name: name.trim(),
        slug: generatedSlug,
        description: description || '',
        category: category || '',
        badgeTag: badgeTag || 'REGISTERED',
        logo: logo || '',
        banner: banner || '',
        images: Array.isArray(images) ? images : [],
        website: website || '',
        displayOrder: Number(displayOrder) || 0,
        isRegistered: isRegistered !== undefined ? isRegistered : true,
    });

    const createdBrand = await brand.save();
    res.status(201).json(createdBrand);
});

// @desc    Update a brand
// @route   PUT /api/brands/:id
// @access  Private/Admin
const updateBrand = asyncHandler(async (req, res) => {
    const brand = await Brand.findById(req.params.id);

    if (brand) {
        brand.name = req.body.name ? req.body.name.trim() : brand.name;
        if (req.body.name) {
            brand.slug = req.body.slug
                ? req.body.slug.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-')
                : req.body.name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-');
        }
        brand.description = req.body.description !== undefined ? req.body.description : brand.description;
        brand.category = req.body.category !== undefined ? req.body.category : brand.category;
        brand.badgeTag = req.body.badgeTag !== undefined ? req.body.badgeTag : brand.badgeTag;
        brand.logo = req.body.logo !== undefined ? req.body.logo : brand.logo;
        brand.banner = req.body.banner !== undefined ? req.body.banner : brand.banner;
        brand.images = Array.isArray(req.body.images) ? req.body.images : brand.images;
        brand.website = req.body.website !== undefined ? req.body.website : brand.website;
        brand.displayOrder = req.body.displayOrder !== undefined ? Number(req.body.displayOrder) : brand.displayOrder;
        brand.isRegistered = req.body.isRegistered !== undefined ? req.body.isRegistered : brand.isRegistered;

        const updatedBrand = await brand.save();
        res.json(updatedBrand);
    } else {
        res.status(404);
        throw new Error('Brand not found');
    }
});

// @desc    Delete a brand
// @route   DELETE /api/brands/:id
// @access  Private/Admin
const deleteBrand = asyncHandler(async (req, res) => {
    const brand = await Brand.findById(req.params.id);

    if (brand) {
        await brand.deleteOne();
        res.json({ message: 'Brand deleted successfully' });
    } else {
        res.status(404);
        throw new Error('Brand not found');
    }
});

module.exports = {
    getBrands,
    getBrandById,
    createBrand,
    updateBrand,
    deleteBrand,
};
