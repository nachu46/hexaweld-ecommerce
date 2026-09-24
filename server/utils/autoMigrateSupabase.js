const { Client } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const autoMigrateSupabase = async () => {
    const connectionUrls = [
        process.env.DATABASE_URL,
        process.env.DIRECT_URL,
        'postgresql://postgres.eqxswlyzurwvelmarbps:c4NoazZTt5lxSmw7@aws-0-ap-northeast-2.pooler.supabase.com:6543/postgres?pgbouncer=true',
        'postgresql://postgres.eqxswlyzurwvelmarbps:c4NoazZTt5lxSmw7@aws-0-ap-northeast-2.pooler.supabase.com:5432/postgres'
    ].filter(Boolean);

    console.log('🚀 Checking & Auto-creating Supabase Database Tables...');

    for (const url of connectionUrls) {
        const client = new Client({
            connectionString: url,
            ssl: { rejectUnauthorized: false },
            connectionTimeoutMillis: 7000,
        });

        try {
            await client.connect();
            const sql = `
            CREATE TABLE IF NOT EXISTS public.users (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                name TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL,
                is_admin BOOLEAN DEFAULT FALSE,
                role TEXT DEFAULT 'Customer',
                created_at TIMESTAMPTZ DEFAULT NOW()
            );

            CREATE TABLE IF NOT EXISTS public.categories (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                name TEXT UNIQUE NOT NULL,
                slug TEXT UNIQUE,
                image TEXT DEFAULT '',
                description TEXT DEFAULT '',
                created_at TIMESTAMPTZ DEFAULT NOW()
            );

            CREATE TABLE IF NOT EXISTS public.brands (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                name TEXT UNIQUE NOT NULL,
                slug TEXT UNIQUE,
                logo TEXT DEFAULT '',
                description TEXT DEFAULT '',
                is_owner BOOLEAN DEFAULT FALSE,
                created_at TIMESTAMPTZ DEFAULT NOW()
            );

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

            CREATE TABLE IF NOT EXISTS public.enquiries (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                customer_name TEXT NOT NULL,
                customer_email TEXT,
                customer_phone TEXT NOT NULL,
                message TEXT,
                source TEXT DEFAULT 'web',
                product_name TEXT DEFAULT '',
                sku TEXT DEFAULT '',
                created_at TIMESTAMPTZ DEFAULT NOW()
            );

            CREATE TABLE IF NOT EXISTS public.banners (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                title TEXT NOT NULL,
                subtitle TEXT,
                image_url TEXT NOT NULL,
                link_url TEXT DEFAULT '/products',
                is_active BOOLEAN DEFAULT TRUE,
                created_at TIMESTAMPTZ DEFAULT NOW()
            );

            CREATE TABLE IF NOT EXISTS public.announcements (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                message TEXT NOT NULL,
                link TEXT DEFAULT '',
                is_active BOOLEAN DEFAULT TRUE,
                created_at TIMESTAMPTZ DEFAULT NOW()
            );

            CREATE TABLE IF NOT EXISTS public.reviews (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                product_id TEXT NOT NULL,
                name TEXT NOT NULL,
                rating INT DEFAULT 5,
                comment TEXT,
                company TEXT DEFAULT '',
                created_at TIMESTAMPTZ DEFAULT NOW()
            );

            ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;
            ALTER TABLE public.categories DISABLE ROW LEVEL SECURITY;
            ALTER TABLE public.brands DISABLE ROW LEVEL SECURITY;
            ALTER TABLE public.products DISABLE ROW LEVEL SECURITY;
            ALTER TABLE public.enquiries DISABLE ROW LEVEL SECURITY;
            ALTER TABLE public.banners DISABLE ROW LEVEL SECURITY;
            ALTER TABLE public.announcements DISABLE ROW LEVEL SECURITY;
            ALTER TABLE public.reviews DISABLE ROW LEVEL SECURITY;
            `;

            await client.query(sql);
            await client.end();
            console.log('✅ Supabase Tables Auto-Created & Configured Successfully!');
            return true;
        } catch (err) {
            await client.end().catch(() => {});
        }
    }
    return false;
};

module.exports = autoMigrateSupabase;
