const supabase = require('../config/supabase');
const products = require('../data/products');

// Demo products are ordinary product rows marked by this SKU prefix,
// so admins can edit/delete them one by one or remove them all at once.
const DEMO_SKU_PREFIX = 'DEMO-';

const demoRows = () => products.map((p) => ({
    name: p.name,
    description: p.description,
    brand: p.brand || '',
    category_name: p.category,
    sku: `${DEMO_SKU_PREFIX}${p.SKU}`,
    barcode: p.barcode || '',
    price: p.price || 0,
    image: p.image || '',
    images: p.images || [],
    stock: p.stock || 0,
    enquiry_only: p.enquiryOnly !== false,
    features: p.features || [],
    specifications: p.specifications || {},
    tags: p.tags || [],
}));

const seedDemoProducts = async () => {
    const { data, error } = await supabase
        .from('products')
        .upsert(demoRows(), { onConflict: 'sku' })
        .select('id');
    if (error) throw new Error(error.message);
    return data ? data.length : 0;
};

const deleteDemoProducts = async () => {
    const { data, error } = await supabase
        .from('products')
        .delete()
        .like('sku', `${DEMO_SKU_PREFIX}%`)
        .select('id');
    if (error) throw new Error(error.message);
    return data ? data.length : 0;
};

module.exports = { DEMO_SKU_PREFIX, seedDemoProducts, deleteDemoProducts };
