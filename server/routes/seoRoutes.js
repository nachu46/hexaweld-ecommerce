const express = require('express');
const router = express.Router();
const { getProducts, getBrands, getCategories } = require('../services/supabaseService');

// @desc    Generate dynamic robots.txt
// @route   GET /robots.txt
// @access  Public
router.get('/robots.txt', (req, res) => {
    const baseUrl = process.env.CLIENT_URL || 'https://hexaweld-ecommerce.vercel.app';
    const robots = `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

Sitemap: ${baseUrl}/sitemap.xml
`;
    res.header('Content-Type', 'text/plain');
    res.send(robots);
});

// @desc    Generate dynamic sitemap.xml
// @route   GET /sitemap.xml
// @access  Public
router.get('/sitemap.xml', async (req, res) => {
    try {
        const baseUrl = process.env.CLIENT_URL || 'https://hexaweld-ecommerce.vercel.app';

        const [products, brands, categories] = await Promise.all([
            getProducts({}),
            getBrands(),
            getCategories(),
        ]);

        const staticUrls = [
            '/',
            '/products',
            '/categories',
            '/brands',
            '/about',
            '/contact',
            '/services',
            '/industries',
            '/faq',
            '/privacy-policy',
            '/terms-and-conditions',
            '/shipping-policy',
            '/return-policy',
        ];

        let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
        xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

        staticUrls.forEach((url) => {
            xml += `  <url>\n    <loc>${baseUrl}${url}</loc>\n    <changefreq>daily</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
        });

        (products || []).forEach((p) => {
            xml += `  <url>\n    <loc>${baseUrl}/product/${p._id || p.id}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.9</priority>\n  </url>\n`;
        });

        (brands || []).forEach((b) => {
            xml += `  <url>\n    <loc>${baseUrl}/brand/${b.slug || b._id || b.id}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
        });

        (categories || []).forEach((c) => {
            xml += `  <url>\n    <loc>${baseUrl}/category/${c.slug || c._id || c.id}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
        });

        xml += `</urlset>`;

        res.header('Content-Type', 'application/xml');
        res.send(xml);
    } catch (err) {
        res.status(500).send('Error generating sitemap');
    }
});

module.exports = router;
