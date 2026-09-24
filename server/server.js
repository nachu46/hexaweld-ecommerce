const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');
const autoMigrateSupabase = require('./utils/autoMigrateSupabase');
const startSupabaseHeartbeat = require('./utils/supabasePing');

dotenv.config();

// Connect & Auto-Migrate Supabase Database Tables on boot
connectDB();
autoMigrateSupabase();
startSupabaseHeartbeat();

const app = express();

app.use(express.json());
app.use(cors({
    origin: function (origin, callback) {
        const allowed = [
            'https://hexaweld-ecommerce.vercel.app',
            'https://hexaweld-commerce.vercel.app',
            'http://localhost:5173',
            'http://localhost:5175',
            process.env.CLIENT_URL,
        ].filter(Boolean);
        // Allow requests with no origin (mobile apps, curl, Postman)
        if (!origin || allowed.some(o => origin.startsWith(o))) {
            callback(null, true);
        } else {
            callback(new Error('CORS: origin not allowed — ' + origin));
        }
    },
    credentials: true
}));

// Serve static files (uploads)
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Anti-Pause / Keep-Alive ping route for external uptime monitors
app.get('/api/ping', (req, res) => {
    res.json({
        status: 'online',
        database: 'Supabase PostgreSQL',
        timestamp: new Date().toISOString(),
        message: 'Jaza Trading API and Supabase Database are awake & active.'
    });
});

// Routes
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/brands', require('./routes/brandRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/upload', require('./routes/uploadRoutes'));
app.use('/api/enquiries', require('./routes/enquiryRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/banners', require('./routes/bannerRoutes'));
app.use('/api/announcement', require('./routes/announcementRoutes'));

// New Enterprise Routes
app.use('/api/analytics', require('./routes/analyticsRoutes'));
app.use('/api/reviews', require('./routes/reviewRoutes'));
app.use('/', require('./routes/seoRoutes'));

// Global error handler
app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});

app.get('/', (req, res) => {
    res.send('Jaza Trading W.L.L API is running on Supabase Database...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

