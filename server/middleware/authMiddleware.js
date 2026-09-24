const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const supabase = require('../config/supabase');

// Role hierarchy: superadmin > admin > editor
const ROLE_HIERARCHY = {
    superadmin: 3,
    admin: 2,
    editor: 1,
};

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const secret = process.env.JWT_SECRET || 'hexaweld_secret_key_12345';
            const decoded = jwt.verify(token, secret);

            // Fast-path for master admin
            const isMaster = decoded.id === 'admin-1' ||
                ['admin@jazatrading.com', 'admin@example.com', 'admin@hexaweld.com', 'admin'].includes((decoded.email || '').toLowerCase()) ||
                decoded.isAdmin || decoded.is_admin;

            if (isMaster) {
                req.user = {
                    _id: decoded.id || 'admin-1',
                    id: decoded.id || 'admin-1',
                    name: decoded.name || 'Jaza Trading Admin',
                    email: decoded.email || 'admin@jazatrading.com',
                    isAdmin: true,
                    is_admin: true,
                    role: 'superadmin'
                };
                return next();
            }

            // Check Supabase users table
            try {
                const { data } = await supabase.from('users').select('*').eq('id', decoded.id).single();
                if (data) {
                    req.user = {
                        _id: data.id,
                        id: data.id,
                        name: data.name,
                        email: data.email,
                        isAdmin: !!(data.is_admin || data.isAdmin),
                        is_admin: !!(data.is_admin || data.isAdmin),
                        role: (data.role || (data.is_admin ? 'superadmin' : 'customer')).toLowerCase()
                    };
                    return next();
                }
            } catch (e) {}

            // Fallback from decoded payload
            req.user = {
                _id: decoded.id,
                id: decoded.id,
                name: decoded.name || 'User',
                email: decoded.email,
                isAdmin: !!decoded.isAdmin,
                is_admin: !!decoded.isAdmin,
                role: (decoded.role || (decoded.isAdmin ? 'superadmin' : 'customer')).toLowerCase()
            };
            return next();
        } catch (error) {
            console.error('JWT Token Verification Error:', error.message);
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});

const admin = (req, res, next) => {
    if (req.user && (req.user.isAdmin || req.user.is_admin || ['superadmin', 'admin'].includes((req.user.role || '').toLowerCase()))) {
        next();
    } else {
        res.status(401);
        throw new Error('Not authorized as an admin');
    }
};

/**
 * requireRole('admin') - only roles >= admin can access
 * requireRole('superadmin') - only superadmin can access
 */
const requireRole = (requiredRole) => {
    return (req, res, next) => {
        if (!req.user) {
            res.status(401);
            throw new Error('Not authorized');
        }

        const userRole = (req.user.role || (req.user.isAdmin ? 'superadmin' : 'customer')).toLowerCase();
        const reqRole = (requiredRole || 'admin').toLowerCase();

        const userLevel = ROLE_HIERARCHY[userRole] || (req.user.isAdmin ? 3 : 0);
        const requiredLevel = ROLE_HIERARCHY[reqRole] || 2;

        if (userLevel >= requiredLevel || req.user.isAdmin) {
            next();
        } else {
            res.status(403);
            throw new Error(`Access denied. Requires '${requiredRole}' role or higher.`);
        }
    };
};

module.exports = { protect, admin, requireRole };
