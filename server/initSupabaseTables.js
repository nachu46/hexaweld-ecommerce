const { Client } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const connectionStrings = [
    process.env.DATABASE_URL,
    'postgresql://postgres.eqxswlyzurwvelmarbps:c4NoazZTt5lxSmw7@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres',
    'postgresql://postgres.eqxswlyzurwvelmarbps:c4NoazZTt5lxSmw7@aws-0-eu-central-1.pooler.supabase.com:6543/postgres',
    'postgresql://postgres.eqxswlyzurwvelmarbps:c4NoazZTt5lxSmw7@aws-0-us-east-1.pooler.supabase.com:6543/postgres',
    'postgresql://postgres:c4NoazZTt5lxSmw7@db.eqxswlyzurwvelmarbps.supabase.co:5432/postgres'
].filter(Boolean);

const initTables = async () => {
    console.log('🚀 Connecting to Supabase PostgreSQL Database to create all tables...');
    let connected = false;

    for (const connStr of connectionStrings) {
        if (connected) break;
        const client = new Client({
            connectionString: connStr,
            ssl: { rejectUnauthorized: false },
            connectionTimeoutMillis: 5000,
        });

        try {
            await client.connect();
            console.log(`✅ Connected to Supabase via ${connStr.split('@')[1] || connStr}`);
            connected = true;

        const createTablesSQL = `
        -- 1. Create Users Table
        CREATE TABLE IF NOT EXISTS public.users (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            is_admin BOOLEAN DEFAULT FALSE,
            role TEXT DEFAULT 'Customer',
            created_at TIMESTAMPTZ DEFAULT NOW()
        );

        -- 2. Create Categories Table
        CREATE TABLE IF NOT EXISTS public.categories (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            name TEXT UNIQUE NOT NULL,
            slug TEXT UNIQUE,
            image TEXT DEFAULT '',
            description TEXT DEFAULT '',
            created_at TIMESTAMPTZ DEFAULT NOW()
        );

        -- 3. Create Brands Table
        CREATE TABLE IF NOT EXISTS public.brands (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            name TEXT UNIQUE NOT NULL,
            slug TEXT UNIQUE,
            logo TEXT DEFAULT '',
            description TEXT DEFAULT '',
            is_owner BOOLEAN DEFAULT FALSE,
            created_at TIMESTAMPTZ DEFAULT NOW()
        );

        -- 4. Create Products Table
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

        -- 5. Create Enquiries Table
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

        -- 6. Create Banners Table
        CREATE TABLE IF NOT EXISTS public.banners (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            title TEXT NOT NULL,
            subtitle TEXT,
            image_url TEXT NOT NULL,
            link_url TEXT DEFAULT '/products',
            is_active BOOLEAN DEFAULT TRUE,
            created_at TIMESTAMPTZ DEFAULT NOW()
        );

        -- 7. Create Announcements Table
        CREATE TABLE IF NOT EXISTS public.announcements (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            message TEXT NOT NULL,
            link TEXT DEFAULT '',
            is_active BOOLEAN DEFAULT TRUE,
            created_at TIMESTAMPTZ DEFAULT NOW()
        );

        -- 8. Enable Row Level Security (RLS) & Public Policies
        ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
        ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
        ALTER TABLE public.brands ENABLE ROW LEVEL SECURITY;
        ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
        ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
        ALTER TABLE public.banners ENABLE ROW LEVEL SECURITY;
        ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;

        -- Create RLS Policies for Public Access
        DO $$
        BEGIN
            IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public read users') THEN
                CREATE POLICY "Allow public read users" ON public.users FOR SELECT USING (true);
            END IF;
            IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public read categories') THEN
                CREATE POLICY "Allow public read categories" ON public.categories FOR SELECT USING (true);
            END IF;
            IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public read brands') THEN
                CREATE POLICY "Allow public read brands" ON public.brands FOR SELECT USING (true);
            END IF;
            IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public read products') THEN
                CREATE POLICY "Allow public read products" ON public.products FOR SELECT USING (true);
            END IF;
            IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public read banners') THEN
                CREATE POLICY "Allow public read banners" ON public.banners FOR SELECT USING (true);
            END IF;
            IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public read announcements') THEN
                CREATE POLICY "Allow public read announcements" ON public.announcements FOR SELECT USING (true);
            END IF;
            IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public insert enquiries') THEN
                CREATE POLICY "Allow public insert enquiries" ON public.enquiries FOR INSERT WITH CHECK (true);
            END IF;
        END $$;
        `;

        await client.query(createTablesSQL);
        console.log('🎉 SUCCESS: All Supabase database tables created & configured with RLS policies!');
        await client.end();
        break;
        } catch (err) {
            console.log(`Notice for endpoint (${connStr.split('@')[1] || connStr}): ${err.message}`);
            await client.end().catch(() => {});
        }
    }

    if (!connected) {
        console.log('💡 TIP: You can copy & run the SQL snippet directly in your Supabase Dashboard -> SQL Editor to create all tables instantly!');
    }
};

initTables();
