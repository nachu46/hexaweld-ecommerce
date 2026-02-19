const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            console.error(error);
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
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401);
        throw new Error('Not authorized as an admin');
    }
};

// Role hierarchy: superadmin > admin > editor
const ROLE_HIERARCHY = {
    superadmin: 3,
    admin: 2,
    editor: 1,
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

        const userLevel = ROLE_HIERARCHY[req.user.role] || 0;
        const requiredLevel = ROLE_HIERARCHY[requiredRole] || 0;

        if (userLevel >= requiredLevel) {
            next();
        } else {
            res.status(403);
            throw new Error(`Access denied. Requires '${requiredRole}' role or higher.`);
        }
    };
};

module.exports = { protect, admin, requireRole };
