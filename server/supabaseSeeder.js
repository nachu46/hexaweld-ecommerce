const supabase = require('./config/supabase');
const categories = require('./data/categories');
const products = require('./data/products');

const seedSupabase = async () => {
    console.log('🚀 Starting Supabase Database Setup & Seeding...');

    try {
        // 1. Seed Categories
        console.log('📦 Seeding Categories to Supabase...');
        const { data: catData, error: catError } = await supabase
            .from('categories')
            .upsert(
                categories.map(c => ({
                    name: c.name,
                    image: c.image || ''
                })),
                { onConflict: 'name' }
            )
            .select();

        if (catError) {
            console.warn('Notice seeding categories to Supabase:', catError.message);
            console.log('💡 Note: Ensure you have created the "categories" and "products" tables in your Supabase SQL editor.');
        } else {
            console.log(`✅ ${catData ? catData.length : categories.length} Categories seeded to Supabase.`);
        }

        // 2. Seed Products
        console.log('🛍️ Seeding Products to Supabase...');
        const productRows = products.map(p => ({
            name: p.name,
            description: p.description,
            brand: p.brand || '',
            category_name: p.category,
            sku: p.SKU || '',
            barcode: p.barcode || '',
            price: p.price || 0,
            image: p.image || '',
            images: p.images || [],
            stock: p.stock || 0,
            enquiry_only: p.enquiryOnly !== false,
            features: p.features || [],
            specifications: p.specifications || {},
            tags: p.tags || []
        }));

        const { data: prodData, error: prodError } = await supabase
            .from('products')
            .upsert(productRows, { onConflict: 'sku' })
            .select();

        if (prodError) {
            console.warn('Notice seeding products to Supabase:', prodError.message);
        } else {
            console.log(`✅ ${prodData ? prodData.length : products.length} Products seeded to Supabase.`);
        }

        console.log('🎉 Supabase Seeding Script Finished!');
    } catch (err) {
        console.error('Error during Supabase setup:', err.message);
    }
};

const printSupabaseSqlSchema = () => {
    console.log(`
===================================================================
📜 SUPABASE SQL SCHEMA (Copy & Run in your Supabase SQL Editor)
===================================================================

-- 1. Create Categories Table
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT UNIQUE NOT NULL,
    image TEXT DEFAULT '',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create Products Table
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    brand TEXT DEFAULT '',
    category_name TEXT,
    sku TEXT UNIQUE,
    barcode TEXT DEFAULT '',
    price NUMERIC DEFAULT 0,
    image TEXT DEFAULT '',
    images TEXT[] DEFAULT '{}',
    stock INT DEFAULT 0,
    enquiry_only BOOLEAN DEFAULT TRUE,
    features TEXT[] DEFAULT '{}',
    specifications JSONB DEFAULT '{}'::jsonb,
    tags TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create Enquiries Table
CREATE TABLE IF NOT EXISTS public.enquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_name TEXT NOT NULL,
    customer_email TEXT,
    customer_phone TEXT NOT NULL,
    message TEXT,
    source TEXT DEFAULT 'web',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS & Public Access Policies
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Allow public read products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Allow public insert enquiries" ON public.enquiries FOR INSERT WITH CHECK (true);
===================================================================
`);
};

if (process.argv.includes('--sql')) {
    printSupabaseSqlSchema();
} else {
    printSupabaseSqlSchema();
    seedSupabase();
}
