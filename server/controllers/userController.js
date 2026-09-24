const asyncHandler = require('express-async-handler');
const { authenticateUser } = require('../services/supabaseService');

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await authenticateUser(email, password);
        res.json(user);
    } catch (error) {
        res.status(401);
        throw new Error(error.message || 'Invalid email or password');
    }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
    if (req.user) {
        res.json({
            _id: req.user._id || req.user.id,
            id: req.user.id || req.user._id,
            name: req.user.name,
            email: req.user.email,
            isAdmin: req.user.isAdmin || req.user.is_admin,
            role: req.user.role || 'Customer',
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

module.exports = {
    authUser,
    getUserProfile,
    registerUser: asyncHandler(async (req, res) => {
        const { name, email } = req.body;
        const newUser = { id: `usr-${Date.now()}`, _id: `usr-${Date.now()}`, name, email, isAdmin: false, role: 'Customer' };
        res.status(201).json(newUser);
    }),
};
