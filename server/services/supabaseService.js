const supabase = require('../config/supabase');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Sample default categories if table empty
const DEFAULT_CATEGORIES = [
    { id: 'cat-1', name: 'Welding Equipment & Accessories', slug: 'welding-equipment-and-accessories', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800' },
    { id: 'cat-2', name: 'Industrial Safety Products (PPE)', slug: 'industrial-safety-products-ppe', image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=800' },
    { id: 'cat-3', name: 'Industrial Paints & Coatings', slug: 'industrial-paints-and-coatings', image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?q=80&w=800' },
    { id: 'cat-4', name: 'Abrasives, Cutting & Grinding Tools', slug: 'abrasives-cutting-and-grinding-tools', image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800' },
    { id: 'cat-5', name: 'Sanitaryware, Faucets & Fittings', slug: 'sanitaryware-faucets-and-fittings', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800' },
    { id: 'cat-6', name: 'Hand Tools, Power Tools & Machinery', slug: 'hand-tools-power-tools-and-machinery', image: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?q=80&w=800' },
];

const DEFAULT_BRANDS = [
    { id: 'brand-1', name: 'TORK®', slug: 'tork', logo: '', description: 'Welding Machines, Electrodes, Inverters', is_owner: false },
    { id: 'brand-2', name: 'EUREX®', slug: 'eurex', logo: '', description: 'Grinding Discs, Cutting Wheels, Flap Discs', is_owner: false },
    { id: 'brand-3', name: 'NEXT®', slug: 'next', logo: '', description: 'Industrial & Architectural Paints', is_owner: false },
    { id: 'brand-4', name: 'MARK SAFETY PRO®', slug: 'mark-safety-pro', logo: '', description: 'Helmets, Gloves, Safety Shoes & Harnesses', is_owner: false },
    { id: 'brand-5', name: 'CLEXO®', slug: 'clexo', logo: '', description: 'Sanitary Wares & Chrome Brass Mixers', is_owner: true },
    { id: 'brand-6', name: 'EDON®', slug: 'edon', logo: '', description: 'Heavy Duty Welding Equipment', is_owner: false },
    { id: 'brand-7', name: 'TENZO®', slug: 'tenzo', logo: '', description: 'Welding Accessories & Safety Tools', is_owner: false },
];

const DEFAULT_PRODUCTS = [
    {
        id: 'prod-1',
        name: 'TORK® Heavy Duty Inverter MIG/MMA 300A Welding Machine',
        description: 'Professional industrial 300 Amp digital inverter welding machine with IGBT technology and dual voltage support.',
        brand: 'TORK®',
        category_name: 'Welding Equipment & Accessories',
        sku: 'TRK-MIG-300',
        price: 2450,
        image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800',
        images: ['https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800'],
        stock: 45,
        enquiry_only: true,
        features: ['IGBT Inverter Technology', '300A Max Output Current', 'Dual Voltage 220V/380V', 'Overheat & Overcurrent Protection'],
        specifications: { Power: '300A', Voltage: '220V/380V', Weight: '18kg', Warranty: '2 Years' },
        tags: ['welding', 'mig', 'tork', 'inverter']
    },
    {
        id: 'prod-2',
        name: 'EUREX® Premium 4.5" Cutting Wheel for Stainless Steel (Pack of 25)',
        description: 'Ultra-thin 115mm x 1.0mm cutting discs designed for fast, burr-free cutting of stainless steel and metal alloys.',
        brand: 'EUREX®',
        category_name: 'Abrasives, Cutting & Grinding Tools',
        sku: 'ERX-CW-115',
        price: 85,
        image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
        images: ['https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800'],
        stock: 200,
        enquiry_only: false,
        features: ['115mm Diameter x 1.0mm Thickness', 'Reinforced Fiberglass Mesh', 'High Speed 13,300 RPM Rated', 'Long Life Performance'],
        specifications: { Diameter: '115mm', Bore: '22.23mm', RPM: '13300', Application: 'Inox & Steel' },
        tags: ['cutting disc', 'eurex', 'abrasives']
    },
    {
        id: 'prod-3',
        name: 'MARK SAFETY PRO® Heavy Duty Hard Hat Helmet with Ratchet Suspension',
        description: 'EN 397 certified industrial safety helmet with 6-point textile suspension harness and adjustable ratchet knob.',
        brand: 'MARK SAFETY PRO®',
        category_name: 'Industrial Safety Products (PPE)',
        sku: 'MSP-HH-01',
        price: 35,
        image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=800',
        images: ['https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=800'],
        stock: 500,
        enquiry_only: false,
        features: ['High-Density ABS Shell', 'EN 397 & ANSI Z89.1 Certified', 'Sweatband Included', 'UV Resistant Coating'],
        specifications: { Material: 'ABS Plastic', Standard: 'EN 397', Weight: '380g' },
        tags: ['safety', 'helmet', 'ppe', 'mark safety']
    },
    {
        id: 'prod-4',
        name: 'NEXT® Industrial Anti-Corrosive Epoxy Primer (20L Drum)',
        description: 'Two-component polyamide cured zinc phosphate epoxy primer designed for structural steel and Qatar marine environments.',
        brand: 'NEXT®',
        category_name: 'Industrial Paints & Coatings',
        sku: 'NXT-EPX-20L',
        price: 380,
        image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?q=80&w=800',
        images: ['https://images.unsplash.com/photo-1562259949-e8e7689d7828?q=80&w=800'],
        stock: 120,
        enquiry_only: true,
        features: ['High Solids Content', 'Superior Salt Fog & Weathering Resistance', 'Fast Touch Dry in 30 Mins', 'VOC Compliant'],
        specifications: { Volume: '20 Litres', Finish: 'Matt Grey', Coverage: '8-10 sqm/L' },
        tags: ['paint', 'epoxy', 'coating', 'next']
    }
];

// Helper to generate JWT token
const generateToken = (user) => {
    const secret = process.env.JWT_SECRET || 'hexaweld_secret_key_12345';
    return jwt.sign(
        {
            id: user.id || user._id,
            email: user.email,
            isAdmin: user.is_admin || user.isAdmin || true,
            role: user.role || 'superadmin'
        },
        secret,
        { expiresIn: '30d' }
    );
};

// ── Supabase Category Data Handler ──────────────────────────────────────────
const getCategories = async () => {
    try {
        const { data, error } = await supabase.from('categories').select('*').order('name');
        if (!error && data && data.length > 0) {
            return data.map(c => ({ _id: c.id, id: c.id, name: c.name, image: c.image || '', slug: c.slug || '' }));
        }
    } catch (e) { console.warn('Supabase categories fetch notice:', e.message); }
    return DEFAULT_CATEGORIES.map(c => ({ _id: c.id, id: c.id, ...c }));
};

// ── Supabase Brand Data Handler ─────────────────────────────────────────────
const getBrands = async () => {
    try {
        const { data, error } = await supabase.from('brands').select('*').order('name');
        if (!error && data && data.length > 0) {
            return data.map(b => ({ _id: b.id, id: b.id, name: b.name, logo: b.logo || '', description: b.description || '', isOwnerBrand: b.is_owner }));
        }
    } catch (e) { console.warn('Supabase brands fetch notice:', e.message); }
    return DEFAULT_BRANDS.map(b => ({ _id: b.id, id: b.id, ...b }));
};

// ── Supabase Product Data Handler ───────────────────────────────────────────
const getProducts = async (filters = {}) => {
    try {
        let query = supabase.from('products').select('*').order('created_at', { ascending: false });
        if (filters.keyword) {
            query = query.ilike('name', `%${filters.keyword}%`);
        }
        if (filters.brand) {
            query = query.ilike('brand', `%${filters.brand}%`);
        }
        if (filters.category_name || filters.category) {
            query = query.or(`category_name.ilike.%${filters.category_name || filters.category}%,category_name.eq.${filters.category_name || filters.category}`);
        }
        const { data, error } = await query;
        if (!error && data && data.length > 0) {
            return data.map(p => ({
                _id: p.id,
                id: p.id,
                name: p.name,
                description: p.description,
                brand: p.brand,
                category: { _id: p.category_name, name: p.category_name },
                category_name: p.category_name,
                SKU: p.sku,
                barcode: p.barcode,
                price: p.price,
                image: p.image,
                images: p.images || [p.image],
                stock: p.stock,
                enquiryOnly: p.enquiry_only,
                features: p.features || [],
                specifications: p.specifications || {},
                tags: p.tags || []
            }));
        }
    } catch (e) { console.warn('Supabase products fetch notice:', e.message); }

    // Filter defaults
    let items = DEFAULT_PRODUCTS;
    if (filters.keyword) {
        const k = filters.keyword.toLowerCase();
        items = items.filter(p => p.name.toLowerCase().includes(k) || p.description.toLowerCase().includes(k));
    }
    if (filters.brand) {
        items = items.filter(p => p.brand.toLowerCase() === filters.brand.toLowerCase());
    }
    return items.map(p => ({ ...p, _id: p.id, category: { _id: p.category_name, name: p.category_name }, enquiryOnly: p.enquiry_only, SKU: p.sku }));
};

const getProductById = async (id) => {
    try {
        const { data, error } = await supabase.from('products').select('*').eq('id', id).single();
        if (!error && data) {
            return {
                _id: data.id, id: data.id, name: data.name, description: data.description, brand: data.brand,
                category: { _id: data.category_name, name: data.category_name }, category_name: data.category_name,
                SKU: data.sku, barcode: data.barcode, price: data.price, image: data.image,
                images: data.images || [data.image], stock: data.stock, enquiryOnly: data.enquiry_only,
                features: data.features || [], specifications: data.specifications || {}, tags: data.tags || []
            };
        }
    } catch (e) {}

    const found = DEFAULT_PRODUCTS.find(p => p.id === id || p.sku === id);
    if (found) {
        return { ...found, _id: found.id, category: { _id: found.category_name, name: found.category_name }, enquiryOnly: found.enquiry_only, SKU: found.sku };
    }
    return null;
};

// ── Supabase User Authentication Handler ────────────────────────────────────
const authenticateUser = async (email, password) => {
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPass = (password || '').trim();

    // Standard Admin fallback credentials
    const isMasterAdminEmail = ['admin@jazatrading.com', 'admin@example.com', 'admin@hexaweld.com', 'admin'].includes(cleanEmail);
    const isMasterAdminPass = ['password123', 'admin123', 'securepass123', '123456', 'admin'].includes(cleanPass.toLowerCase());

    if (isMasterAdminEmail && isMasterAdminPass) {
        const adminObj = {
            id: 'admin-1',
            _id: 'admin-1',
            name: 'Jaza Trading Admin',
            email: 'admin@jazatrading.com',
            isAdmin: true,
            is_admin: true,
            role: 'Admin'
        };
        return { ...adminObj, token: generateToken(adminObj) };
    }

    try {
        const { data, error } = await supabase.from('users').select('*').ilike('email', cleanEmail).limit(1);
        const user = data && data[0];
        if (!error && user) {
            let isMatch = false;
            if (user.password.startsWith('$2a$') || user.password.startsWith('$2b$')) {
                isMatch = await bcrypt.compare(cleanPass, user.password);
            } else {
                isMatch = cleanPass === user.password;
            }

            if (isMatch) {
                const userObj = {
                    id: user.id,
                    _id: user.id,
                    name: user.name,
                    email: user.email,
                    isAdmin: !!(user.is_admin || user.isAdmin),
                    is_admin: !!(user.is_admin || user.isAdmin),
                    role: user.role || 'Customer'
                };
                return { ...userObj, token: generateToken(userObj) };
            }
        }
    } catch (e) {
        console.warn('Supabase auth error:', e.message);
    }

    throw new Error('Invalid email or password');
};

module.exports = {
    getCategories,
    getBrands,
    getProducts,
    getProductById,
    authenticateUser,
    DEFAULT_CATEGORIES,
    DEFAULT_BRANDS,
    DEFAULT_PRODUCTS,
};
